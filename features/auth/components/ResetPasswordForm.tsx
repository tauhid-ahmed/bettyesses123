"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schema";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = decodeURIComponent(searchParams.get("token") || "");

  const onSubmit = (data: ResetPasswordFormData) => {
    // Handle reset password logic here
  };

  return (
    <div className="w-full">
      <AuthCard
        title="Reset Password"
        description="Set a strong password"
        backHref="/login"
        backText="Back to Login"
        message="Remember your password?"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="space-y-4 lg:space-y-6">
              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="Please enter your password"
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Please enter your password"
              />

              <Button
                type="submit"
                className="w-full primary-gradient"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}
