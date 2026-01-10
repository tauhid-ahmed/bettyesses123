import { z } from "zod";

export const createPromoCodeSchema = z.object({
  code: z.string().min(3, "Promo code must be at least 3 characters").max(20),
  discountPercentage: z.preprocess(
    (a) => {
      if (typeof a === "string") return parseInt(a, 10);
      if (typeof a === "number") return a;
      return undefined;
    },
    z.number().min(1, "Discount must be at least 1%").max(100, "Discount cannot exceed 100%")
  ),
  useLimit: z.string().min(1, "Use limit is required"), // Dropdown value (e.g., "1 Time")
  minOrderAmount: z.preprocess(
    (a) => {
      if (typeof a === "string") return parseFloat(a);
      if (typeof a === "number") return a;
      return undefined;
    },
    z.number().min(0, "Minimum order amount cannot be negative")
  ),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export type CreatePromoCodeSchema = z.infer<typeof createPromoCodeSchema>;
