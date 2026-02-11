"use client";

import React, { useEffect, useRef } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/constants";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY as string) : null;

interface StripeCardElementInnerProps {
  onPaymentMethodReady: (getPaymentMethod: () => Promise<{ success: boolean; paymentMethodId?: string; error?: string }>) => void;
}

function StripeCardElementInner({ onPaymentMethodReady }: StripeCardElementInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const callbackRef = useRef(onPaymentMethodReady);

  useEffect(() => {
    callbackRef.current = onPaymentMethodReady;
  }, [onPaymentMethodReady]);

  useEffect(() => {
    if (stripe && elements) {
      callbackRef.current(async () => {
        if (!stripe || !elements) {
          return { success: false, error: "Stripe not loaded" };
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          return { success: false, error: "Card element not found" };
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          return { success: false, error: error.message || "Failed to create payment method" };
        }

        if (paymentMethod) {
          return { success: true, paymentMethodId: paymentMethod.id };
        }

        return { success: false, error: "Payment method creation returned no data" };
      });
    }
  }, [stripe, elements]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1.5 text-gray-700">
        Card Details
      </label>
      <div className="px-3 py-2 border border-gray-300 rounded-lg bg-white min-h-[40px]">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default function StripeCardElementWrapper(props: StripeCardElementInnerProps) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCardElementInner {...props} />
    </Elements>
  );
}
