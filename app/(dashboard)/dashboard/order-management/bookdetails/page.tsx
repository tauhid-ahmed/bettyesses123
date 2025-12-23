/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";

type BookOrder = {
  id: number;
  title: string;
  name: string;
  age: number;
  count: number;
  price: string;
  status: string;
};

type BookDetailsPageProps = {
  bookData: BookOrder | null;
  setSelectedBook: unknown;
};

type BookInfo = {
  bookName: string;
  childName: string;
  childGender: string;
  childAge: number;
  birthMonth: string;
  bookPrice: string;
  shippingCost: string;
  totalCost: string;
  orderId: string;
};

export default function BookDetailsPage({
  bookData,
  setSelectedBook,
}: BookDetailsPageProps) {
  if (!bookData) return null;

  const [status, setStatus] = useState<string>(bookData.status || "Processing");

  const books: BookInfo[] = Array.from({ length: bookData.count }).map(
    (_, index) => ({
      bookName: bookData.title,
      childName: bookData.name,
      childGender: "N/A",
      childAge: bookData.age,
      birthMonth: "N/A",
      bookPrice: bookData.price,
      shippingCost: "Included",
      totalCost: bookData.price,
      orderId: `${bookData.id}-${index + 1}`,
    })
  );

  return (
    <div className="border-t-2 border-[#99A6B8] pt-6 space-y-10">
      {books.map((book, index) => (
        <div key={index} className="space-y-3">
          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Book Name:</span>
            <span>{book.bookName}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Child Name:</span>
            <span>{book.childName}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Child Gender:</span>
            <span>{book.childGender}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Child Age:</span>
            <span>{book.childAge}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Child&apos;s Birth Month:</span>
            <span>{book.birthMonth}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Book Price:</span>
            <span>{book.bookPrice}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Shipping Cost:</span>
            <span>{book.shippingCost}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Total Cost:</span>
            <span>{book.totalCost}</span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="w-48">Order ID:</span>
            <span>{book.orderId}</span>
          </div>

          {index !== books.length - 1 && (
            <div className="border-t-2 border-[#99A6B8] pt-6 mt-6"></div>
          )}
        </div>
      ))}

      <div className="border-t-2 border-[#99A6B8] pt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex gap-3">
          <span>Status:</span>
          <span>{status}</span>
        </div>

        <button
          onClick={() =>
            setStatus((prev) =>
              prev === "Processing" ? "Shipped" : "Processing"
            )
          }
          className="px-6 py-2 bg-[#00244A] text-white rounded-md"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}
