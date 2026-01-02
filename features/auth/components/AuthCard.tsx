import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";

type AuthCardProps = {
  title: string;
  description?: string;
  timer?: React.ReactNode;
  children: React.ReactNode;
  message?: React.ReactNode;
  backHref?: string;
  backText?: string;
  backIcon?: React.ReactNode;
};

export default function AuthCard({
  title,
  description,
  timer,
  children,
  message,
  backHref,
  backText,
  backIcon,
}: AuthCardProps) {
  return (
    <Card className="mx-auto w-full max-w-lg border-none bg-transparent shadow-none p-0">
      <CardHeader className="text-center">
        <Logo />
        {title && (
          <CardTitle className="text-2xl font-semibold text-primary-800 md:text-[32px]">
            {title}
          </CardTitle>
        )}

        {description && (
          <CardDescription className="flex items-center justify-center gap-1">
            <span>{description}</span>
            {timer}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-0">{children}</CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground md:-mt-4">
        {message && message}
        {backHref && (
          <CardAction>
            <Button asChild variant="link" className="w-full">
              <Link
                href={backHref}
                className="flex items-center justify-center gap-2"
              >
                {backIcon}
                <span>{backText}</span>
              </Link>
            </Button>
          </CardAction>
        )}
      </CardFooter>
    </Card>
  );
}
