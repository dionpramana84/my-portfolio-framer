"use client";
import { z } from "zod";
import { usePhotoBooth } from "../../app/self-project/photobooth/context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const thumbnailSchema = z.object({
  email: z.string().email(),
});

export default function EmailForm() {
  const { setEmail, setStep } = usePhotoBooth();

  const form = useForm<z.infer<typeof thumbnailSchema>>({
    resolver: zodResolver(thumbnailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = () => {
    setEmail(form.getValues("email"));
    setStep(2);
  };

  return (
    <div className="w-[400px]">
      <Alert className="mb-4">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Please enter your email address to receive your photobooth results.
        </AlertDescription>
      </Alert>
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Next
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
