"use client";

import { Button } from "@/components/ui/button";
import { LucideX } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function RemoveCart({ id }: { id: string }) {
  const { removeFromCart } = useCart();
  return (
    <Button
      onClick={() => removeFromCart(id)}
      size="icon"
      variant="destructive"
      className="text-red-500"
    >
      <LucideX />
    </Button>
  );
}
