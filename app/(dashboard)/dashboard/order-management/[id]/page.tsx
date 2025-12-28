"use client";

import { ChevronDown, X, AlertCircle } from "lucide-react";
import { useState } from "react";

import BookCards from "@/components/order-management/bookcards/BookCards";
import BookDetailsPage from "../bookdetails/page";
import { BookOrder } from "../types";

export default function UserDetailsPage() {
  const [selectedRole, setSelectedRole] = useState("User");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [seletectedBook, setSelectedBook] = useState<BookOrder | null>(null);

  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const roleOptions: string[] = [
    "Everyone",
    "New User",
    "One Year Old User",
    "2 Year Old User",
    "User",
  ];

  return (
    <>
      <div className="min-h-screen sm:py-6 lg:py-8">
        <div className=" space-y-8">
          <div className="bg-white rounded-xl shadow-xs p-6">
            <div className="mb-6">
              <h1 className="text-[32px] font-medium text-dark-800 mb-2">
                User Details
              </h1>
              <p className="text-base text-[#61758A]">
                See The full Info On A User
              </p>
            </div>

            <div className="border-t-2 border-[#99A6B8] pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-900 font-normal w-full sm:w-32 mb-1 sm:mb-0">
                  User Name:
                </span>
                <span className="text-gray-900">Al Muntakim</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-900 font-normal w-full sm:w-32 mb-1 sm:mb-0">
                  Email:
                </span>
                <span className="text-gray-900">null@gmail.com</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-dark-800 font-normal text-xl">
                  Change Role:
                </span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="px-6 py-2 bg-[#00244A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00244A] flex items-center gap-2 justify-between"
                  >
                    <span>{selectedRole}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showRoleDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {roleOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedRole(option);
                            setShowRoleDropdown(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowSuspendModal(true)}
                className="px-6 py-2 bg-[#E63946] hover:bg-[#E63946] text-white rounded-md transition-colors font-normal"
              >
                Suspend User
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {!seletectedBook ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-[32px] font-medium text-dark-800 mb-2">
                    Ongoing Order Details
                  </h2>
                  <p className="text-base text-[#61758A]">
                    See information about your ongoing
                  </p>
                </div>
                <BookCards setSelectedBook={setSelectedBook} />
              </div>
            ) : (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-[32px] font-medium text-dark-800 mb-2">
                      Book Details
                    </h2>
                    <p className="text-base text-[#61758A]">
                      See information about the book
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-sm text-red-600 mt-2 border-red-300 border rounded-full p-1 hover:bg-red-200"
                  >
                    <X />
                  </button>
                </div>
                <BookDetailsPage
                  setSelectedBook={setSelectedBook}
                  bookData={seletectedBook}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>

            <h2 className="mb-6 text-center text-lg font-semibold text-gray-900">
              Are you sure you want to suspend this User?
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                }}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-800 hover:border hover:border-red-600 hover:font-bold
                "
              >
                Suspend
              </button>

              <button
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 rounded-md bg-[#00244A] px-4 py-2 text-sm font-medium text-white hover:bg-[#001a36]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
