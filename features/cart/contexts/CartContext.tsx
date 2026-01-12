"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { CartItem, Product, CartContextType } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

import { removeFromCartAction } from "../actions/remove-from-cart";

const CART_STORAGE_KEY = "shopping-cart";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

import { getCart } from "../actions/get-cart";
import { useSession } from "next-auth/react";

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status: sessionStatus } = useSession();

  const refreshCart = useCallback(async () => {
    if (sessionStatus !== "authenticated") {
        // Fallback or handle unauthenticated
        return;
    }
    
    setIsLoading(true);
    try {
      const res = await getCart();
      if (res.success && res.data) {
        const mappedItems: CartItem[] = res.data.cart.items.map((item) => ({
          id: item.id,
          title: item.book.template.title,
          price: item.book.template.price,
          imageUrl: item.book.template.coverImage,
          quantity: 1, // backend structure seems to have 1 item per ApiCartItem
          childName: item.book.childName,
          age: item.book.age,
        }));
        setCartItems(mappedItems);
        setSubtotal(res.data.subtotal);
        setItemCount(res.data.itemCount);
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionStatus]);

  // Load cart on mount or session change
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      refreshCart();
    } else if (sessionStatus === "unauthenticated") {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed: CartItem[] = JSON.parse(stored);
          setCartItems(parsed);
          setSubtotal(parsed.reduce((sum, item) => sum + item.price * item.quantity, 0));
          setItemCount(parsed.reduce((sum, item) => sum + item.quantity, 0));
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [sessionStatus, refreshCart]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (sessionStatus === "unauthenticated" && !isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoading, sessionStatus]);

  const addToCart = useCallback((product: Product): void => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, imageUrl: product.imageUrl, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    if (sessionStatus === "authenticated") {
      try {
        const res = await removeFromCartAction(productId);
        if (res.success) {
          await refreshCart();
        } else {
          console.error("Failed to remove item from backend cart:", res.message);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }
  }, [sessionStatus, refreshCart]);

  const updateQuantity = useCallback(
    (productId: string, quantity: number): void => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback((): void => {
    setCartItems([]);
  }, []);

  const cartCount = sessionStatus === "authenticated" ? itemCount : cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = sessionStatus === "authenticated" ? subtotal : cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value: CartContextType = {
    cartItems,
    subtotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    cartCount,
    cartTotal,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
