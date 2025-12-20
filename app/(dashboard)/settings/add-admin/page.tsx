"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface AddAdminModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddAdminModal({
  isOpen = true,
  onClose,
}: AddAdminModalProps) {
  const [adminName, setAdminName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const handleSubmit = () => {
    console.log("Admin Name:", adminName);
    console.log("Email Address:", emailAddress);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setAdminName("");
    setEmailAddress("");
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="h-screen flex items-center justify-center p-4 z-50">
      <div className="rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-3">MOVEFORCE</h1>
          <h2 className="text-xl font-semibold text-[#1C1C1C]">
            Add new admin
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8">
          {/* Admin Name */}
          <div>
            <label
              htmlFor="adminName"
              className="block text-sm text-gray-700 mb-2"
            >
              Admin Name:
            </label>
            <input
              type="text"
              id="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=""
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="emailAddress"
              className="block text-sm text-gray-700 mb-2"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=""
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Link
            href={"/settings?t=top-providers"}
            onClick={handleCancel}
            className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-[#00244A] text-white rounded-lg  font-medium"
          >
            Add As Admin
          </button>
        </div>
      </div>
    </div>
  );
}
