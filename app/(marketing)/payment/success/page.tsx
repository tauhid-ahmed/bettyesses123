"use client";

import React, { useState } from "react";
import { Mail, Home, Download, CheckCircle } from "lucide-react";

// ==================== COMPONENTS ====================

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

  const handleDownloadReceipt = (): void => {
    console.log("Downloading receipt...");
    // Add download logic here
  };

  const handleBackToHome = (): void => {
    console.log("Navigating to home...");
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Gift Image */}
          <div className="mb-6 flex justify-center">
            <div className="w-64 h-48 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=400&fit=crop"
                alt="Gift boxes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Success Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful
          </h1>

          {/* Order ID */}
          <p className="text-gray-600 mb-8">
            Your Order ID:{" "}
            <span className="font-semibold text-gray-900">{orderId}</span>
          </p>

          {/* Email Section */}
          <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 border border-purple-100">
            <p className="text-sm text-gray-700 mb-4 text-left font-medium">
              Want the PDF Copy? Enter your email, and we will mail you the book
            </p>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                />
              </div>
              <button
                onClick={handleSendBook}
                className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium shadow-md hover:shadow-lg"
              >
                Send Book
              </button>
            </div>

            {isEmailSent && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  ✓ Email sent successfully! Check your inbox.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleBackToHome}
              className="flex-1 py-3 px-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back To Home
            </button>
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
function App() {
  return <PaymentSuccessPage orderId="123456ZX" />;
}

export default App;
