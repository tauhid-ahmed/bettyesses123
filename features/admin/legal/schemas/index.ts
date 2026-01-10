import { z } from "zod";

export const createLegalPageSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  policyNumber: z.coerce.number().min(1, "Policy number is required"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

export type CreateLegalPageSchema = z.infer<typeof createLegalPageSchema>;
