import Logo from "@/components/Logo";
import { CheckCircle2 } from "lucide-react";

interface SuccessMessageProps {
  title: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
}

export default function SuccessMessage({
  title,
  description,
}: SuccessMessageProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 text-center">
      {/* Logo */}
      <div className="w-fit mx-auto">
        <Logo />
      </div>

      {/* Success Icon with Gradient */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full primary-gradient flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
        {title}
      </h1>

      {/* Description */}
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

// Usage Examples:

// 1. Login Success
export function LoginSuccess() {
  return (
    <SuccessMessage
      title="Log In Successful"
      description="Your password has been updated"
    />
  );
}

// 2. Signup Success
export function SignupSuccess() {
  return (
    <SuccessMessage
      title="Sign Up Successful"
      description="Your account has been created successfully"
    />
  );
}

// 3. Reset Password Success
export function ResetPasswordSuccess() {
  return (
    <SuccessMessage
      title="Password Reset Successful"
      description="Your password has been reset successfully"
    />
  );
}

// 4. Custom usage with different logo
export function CustomSuccess() {
  return (
    <SuccessMessage
      title="Action Completed"
      description="Your action has been completed successfully"
      logoSrc="/custom-logo.svg"
      logoAlt="Custom Logo"
    />
  );
}
