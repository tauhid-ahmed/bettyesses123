"use client";

import React, { useState } from "react";
import { useCart } from "@/features/cart/contexts/CartContext";
import { CartItem } from "@/features/cart/types";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import RemoveCart from "@/features/cart/components/RemoveCart";
import GradientBorder from "@/components/GradientBorder";
import { Button } from "@/components/ui/button";

type Step = 1 | 2 | 3;

interface AddressDetails {
  contact: string;
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
  const { cartItems } = useCart();

  const router = useRouter();

  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    contact: "",
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
    { id: "1", name: "Item 1", price: 250.99, estimatedDays: "3-5 days" },
    { id: "2", name: "Item 2", price: 249.99, estimatedDays: "2-4 days" },
    { id: "3", name: "Item 3 (optional)", price: 0, estimatedDays: "" },
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
    const subtotal = 29.99;
    const shippingFee = 10.0;
    const discount = 10.0;
    const taxes = 10.0;
    const total = 299.99;

    return { subtotal, shippingFee, discount, taxes, total };
  };

  const orderSummary = calculateOrderSummary();

  // Navigation Handlers
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    } else {
      router.push("/payment/success");
    }
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
          <div className="flex justify-between">
            <span className="text-gray-600">Item 1</span>
            <span className="font-medium">
              €{orderSummary.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Item 2</span>
            <span className="font-medium">€0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Item 3</span>
            <span className="font-medium">€0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="font-medium">
              €{orderSummary.shippingFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">
              -€{orderSummary.discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="font-medium">
              €{orderSummary.taxes.toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>€{orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all mb-3"
        >
          Continue
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
            {cartItems.length > 0 &&
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
                    <p className="text-blue-600 font-semibold text-sm">
                      Price: €{item.price.toFixed(2)}
                    </p>
                    {item.quantity}
                  </div>
                  <RemoveCart id={item.id} />
                </div>
              ))}
            {cartItems.length === 0 && (
              <p className="text-sm text-gray-600 text-center md:text-lg lg:text-lg py-6">
                Your cart is empty.
              </p>
            )}
          </div>
        </GradientBorder>

        <GradientBorder className="text-center" padding="lg">
          <p className="md:text-lg">Add personalized books</p>
          <Button
            className="bg-transparent border-primary-500 text-primary-500 rounded-lg mt-4"
            variant="outline"
          >
            Add more personalized books
          </Button>
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
              We'll use this email address to send you details and updates about
              your order.
            </p>
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
