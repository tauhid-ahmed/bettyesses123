"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Admin = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function AdminListClient({ admins }: { admins: Admin[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 16;
  const totalItems = 1450;
  const itemsPerPage = 11;

  const [selectedRoles, setSelectedRoles] = useState<Record<string | number, string>>(
    admins.reduce((acc, admin) => ({ ...acc, [admin.id]: admin.role }), {})
  );

  const handleRoleChange = (adminId: string | number, newRole: string) => {
    setSelectedRoles((prev) => ({ ...prev, [adminId]: newRole }));
  };

  return (
    <div className=" pt-12">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Admin List</h1>
          <Link
            href={"settings/add-admin"}
            className="flex items-center gap-2 bg-[#00244A] text-[#FAFAFA] px-4 py-2 rounded-lg  transition-colors"
          >
            <Plus size={20} />
            Add Admin
          </Link>
        </div>

        {/* Table */}
        <div className=" overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[#73B7FF] text-white px-6 py-3 rounded-t-xl">
            <div className="font-medium">User Name</div>
            <div className="font-medium">Email</div>
            <div className="font-medium">Role</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="grid grid-cols-3 px-6 py-4 items-center hover:bg-gray-50"
              >
                <div className="text-gray-900">{admin.firstName} {admin.lastName}</div>
                <div className="text-gray-900">{admin.email}</div>
                <div>
                  <select
                    value={selectedRoles[admin.id]}
                    onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                    className="flex items-center gap-2 bg-[#00244A] text-white px-4 py-2 rounded-md  text-sm cursor-pointer appearance-none pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="ADMIN" className="bg-white text-gray-900">Admin</option>
                    <option value="USER" className="bg-white text-gray-900">User</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-600 text-sm flex items-center gap-2">
            <span>Showing</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>{itemsPerPage}</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span>out of {totalItems.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`min-w-[36px] px-3 py-1.5 rounded transition-colors text-sm ${
                currentPage === 1
                  ? "bg-[#0556AB] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              1
            </button>

            <button
              onClick={() => setCurrentPage(2)}
              className={`min-w-[36px] px-3 py-1.5 rounded transition-colors text-sm ${
                currentPage === 2
                  ? "bg-[#0556AB] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              2
            </button>

            <button
              onClick={() => setCurrentPage(3)}
              className={`min-w-[36px] px-3 py-1.5 rounded transition-colors text-sm ${
                currentPage === 3
                  ? "bg-[#0556AB] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              3
            </button>

            <span className="px-2 text-gray-400">...</span>

            <button
              onClick={() => setCurrentPage(16)}
              className={`min-w-[36px] px-3 py-1.5 rounded transition-colors text-sm ${
                currentPage === 16
                  ? "bg-[#0556AB] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              16
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
