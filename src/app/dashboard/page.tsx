"use client";

import { useEffect, useState } from "react";
import ContentHeader from "@/components/content-header";
import Description from "@/components/description";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useUserProfile from "@/hooks/firebase/user-profile";
import useUserSession from "@/hooks/firebase/user-session";
import { EditIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string(),
  headline: z.string(),
  country: z.string(),
  city: z.string(),
  contact: z.string(),
});

export default function Page() {
  const { user } = useUserSession();
  const { profile, onUpdate, loading } = useUserProfile(user?.uid ?? "");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      headline: "",
      country: "",
      city: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (!isSheetOpen) {
      form.reset({
        name: profile?.name || "",
        headline: profile?.headline || "",
        country: profile?.country || "",
        city: profile?.city || "",
        contact: profile?.contact || "",
      });
    }
  }, [isSheetOpen, profile, form]);

  const profileFields: { title: string; description?: string | null }[] = [
    { title: "Name", description: profile?.name },
    { title: "Headline", description: profile?.headline },
    { title: "City", description: profile?.city },
    { title: "Country", description: profile?.country },
    { title: "Contact", description: profile?.contact },
  ];

  if (!user && !profile) {
    return <Loader2 className="animate-spin mr-1" />;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!profile || !profile.id) return;

    await onUpdate(profile.id, {
      ...profile,
      ...values,
    });
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      <ContentHeader title="Profile">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
            </SheetHeader>
            <div className="flex-grow">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col h-full"
                >
                  <div className="flex-grow space-y-8">
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
                      name="headline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Headline</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <SheetFooter>
                    <Button type="submit" size="sm">
                      Submit
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </ContentHeader>
      {profileFields.map((field, index) => (
        <Description
          key={index}
          title={field.title}
          description={field.description}
          loading={loading}
        />
      ))}
    </>
  );
}
