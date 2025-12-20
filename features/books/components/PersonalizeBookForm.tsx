"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePersonalizeBook } from "../context/PersonalizeBookContext";
import { ArrowRight } from "lucide-react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Container from "@/components/Container";

const formSchema = z.object({
  childName: z.string().min(1, "Child's name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  birthMonth: z.string().min(1, "Birth month is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ages = Array.from({ length: 13 }, (_, i) => i + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function PersonalizeBookForm() {
  const { formData, updateFormData, setCurrentStep } = usePersonalizeBook();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: formData.childName,
      age: formData.age,
      gender: formData.gender,
      birthMonth: formData.birthMonth,
    },
  });

  function onSubmit(values: FormValues) {
    updateFormData(values);
    setCurrentStep(2);
  }

  return (
    <Section
      title="Personalize Book"
      padding="sm"
      description="The book will be personalized with the information you provide"
    >
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Child's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Age</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="age" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ages.map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Select The Birth Month Of The Child
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="January" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full primary-gradient rounded-lg"
            >
              Go To Next Step <ArrowRight className="ml-2" /> Upload photo
            </Button>
          </form>
        </Form>
      </div>
    </Section>
  );
}
