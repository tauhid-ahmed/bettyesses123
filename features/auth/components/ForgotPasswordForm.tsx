"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schema";
import { forgotPassword } from "../actions/forgot-password";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  OTP_EXPIRATION_TIME,
  OTP_EXPIRATION_TIMER_KEY,
  OTP_TIMER_KEY,
  OTP_VALIDATION_TIME,
  REGISTER_USER_KEY,
} from "../constant";
import { verifyForgotPasswordOtpPath } from "@/paths";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await forgotPassword(data);

    if (result.success) {
      toast.success(result.message);
      localStorage.setItem(OTP_TIMER_KEY, OTP_VALIDATION_TIME);
      localStorage.setItem(OTP_EXPIRATION_TIMER_KEY, OTP_EXPIRATION_TIME());
      result.userId && localStorage.setItem(REGISTER_USER_KEY, result.userId);
      router.push(verifyForgotPasswordOtpPath());
    }

    if (!result.success) {
      toast.error(result.message);
    }
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
