"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schema";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "../actions/reset-password";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const searchParams = useSearchParams();
  const token = decodeURIComponent(searchParams.get("token") || "");

  const onSubmit = async (data: ResetPasswordFormData) => {
    const response = await resetPassword({
      newPassword: data.password,
      token,
    });

    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    } else if (!response.success) {
      toast.error(response.message);
    }
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
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
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
