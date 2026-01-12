"use client";

import { Button } from "@/components/ui/button";
import { LucideX, Loader2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function RemoveCart({ id }: { id: string }) {
  const { removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(id);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Button
      onClick={handleRemove}
      size="icon"
      variant="outline"
      disabled={isRemoving}
      className="text-black rounded-full hover:text-red-500 hover:border-red-500"
    >
      {isRemoving ? <Loader2 className="animate-spin" /> : <LucideX />}
    </Button>
  );
}
