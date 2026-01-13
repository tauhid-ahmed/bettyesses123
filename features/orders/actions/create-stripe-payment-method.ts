// "use server";

// import { STRIPE_SECRET_KEY } from "@/constants";

// export interface CreateStripePaymentMethodPayload {
//   type: string;
//   card: {
//     number: string;
//     exp_month: number;
//     exp_year: number;
//     cvc: string;
//   };
// }

// export interface StripePaymentMethodResponse {
//   id: string;
//   object: string;
//   type: string;
//   card: {
//     brand: string;
//     last4: string;
//     exp_month: number;
//     exp_year: number;
//   };
//   [key: string]: any;
// }

// export async function createStripePaymentMethod(
//   payload: CreateStripePaymentMethodPayload
// ): Promise<{ success: boolean; data?: StripePaymentMethodResponse; error?: string }> {
//   try {
//     if (!STRIPE_SECRET_KEY) {
//       return {
//         success: false,
//         error: "Stripe secret key not configured. Please add STRIPE_SECRET_KEY to your .env.local file.",
//       };
//     }

//     // Create form data for Stripe API
//     const formData = new URLSearchParams();
//     formData.append("type", payload.type);
//     formData.append("card[number]", payload.card.number);
//     formData.append("card[exp_month]", payload.card.exp_month.toString());
//     formData.append("card[exp_year]", payload.card.exp_year.toString());
//     formData.append("card[cvc]", payload.card.cvc);

//     const res = await fetch("https://api.stripe.com/v1/payment_methods", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formData.toString(),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       return {
//         success: false,
//         error: result.error?.message || "Failed to create payment method",
//       };
//     }

//     return {
//       success: true,
//       data: result,
//     };
//   } catch (error) {
//     console.error("Create Stripe payment method error:", error);
//     return {
//       success: false,
//       error: "Failed to create payment method",
//     };
//   }
// }
