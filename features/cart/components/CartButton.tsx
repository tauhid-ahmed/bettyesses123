"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { cartCount } = useCart();
  const router = useRouter();

  return (
    <Button
      className="text-primary-500 hover:bg-transparent hover:opacity-80 hover:text-primary-500 transition-all relative"
      variant="ghost"
      size="icon-lg"
      aria-label="Shopping bag"
      onClick={() => router.push("/cart")}
    >
      <ShoppingBag className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs size-4 rounded-full flex items-center justify-center font-semibold">
          {Math.min(9, cartCount)} {cartCount > 9 ? "+" : ""}
        </span>
      )}
    </Button>
  );
}
