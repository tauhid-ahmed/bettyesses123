"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schema";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Forgot password data:", data);
    // Handle forgot password logic here (send OTP to email)
  };

  return (
    <div className="w-full">
      <AuthCard
        title="Forget Password"
        backHref="/login"
        backText="Back to Login"
        message="Remember your password?"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="space-y-4 lg:space-y-6">
              <TextField
                label="Email Address"
                type="email"
                name="email"
                placeholder="Please enter your email"
              />

              <Button
                type="submit"
                className="w-full primary-gradient"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending OTP..." : "Send OTP"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}
