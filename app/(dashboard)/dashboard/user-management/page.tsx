import PageHeading from "@/components/PageHeading";
import Pagination from "@/features/table/components/Pagination";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableRow,
  TableBodyItem,
} from "@/features/table/components/Table";
import { TableProvider } from "@/features/table/components/TableProvider";
import { SortDirection } from "@/features/table/types/table.type";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";

// -------------------- Types --------------------
type User = {
  id: string;
  name: string;
  email: string;
  orderedBook: number;
  ongoingOrder: "yes" | "no";
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type SearchParams = {
  page?: string;
  limit?: string;
  sort?: string;
  q?: string;
};

type TableHeaderConfig = {
  key: keyof User;
  label: string;
  sortable?: boolean;
};

// -------------------- Dummy Data (From Image) --------------------
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "2",
    name: "Al Muntakim",
    email: "null@gmail.com",
    orderedBook: 3,
    ongoingOrder: "no",
  },
  {
    id: "3",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 0,
    ongoingOrder: "no",
  },
  {
    id: "4",
    name: "Al Muntakim",
    email: "null@gmail.com",
    orderedBook: 12,
    ongoingOrder: "yes",
  },
  {
    id: "5",
    name: "Al Muntakim",
    email: "null@gmail.com",
    orderedBook: 12,
    ongoingOrder: "no",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
  {
    id: "6",
    name: "Seema Badaya",
    email: "null@gmail.com",
    orderedBook: 2,
    ongoingOrder: "yes",
  },
];

// -------------------- Table Header --------------------
const tableHeader: TableHeaderConfig[] = [
  { key: "name", label: "User Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "orderedBook", label: "Ordered Book", sortable: true },
  { key: "ongoingOrder", label: "Ongoing Order", sortable: true },
];

// -------------------- Helpers --------------------
function filterUsers(users: User[], query: SearchParams): User[] {
  if (!query.q) return users;

  const q = query.q.toLowerCase();
  return users.filter(
    (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
}

function sortUsers(users: User[], sortField: string, sortDirection: string) {
  if (!sortField || !sortDirection) return users;

  return [...users].sort((a, b) => {
    const aVal = a[sortField as keyof User];
    const bVal = b[sortField as keyof User];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

function paginateUsers(users: User[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return users.slice(start, start + limit);
}

function calculateMeta(total: number, page: number, limit: number): Meta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

// -------------------- Component --------------------
export default async function UserTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "15", 15);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  const filteredUsers = filterUsers(DUMMY_USERS, query);
  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection);
  const paginatedUsers = paginateUsers(sortedUsers, page, limit);
  const meta = calculateMeta(filteredUsers.length, page, limit);

  return (
    <TableProvider>
      <div className="mb-6">
        <h1 className="text-[32px] font-medium text-dark-800 mb-3">
          User Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-2">
                  2,20,000
                </h2>
                <p className="text-base text-gray-600">Total Users</p>
              </div>
              <div className="bg-blue-900 rounded-lg p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-2">
                  1000
                </h2>
                <p className="text-base text-gray-600">New User This Month</p>
              </div>
              <div className="bg-blue-900 rounded-lg p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <PageHeading
          title="User Management"
          query={query.q || ""}
          placeholder="Search"
        />

        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((h) => (
                <TableHeaderItem
                  key={h.key}
                  prop={h.key}
                  label={h.label}
                  sortable={h.sortable}
                  currentSort={sortField}
                  sortDirection={sortDirection as SortDirection}
                />
              ))}
              <th className="p-4 text-white">Details</th>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableBodyItem>{user.name}</TableBodyItem>
                <TableBodyItem>{user.email}</TableBodyItem>
                <TableBodyItem>{user.orderedBook}</TableBodyItem>
                <TableBodyItem className="capitalize">
                  {user.ongoingOrder}
                </TableBodyItem>
                <TableBodyItem>
                  <Link
                    href={`/dashboard/user-management/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                </TableBodyItem>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          totalPages={meta.totalPages}
          currentPage={meta.page}
          pageSize={meta.limit}
        />
      </div>
    </TableProvider>
  );
}
