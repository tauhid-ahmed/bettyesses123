"use client";

import React, { useState, useTransition } from "react";
import { useCart } from "@/features/cart/contexts/CartContext";
import { CartItem } from "@/features/cart/types";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import RemoveCart from "@/features/cart/components/RemoveCart";
import GradientBorder from "@/components/GradientBorder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { createOrder } from "@/features/orders/actions/create-order";
import { createStripePaymentMethod } from "@/features/orders/actions/create-stripe-payment-method";
import { processPayment } from "@/features/orders/actions/process-payment";



type Step = 1 | 2 | 3;

interface AddressDetails {
  contact: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pinCode: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface PaymentDetails {
  billingAddress: "same" | "different";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discount: number;
  taxes: number;
  total: number;
}

function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [saveInfo, setSaveInfo] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { cartItems, subtotal, isLoading } = useCart();
  const [isPending, startTransition] = useTransition();

  console.log("cart data",cartItems);

  const router = useRouter();

  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    contact: "",
    phone: "",
    country: "Bangladesh",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [deliveryOptions] = useState<DeliveryOption[]>([
    { id: "1", name: "Standard Shipping", price: 10.0, estimatedDays: "3-5 days" },
  ]);
  const [selectedDelivery, setSelectedDelivery] = useState<string>("1");

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    billingAddress: "same",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const calculateOrderSummary = (): OrderSummary => {
    const selectedDeliveryOption = deliveryOptions.find(o => o.id === selectedDelivery);
    const shippingFee = selectedDeliveryOption ? selectedDeliveryOption.price : 0;
    const discount = 0; // Backend doesn't provide discount yet
    const taxes = 0; // Assuming taxes are included in price or zero
    const total = subtotal + shippingFee - discount + taxes;

    return { subtotal, shippingFee, discount, taxes, total };
  };

  const orderSummary = calculateOrderSummary();

  // Parse expiry date from MM/YY format
  const parseExpiryDate = (expiry: string): { month: number; year: number } | null => {
    const parts = expiry.split("/").map((p) => p.trim());
    if (parts.length !== 2) return null;
    
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return null;
    
    // Convert YY to YYYY (assuming 20YY for years < 100)
    const fullYear = year < 100 ? 2000 + year : year;
    
    return { month, year: fullYear };
  };

  // Navigation Handlers
  const handleContinue = async () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    } else {
      // Step 3: Process payment
      await handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    // Validate address details
    if (!addressDetails.contact || !addressDetails.firstName || !addressDetails.lastName || 
        !addressDetails.address || !addressDetails.city || !addressDetails.state || 
        !addressDetails.pinCode) {
      toast.error("Please fill in all address details");
      return;
    }

    // Validate payment details
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    // Parse expiry date
    const expiry = parseExpiryDate(paymentDetails.expiryDate);
    if (!expiry) {
      toast.error("Invalid expiry date format. Please use MM/YY");
      return;
    }

    setIsProcessing(true);

    startTransition(async () => {
      try {
        // Step 1: Create Order
        const orderPayload = {
          email: addressDetails.contact,
          phone: addressDetails.phone || addressDetails.contact,
          country: addressDetails.country,
          firstName: addressDetails.firstName,
          lastName: addressDetails.lastName,
          streetAddress: addressDetails.address,
          city: addressDetails.city,
          state: addressDetails.state,
          postalCode: addressDetails.pinCode,
        };

        const orderResult = await createOrder(orderPayload);
        
        if (!orderResult.success) {
          toast.error(orderResult.message || "Failed to create order");
          setIsProcessing(false);
          return;
        }

        const orderId = orderResult.data.id;
        toast.success("Order created successfully");

        // Step 2: Create Stripe Payment Method
        const cardNumber = paymentDetails.cardNumber.replace(/\s/g, ""); // Remove spaces
        const paymentMethodPayload = {
          type: "card",
          card: {
            number: cardNumber,
            exp_month: expiry.month,
            exp_year: expiry.year,
            cvc: paymentDetails.cvv,
          },
        };

        const paymentMethodResult = await createStripePaymentMethod(paymentMethodPayload);
        
        if (!paymentMethodResult.success || !paymentMethodResult.data) {
          toast.error(paymentMethodResult.error || "Failed to create payment method");
          setIsProcessing(false);
          return;
        }

        const paymentMethodId = paymentMethodResult.data.id;
        toast.success("Payment method created");

        // Step 3: Process Payment
        const processPaymentResult = await processPayment({
          orderId,
          paymentMethodId,
        });

        if (!processPaymentResult.success) {
          toast.error(processPaymentResult.message || "Failed to process payment");
          setIsProcessing(false);
          return;
        }

        toast.success("Payment processed successfully!");
        
        // Redirect to success page
        router.push("/payment/success");
      } catch (error) {
        console.error("Payment processing error:", error);
        toast.error("An error occurred while processing your payment");
        setIsProcessing(false);
      }
    });
  };

  // Form Handlers
  const handleAddressChange = (field: keyof AddressDetails, value: string) => {
    setAddressDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  function renderProgressSteps() {
    const steps: Array<{ num: Step; label: string }> = [
      { num: 1, label: "Step 1" },
      { num: 2, label: "Step 2" },
      { num: 3, label: "Step 3" },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.num
                    ? "bg-linear-to-r from-blue-500 to-purple-500 text-white"
                    : currentStep > step.num
                    ? "bg-linear-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.num}
              </div>
              <span className="text-xs mt-1 text-gray-600">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-20 mx-2 mb-4 ${
                  currentStep > step.num
                    ? "bg-linear-to-r from-blue-500 to-purple-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  function renderOrderSummary() {
    return (
      <div className="rounded-lg border border-primary-500 p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4 text-sm">
          {cartItems.map((item, index) => (
            <div key={item.id + index} className="flex justify-between">
              <span className="text-gray-600">{item.title}</span>
              <span className="font-medium">
                €{item.price.toFixed(2)}
              </span>
            </div>
          ))}
          
          <div className="border-t pt-3 mt-3 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                €{orderSummary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Fee</span>
              <span className="font-medium">
                €{orderSummary.shippingFee.toFixed(2)}
              </span>
            </div>
            {orderSummary.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  -€{orderSummary.discount.toFixed(2)}
                </span>
              </div>
            )}
            {orderSummary.taxes > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">
                  €{orderSummary.taxes.toFixed(2)}
                </span>
              </div>
            )}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={cartItems.length === 0 || isLoading || isProcessing}
          className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all mb-3 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : isProcessing ? "Processing..." : currentStep === 3 ? "Place Order" : "Continue"}
        </button>
      </div>
    );
  }

  function renderCartStep() {
    return (
      <div className="space-y-6">
        <GradientBorder>
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
          <p className="text-sm text-gray-600 mb-6">
            Check your items and select your shipping for better experience
            order item.
          </p>

          <div className="space-y-4 mb-6">
            {isLoading ? (
              <div className="py-10 text-center text-gray-500">Loading cart items...</div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item: CartItem, index) => (
                <div
                  key={item.id + index}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg relative"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                    {item.childName && (
                      <p className="text-sm text-gray-600">Name: <span className="font-semibold">{item.childName}</span></p>
                    )}
                    {item.age !== undefined && (
                      <p className="text-sm text-gray-600 mb-1">Age: <span className="font-semibold">{item.age} years</span></p>
                    )}
                    <p className="text-blue-600 font-semibold text-sm">
                      Price: €{item.price.toFixed(2)}
                    </p>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-gray-500">Quantity: {item.quantity}</span>
                      <button className="text-md font-medium bg-linear-to-r from-[#61C2FF] to-[#C77DFF] bg-clip-text text-transparent underline decoration-[#61C2FF]/40 hover:opacity-80 transition-opacity">
                        Edit
                      </button>
                    </div>
                  </div>
                  <RemoveCart id={item.id} />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600 text-center md:text-lg lg:text-lg py-6">
                Your cart is empty.
              </p>
            )}
          </div>
        </GradientBorder>

        <GradientBorder className="text-center" padding="lg">
          <p className="md:text-lg">Add personalized books</p>
       <Link href="/books">
          <Button
            className="bg-transparent border-primary-500 text-primary-500 rounded-lg mt-4"
            variant="outline"
          >
            Add more personalized books
          </Button>
       </Link>
        </GradientBorder>
      </div>
    );
  }

  function renderAddressStep() {
    return (
      <div className="rounded-lg border border-primary-400 p-6">
        <h2 className="text-xl font-semibold mb-6">Address Details</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Contact
            </label>
            <input
              type="email"
              placeholder="Email"
              value={addressDetails.contact}
              onChange={(e) => handleAddressChange("contact", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll use this email address to send you details and updates about
              your order.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Phone number"
              value={addressDetails.phone}
              onChange={(e) => handleAddressChange("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Country
            </label>
            <select
              value={addressDetails.country}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={addressDetails.firstName}
                onChange={(e) =>
                  handleAddressChange("firstName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={addressDetails.lastName}
                onChange={(e) =>
                  handleAddressChange("lastName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={addressDetails.address}
              onChange={(e) => handleAddressChange("address", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Apartment, suite, etc. (Optional)
            </label>
            <input
              type="text"
              value={addressDetails.apartment}
              onChange={(e) => handleAddressChange("apartment", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                City
              </label>
              <input
                type="text"
                value={addressDetails.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                State
              </label>
              <input
                type="text"
                value={addressDetails.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Pin Code
              </label>
              <input
                type="text"
                value={addressDetails.pinCode}
                onChange={(e) => handleAddressChange("pinCode", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Delivery</h3>
          <div className="space-y-3 mb-4">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-400"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={selectedDelivery === option.id}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <div>
                    <div className="font-medium text-sm">{option.name}</div>
                    {option.estimatedDays && (
                      <div className="text-xs text-gray-500">
                        {option.estimatedDays}
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-semibold text-sm">
                  €{option.price.toFixed(2)}
                </span>
              </label>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-gray-700">
              Save this information for next time
            </span>
          </label>
        </div>
      </div>
    );
  }

  function renderPaymentStep() {
    return (
      <div className="rounded-lg border border-primary-500 p-6">
        <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Billing Address
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billingAddress"
                  value="same"
                  checked={paymentDetails.billingAddress === "same"}
                  onChange={(e) =>
                    handlePaymentChange(
                      "billingAddress",
                      e.target.value as "same" | "different"
                    )
                  }
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm text-gray-700">
                  Same as shipping address
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billingAddress"
                  value="different"
                  checked={paymentDetails.billingAddress === "different"}
                  onChange={(e) =>
                    handlePaymentChange(
                      "billingAddress",
                      e.target.value as "same" | "different"
                    )
                  }
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm text-gray-700">
                  Use a different billing address
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              placeholder="Card"
              value={paymentDetails.cardNumber}
              onChange={(e) =>
                handlePaymentChange("cardNumber", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  handlePaymentChange("expiryDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                CVV
              </label>
              <input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="Enter the name on your card"
              value={paymentDetails.nameOnCard}
              onChange={(e) =>
                handlePaymentChange("nameOnCard", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <label className="flex items-center gap-2 text-sm pt-2">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-gray-700">
              Save card information for next time
            </span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <Section padding="sm" className="bg-primary-100/80 min-h-screen">
      <Container>
        {renderProgressSteps()}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {currentStep === 1 && renderCartStep()}
            {currentStep === 2 && renderAddressStep()}
            {currentStep === 3 && renderPaymentStep()}
          </div>

          <div className="lg:col-span-1">{renderOrderSummary()}</div>
        </div>
      </Container>
    </Section>
  );
}

export default CheckoutFlow;
