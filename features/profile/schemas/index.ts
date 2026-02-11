import * as z from "zod";

export const profileSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    shippingFirstName: z.string().optional(),
    shippingLastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    streetAddress: z.string().optional(),
    aptBuilding: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    code: z.string().optional(),
    countryRegion: z.string().optional(),
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
