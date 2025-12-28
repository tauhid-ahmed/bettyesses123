"use client";

import { useState } from "react";
import { Mail, Home, Download } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";

function PaymentSuccessPage({ orderId = "123456ZX" }) {
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleSendBook = (): void => {
    if (email.trim() && email.includes("@")) {
      setIsEmailSent(true);
      setTimeout(() => setIsEmailSent(false), 3000);
      setEmail("");
    }
  };

  const handleDownloadReceipt = (): void => {};

  const handleBackToHome = (): void => {};

  return (
    <div className="min-h-[90vh] bg-primary-100/90 flex items-center justify-center p-4">
      <Container size="md">
        <div className="flex flex-col items-center">
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-48 rounded-2xl overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=400&fit=crop"
                alt="Gift boxes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Heading
            as="h1"
            size="h4"
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Payment Successful
          </Heading>

          <p className="text-gray-600 mb-8">
            Your Order ID:{" "}
            <span className="font-semibold text-gray-900">{orderId}</span>
          </p>

          <div className="bg-primary-100 rounded-2xl p-6 mb-6 border border-primary-500">
            <p className="text-sm text-gray-700 mb-4 text-left font-medium">
              Want the PDF Copy? Enter your email, and we will mail you the book
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <div className="flex-1 w-full sm:flex-4 flex items-center relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-primary-200 transition"
                />
              </div>
              <Button
                onClick={handleSendBook}
                className="primary-gradient w-full sm:w-auto flex-1"
              >
                Send Book
              </Button>
            </div>

            {isEmailSent && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm text-emerald-700 font-medium">
                  ✓ Email sent successfully! Check your inbox.
                </p>
              </div>
            )}
          </div>

          <div className="flex *:flex-1 flex-wrap gap-3 justify-center items-center">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="text-primary-500 border-primary-500! px-6! hover:text-primary-500"
            >
              <Home size="16" className="size-4!" />
              Back To Home
            </Button>
            <Button onClick={handleDownloadReceipt}>
              <Download size="16" className="size-4!" />
              Download Receipt
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function PaymentSuccess() {
  return <PaymentSuccessPage orderId="123456ZX" />;
}
