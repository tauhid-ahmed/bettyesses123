"use client";

import { useBookForm } from "../context/CreateBookContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import Link from "next/link";

export default function BookCreationWelcome() {
  const { dispatch } = useBookForm();

  return (
    <Container size="sm">
      <div className="border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/30 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Plus className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create your own story book
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Start a new adventure with your own story and live the life of your
          dreams
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-2 items-center mt-8">
        <Button
          variant="outline"
          className="border-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full px-6"
          asChild
        >
          <Link href=".">Back To Previous Page</Link>
        </Button>

        <Button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          className="primary-gradient"
        >
          Create Book
        </Button>
      </div>
    </Container>
  );
}
