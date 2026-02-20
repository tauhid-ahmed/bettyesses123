"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { ChangeRoleButton } from "@/features/admin/users/components/ChangeRoleButton";
import { SuspendUserButton } from "@/features/admin/users/components/SuspendUserButton";
import BookDetailsPage from "../bookdetails/page";
import { BookOrder } from "../types";
import { Order } from "@/features/admin/users/types";

type UserDetailsClientProps = {
  userId: string;
  userName: string;
  email: string;
  role: "ADMIN" | "USER" | "SUPERADMIN";
  ongoingOrders: Order[];
  suspendedUntil: string | null;
};

export default function UserDetailsClient({
  userId,
  userName,
  email,
  role,
  ongoingOrders,
  suspendedUntil,
}: UserDetailsClientProps) {
  const [selectedBook, setSelectedBook] = useState<BookOrder | null>(null);

  // Map API orders to BookOrder format for BookCards component
  const bookOrders: BookOrder[] = ongoingOrders.map((order, index) => {
    // Get the first order item for book details
    const firstItem = order.orderItems[0];
    const book = firstItem?.book;
    const template = book?.template;

    // Handle image URL
    const imageUrl = template?.coverImage || "/book-cover.jpg";

    return {
      id: index + 1, // Use index as ID
      orderId: order.id, // Pass the actual order ID from API
      image: imageUrl,
      count: order.orderItems.length,
      title: template?.title || "Unknown Book",
      name: book?.childName || "N/A",
      age: book?.age || 0,
      orderDate: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      price: `€ ${order.total.toFixed(2)}`,
    };
  });

  return (
    <>
      <div className="min-h-screen sm:py-6 lg:py-8">
        <div className="space-y-8">
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
                <span className="text-gray-900">{userName}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-900 font-normal w-full sm:w-32 mb-1 sm:mb-0">
                  Email:
                </span>
                <span className="text-gray-900">{email}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-14 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <ChangeRoleButton userId={userId} currentRole={role} />
              <SuspendUserButton userId={userId} suspendedUntil={suspendedUntil} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {!selectedBook ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-[32px] font-medium text-dark-800 mb-2">
                    Ongoing Order Details
                  </h2>
                  <p className="text-base text-[#61758A]">
                    See information about your ongoing
                  </p>
                </div>
                {bookOrders.length === 0 ? (
                  <div className="border-t-2 border-[#99A6B8] pt-10 text-center text-gray-500">
                    No ongoing orders found
                  </div>
                ) : (
                  <div className="border-t-2 border-[#99A6B8] pt-10 space-y-4">
                    {bookOrders.map((book) => (
                      <div
                        key={book.id}
                        className="border border-[#99A6B8] rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedBook(book)}
                      >
                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                          <div className="relative shrink-0 w-48 h-56 bg-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={book.image}
                              alt="Book Cover"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Prevent infinite loop by removing error handler after setting fallback
                                const target = e.currentTarget;
                                if (!target.src.includes("book-cover.jpg")) {
                                  target.src = "/book-cover.jpg";
                                  target.onerror = null; // Remove error handler to prevent loop
                                }
                              }}
                            />
                            {book.count > 1 && (
                              <div className="absolute bg-black/40 inset-0 flex items-center justify-center">
                                <span className="text-[#FFFFFF] text-5xl font-bold">
                                  +{book.count}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-[#2D2D2D] text-2xl font-medium mb-3">
                              {book.title}
                            </h3>

                            <div className="flex flex-col">
                              <div className="flex gap-1 pb-1">
                                <span className="font-medium text-[#636F85]">
                                  Name:
                                </span>
                                <p>{book.name}</p>

                                <span className="font-medium text-[#636F85] ml-3">
                                  Age:
                                </span>
                                <p>{book.age}</p>
                              </div>

                              <div className="flex gap-1 pb-1">
                                <span className="font-medium text-[#636F85]">
                                  Order Date:
                                </span>
                                <p>{book.orderDate}</p>
                              </div>

                              <div className="flex gap-1 pb-1">
                                <span className="font-medium text-[#636F85]">
                                  Status:
                                </span>
                                <p>{book.status}</p>
                              </div>

                              <p className="text-gray-900 font-semibold mt-2">
                                {book.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  bookData={selectedBook}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

