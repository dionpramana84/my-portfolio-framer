"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { EMPLOYMENT_TYPES, ROLE_TYPES } from "../../constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import useProjects, { useProject } from "../../../hooks/firebase/project";
import RichTextEditor from "./rich-text-editor";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ImageCloudinary from "@/models/ImageCloudinary";

const thumbnailSchema = z.object({
  public_id: z.string().nullable(),
  url: z.string().nullable(),
});

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  company_name: z.string().nullable().optional(),
  role_type: z.enum(ROLE_TYPES, {
    errorMap: () => ({ message: "Please select a role type" }),
  }),
  employment_type: z.enum(EMPLOYMENT_TYPES, {
    errorMap: () => ({ message: "Please select an employment type" }),
  }),
  description: z.string().nullable().optional(),
  link_url: z.string().nullable(),
  skills: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "At least one skill is required"),
  start_date: z.date().nullable(),
  end_date: z.date().nullable(),
  thumbnail_url: z
    .union([z.instanceof(File), thumbnailSchema, z.string().nullable()])
    .nullable(),
});

export default function ProjectForm({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
}) {
  const router = useRouter();
  const [description, setDescription] = useState<string>("");
  const [prevImage, setPrevImage] = useState<ImageCloudinary | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_name: null,
      role_type: "Front-End Developer",
      employment_type: "Full-time",
      description: null,
      link_url: null,
      skills: [],
      start_date: null,
      end_date: null,
      thumbnail_url: null,
    },
  });

  const { onCreate, loading: loadingProjects } = useProjects();
  const {
    project,
    onUpdate,
    loading: loadingProject,
  } = useProject({
    id: selectedProjectId ?? "",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const thumbnail = values.thumbnail_url;
      let imageData: ImageCloudinary | null = null;

      const deleteImage = async (public_id: string | null) => {
        if (!public_id) return;
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id }),
        });
      };

      const uploadImage = async (
        file: File
      ): Promise<ImageCloudinary | null> => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Image upload failed");

        return { url: data.url, public_id: data.public_id };
      };

      const isImageRemoved =
        !thumbnail && typeof prevImage?.public_id === "string";

      if (isImageRemoved) {
        await deleteImage(prevImage?.public_id ?? null);
      }

      if (thumbnail instanceof File) {
        if (project?.thumbnail_url) {
          await deleteImage(prevImage?.public_id ?? null);
        }
        imageData = await uploadImage(thumbnail);
      } else if (typeof thumbnail === "string") {
        imageData = { url: thumbnail, public_id: null };
      } else if (thumbnail && "url" in thumbnail) {
        imageData = {
          url: thumbnail.url ?? null,
          public_id: thumbnail.public_id ?? null,
        };
      }

      const formattedValues = {
        ...values,
        skills: values.skills.map((s) => s.value),
        description,
        thumbnail_url: imageData,
      };

      selectedProjectId
        ? await onUpdate?.(selectedProjectId, formattedValues)
        : await onCreate?.(formattedValues);

      form.reset();
      router.push("/dashboard/project");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to submit project:", error);
    }
  };

  const handleDeleteImage = () => {
    form.setValue("thumbnail_url", null, { shouldDirty: true });
  };

  useEffect(() => {
    if (selectedProjectId && project) {
      const existingImage = {
        public_id:
          (project.thumbnail_url as ImageCloudinary)?.public_id || null,
        url: project.thumbnail_url?.url || null,
      };

      form.reset({
        name: project.name || "",
        company_name: project.company_name || null,
        role_type: project.role_type || "",
        employment_type: project.employment_type || "Full-time",
        description: project.description || null,
        link_url: project.link_url || null,
        skills:
          project.skills?.map((skill) => ({ label: skill, value: skill })) ||
          [],
        start_date: project.start_date ? new Date(project.start_date) : null,
        end_date: project.end_date ? new Date(project.end_date) : null,
        thumbnail_url: existingImage,
      });

      setPrevImage(existingImage); // ← Save the original image
      setDescription(project.description || "");
    }
  }, [selectedProjectId, project, form]);

  if (loadingProjects || loadingProject) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-7 gap-4 mb-8">
          <div className="flex flex-col h-full space-y-6 col-span-3">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Field */}
            <FormField
              control={form.control}
              name="role_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role Type</SelectLabel>
                          {ROLE_TYPES.map((roleType) => (
                            <SelectItem key={roleType} value={roleType}>
                              {roleType}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employment Type */}
            <FormField
              control={form.control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          {EMPLOYMENT_TYPES.map((employmentType) => (
                            <SelectItem
                              key={employmentType}
                              value={employmentType}
                            >
                              {employmentType}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date Picker */}
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" side="bottom" forceMount>
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date Picker */}
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" side="bottom" forceMount>
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col h-full space-y-6 col-span-4">
            {/* Skills Multi-Select */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <div className="space-y-2">
                    {field.value.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={skill.value} // Access the `value` property of the object
                          onChange={(e) => {
                            const newSkills = [...field.value];
                            newSkills[index] = {
                              ...newSkills[index],
                              value: e.target.value,
                            };
                            field.onChange(newSkills);
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newSkills = field.value.filter(
                              (_, i) => i !== index
                            );
                            field.onChange(newSkills);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        // Prevent adding empty skills
                        if (field.value.some((skill) => !skill.value.trim())) {
                          return;
                        }
                        field.onChange([
                          ...field.value,
                          { value: "", label: "" },
                        ]);
                      }}
                      className="w-full"
                    >
                      <PlusIcon className="h-4 w-4" /> Add Skill
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              defaultValue={description}
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      description={description}
                      setDescription={setDescription}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />

                      {/* ✅ Image preview logic */}
                      {field.value && (
                        <div className="mt-2 space-y-2">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : typeof field.value === "string"
                                ? field.value
                                : field.value?.url ?? ""
                            }
                            alt="Thumbnail preview"
                            width={200}
                            height={150}
                            className="rounded-md object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteImage}
                          >
                            Delete Image
                          </Button>
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-end">
        <Button onClick={handleDeleteImage}>Delete Image</Button>
        <div className="flex space-x-2">
          <Button
            size="sm"
            disabled={loadingProjects || loadingProject}
            loading={loadingProjects || loadingProject}
            onClick={() => router.push("/dashboard/project")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={loadingProjects || loadingProject}
            loading={loadingProjects || loadingProject}
            onClick={form.handleSubmit(handleSubmit)}
            variant="secondary"
          >
            {selectedProjectId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
