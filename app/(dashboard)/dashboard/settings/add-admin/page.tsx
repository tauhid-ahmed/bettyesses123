"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddAdminModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddAdminModal({ isOpen = true }: AddAdminModalProps) {
  const router = useRouter();
  const [adminName, setAdminName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const handleSubmit = () => {
    if (!adminName.trim()) {
      toast.error("Please enter Admin Name.");
      return;
    }
    if (!emailAddress.trim()) {
      toast.error("Please enter Email Address.");
      return;
    }

    submitAdmin();
  };

  const submitAdmin = async () => {
    try {
      const res = await fetch("/api/admin/users/admins/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminName, emailAddress }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        toast.error(data?.message || "Failed to create admin");
        return;
      }

      toast.success(data.message || "Admin created successfully");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-screen flex items-center justify-center p-4 z-50">
      <div className="rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-3">MOVEFORCE</h1>
          <h2 className="text-xl font-semibold text-[#1C1C1C]">
            Add new admin
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8">
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

        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.back()}
            className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-[#00244A] text-white rounded-lg font-medium"
          >
            Add As Admin
          </button>
        </div>
      </div>
    </div>
  );
}
