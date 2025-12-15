"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { signUpSchema, type SignUpFormData } from "../schema";

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign up data:", data);
    // Handle sign up logic here
  };

  return (
    <div className="w-full">
      <AuthCard
        title="Sign Up for an Account"
        backHref="/login"
        backText="Log in"
        message="If you already have an account please?"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Jon"
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Snow"
                />
              </div>

              <TextField
                label="Email address"
                type="email"
                name="email"
                placeholder="jonsnow464@gmail.com"
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="1423566"
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="********"
              />

              <Button
                type="submit"
                className="w-full primary-gradient"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Sign Up"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}
