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
import { PlusIcon, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import useProjects, { useProject } from "../../../hooks/firebase/project";
import RichTextEditor from "./rich-text-editor";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import DatePicker from "@/components/ui/date-picker";

const thumbnailSchema = z.object({
  public_id: z.string().nullable(),
  url: z.string().nullable(),
  is_thumbnail: z.boolean(),
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
  images: z.array(thumbnailSchema).max(10).nullable(),
});

export default function ProjectForm({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
}) {
  const router = useRouter();
  const [description, setDescription] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_name: null,
      role_type: "front-end-developer",
      employment_type: "Full-time",
      description: null,
      link_url: null,
      skills: [],
      start_date: null,
      end_date: null,
      images: null,
    },
  });

  const { fields } = useFieldArray({
    name: "images",
    control: form.control,
  });
  const { onCreate, loading: loadingProjects } = useProjects({});
  const {
    project,
    loading: loadingProject,
    onUpdate,
  } = useProject({
    id: selectedProjectId ?? "",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedValues = {
        ...values,
        skills: values.skills.map((s) => s.value),
        description,
      };

      if (selectedProjectId) {
        await onUpdate(
          selectedProjectId,
          formattedValues,
          project?.images || []
        );
      } else {
        await onCreate(formattedValues);
      }

      form.reset();
      router.push("/dashboard/project");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to submit project:", error);
    }
  };

  const handleDeleteImage = () => {
    form.setValue("images", null, { shouldDirty: true });
  };

  useEffect(() => {
    if (selectedProjectId && project) {
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
        images:
          project.images?.map((img) => ({
            url: img.url ?? null,
            public_id: img.public_id ?? null,
            is_thumbnail: img.is_thumbnail ?? false,
          })) || [],
      });

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
                              {roleType
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
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
                  <FormControl>
                    <DatePicker
                      date={field.value ?? null}
                      setDate={field.onChange}
                    />
                  </FormControl>
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
                  <FormControl>
                    <DatePicker
                      date={field.value ?? null}
                      setDate={field.onChange}
                    />
                  </FormControl>
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

            <div className="grid grid-cols-2 gap-1">
              {fields.map((imageField, index) => {
                const images = form.watch("images") || [];

                return (
                  <div
                    key={imageField.id}
                    className="relative border p-3 rounded-md"
                  >
                    {/* Image Preview or Input */}
                    {images[index]?.url ? (
                      <div className="relative">
                        <Image
                          src={images[index].url!}
                          alt={`Image ${index + 1}`}
                          width={200}
                          height={150}
                          className="rounded-md object-cover w-full h-auto"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white/100"
                          onClick={() => {
                            const updated = [...images];
                            updated.splice(index, 1);
                            form.setValue("images", updated, {
                              shouldDirty: true,
                            });
                          }}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <FormField
                        key={imageField.id}
                        control={form.control}
                        name={`images.${index}`}
                        render={() => (
                          <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const newImages = [
                                      ...(form.watch("images") || []),
                                    ];
                                    newImages[index] = {
                                      url: reader.result as string,
                                      public_id: null,
                                      is_thumbnail: false,
                                    };

                                    form.setValue("images", newImages, {
                                      shouldDirty: true,
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Thumbnail Checkbox */}
                    {images[index]?.url && (
                      <div className="flex items-center mt-2 space-x-2">
                        <input
                          type="checkbox"
                          checked={images[index]?.is_thumbnail || false}
                          onChange={() => {
                            const updated = images.map((img, i) => ({
                              ...img,
                              is_thumbnail: i === index,
                            }));
                            form.setValue("images", updated, {
                              shouldDirty: true,
                            });
                          }}
                        />
                        <label>Set as Thumbnail</label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {(form.watch("images") || []).length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const current = form.watch("images") || [];
                  form.setValue(
                    "images",
                    [
                      ...current,
                      {
                        url: null,
                        public_id: null,
                        is_thumbnail: false,
                      },
                    ],
                    { shouldDirty: true }
                  );
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add Image
              </Button>
            )}
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
