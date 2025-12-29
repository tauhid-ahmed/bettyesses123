"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { signUpSchema, type SignUpFormData } from "../schema";
import { registerUser } from "../actions/register-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyOtpPath } from "@/paths";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "Tauhid",
      lastName: "Ahmed",
      email: "superadmin@gmail.com",
      password: "Password123@@",
      confirmPassword: "Password123@@",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const response = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    if (response.success) {
      toast.success(response.message);
      form.reset();
      router.push(verifyOtpPath());
      localStorage.setItem("otp-timer", "300");
      localStorage.setItem("email", data.email);
    } else if (!response.success) toast.error(response.message);
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
                  placeholder=""
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder=""
                />
              </div>

              <TextField
                label="Email address"
                type="email"
                name="email"
                placeholder=""
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder=""
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder=""
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
