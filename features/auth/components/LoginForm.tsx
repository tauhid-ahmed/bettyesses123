"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./TextField";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "./AuthCard";
import { loginSchema, type LoginFormData } from "../schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
      rememberMe: true,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      remember: data.rememberMe,
      redirect: false,
    });

    if (!result) {
      toast.error("Unexpected authentication error");
      return;
    }

    if (result.error) {
      toast.error("Invalid email or password");
      return;
    }

    if (result.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  });

  return (
    <div className="w-full">
      <AuthCard
        title="Log In to Your Account"
        backHref="/signup"
        backText="Sign up"
        message="Don't have an account?"
      >
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <fieldset className="space-y-4 lg:space-y-6">
              <TextField
                label="Email Address"
                type="email"
                name="email"
                placeholder="Please enter your email"
              />

              <div className="space-y-4">
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                />

                <div className="flex justify-between gap-2 text-sm">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="align-middle"
                          />
                        </FormControl>
                        <span className="text-gray-600 align-middle whitespace-nowrap">
                          Remember me
                        </span>
                      </FormItem>
                    )}
                  />

                  <Link
                    className="text-primary-500 font-medium whitespace-nowrap"
                    href="/forgot-password"
                  >
                    Forget password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full primary-gradient"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}
