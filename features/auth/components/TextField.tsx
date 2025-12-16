import { Controller, useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useId, useState } from "react";
import { Label } from "@/components/ui/label";

interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export default function TextField({
  name,
  label,
  placeholder,
  type = "text",
}: TextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;
  const [isToggled, setIsToggled] = useState(false);
  const isPassword = type === "password";

  // Fixed: When password type, toggle between "text" and "password"
  // For other types, use the original type
  const inputType = isPassword ? (isToggled ? "text" : "password") : type;

  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="w-full space-y-2">
            <Label className="text-sm text-dark-600" htmlFor={id}>
              {label}
            </Label>
            <div className="relative">
              <div className="flex flex-col items-center relative">
                <Input
                  {...field}
                  id={id}
                  type={inputType}
                  placeholder={placeholder}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className={cn(
                    "w-full p-5 py-5 placeholder-transparent outline-none bg-gray-25 border-gray-100 text-sm",
                    isPassword && "pr-10",
                    errorMessage && "border-danger-500"
                  )}
                />
                {isPassword && (
                  <Button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsToggled((toggle) => !toggle)}
                  >
                    {isToggled ? <LucideEyeOff /> : <LucideEye />}
                  </Button>
                )}
              </div>

              {errorMessage && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 ml-4 block"
                >
                  {errorMessage}
                </motion.span>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
