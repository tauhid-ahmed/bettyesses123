import z from "zod";

export const childDetailsSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(18, "Age must be at most 18"),
  gender: z.enum(["Male", "Female", "Other"] as const),
  birthMonth: z.string().min(1, "Birth month is required"),
  image: z.string().nullable(),
  language: z.enum(["English", "Spanish", "French"] as const),
});

export const characterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Character name is required"),
  description: z.string().optional(),
});

export const storyIdeaSchema = z.object({
  idea: z.string().min(10, "Story idea must be at least 10 characters"),
  characters: z
    .array(characterSchema)
    .min(1, "At least one character is required"),
  setting: z.string().min(1, "Setting is required"),
  moralLesson: z.string().optional(),
});

export const bookDetailsSchema = z.object({
  name: z
    .string()
    .min(1, "Book name is required")
    .max(100, "Book name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  pages: z
    .number()
    .min(10, "Book must have at least 10 pages")
    .max(100, "Book cannot exceed 100 pages"),
  genre: z.string().min(1, "Genre is required"),
});

export const pricingSchema = z
  .object({
    price: z.number().min(0.01, "Price must be greater than 0"),
    offerPrice: z.number().min(0).nullable(),
    currency: z.enum(["USD", "EUR", "GBP"] as const),
  })
  .refine(
    (data) => {
      if (data.offerPrice !== null && data.offerPrice >= data.price) {
        return false;
      }
      return true;
    },
    {
      message: "Offer price must be less than regular price",
      path: ["offerPrice"],
    }
  );

// Type inference from schemas
export type ChildDetails = z.infer<typeof childDetailsSchema>;
export type Character = z.infer<typeof characterSchema>;
export type StoryIdea = z.infer<typeof storyIdeaSchema>;
export type BookDetails = z.infer<typeof bookDetailsSchema>;
export type Pricing = z.infer<typeof pricingSchema>;
