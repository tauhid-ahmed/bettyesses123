"use client";

import { Button } from "@/components/ui/button";
import { personalizeBookPath } from "@/paths";
import { useRouter } from "next/navigation";
import { type Product } from "../types";
import { useCart } from "../contexts/CartContext";

type Props = {
  id: string;
  product: Product;
};

export default function AddToCart({ id, product }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    router.push(personalizeBookPath(id));
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="primary-gradient w-full"
    >
      Personalize This Book
    </Button>
  );
}
