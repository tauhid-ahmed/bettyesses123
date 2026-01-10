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
import { Users } from "lucide-react";
import Link from "next/link";
import { getUserStats } from "@/features/admin/users/actions/get-user-stats";
import { getUsers } from "@/features/admin/users/actions/get-users";

// Force dynamic rendering to prevent caching issues
export const dynamic = "force-dynamic";

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
  searchTerm?: string;
  status?: string;
};

type TableHeaderConfig = {
  key: keyof User;
  label: string;
  sortable?: boolean;
};

// -------------------- Helper to map API user to User type --------------------
function mapApiUserToUser(apiUser: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orderedBooks: number;
  hasOngoingOrder: boolean;
}): User {
  return {
    id: apiUser.id,
    name: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
    email: apiUser.email,
    orderedBook: apiUser.orderedBooks,
    ongoingOrder: apiUser.hasOngoingOrder ? "yes" : "no",
  };
}

// -------------------- Table Header --------------------
const tableHeader: TableHeaderConfig[] = [
  { key: "name", label: "User Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "orderedBook", label: "Ordered Book", sortable: true },
  { key: "ongoingOrder", label: "Ongoing Order", sortable: true },
];


// -------------------- Helper --------------------
function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

// -------------------- Component --------------------
export default async function UserTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  // Ensure limit is properly parsed and is a valid number
  const limitParam = query.limit ? parseInt(query.limit, 10) : 20;
  const limit = isNaN(limitParam) || limitParam <= 0 ? 20 : limitParam;
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  // Get search term from URL (support both 'q' and 'searchTerm' for compatibility)
  // Convert to lowercase as required
  const searchTerm = query.searchTerm || query.q;
  const searchTermLower = searchTerm ? searchTerm.toLowerCase() : undefined;

  // Fetch users from API
  const usersResponse = await getUsers({
    page,
    limit,
    searchTerm: searchTermLower,
    status: query.status,
  });

  // Map API users to User type
  const users: User[] = usersResponse?.data
    ? usersResponse.data.map(mapApiUserToUser)
    : [];

  // Use API meta or fallback
  const meta: Meta = usersResponse?.meta
    ? {
        page: usersResponse.meta.page,
        limit: usersResponse.meta.limit,
        total: usersResponse.meta.total,
        totalPages: usersResponse.meta.totalPage,
      }
    : {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      };

  // Fetch user stats
  const userStats = await getUserStats();

  return (
    <TableProvider>
      <div className="mb-6">
        <h1 className="text-[32px] font-medium text-dark-800 mb-3">
          User Overview
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-2">
                  {userStats ? formatNumber(userStats.totalUsers) : "0"}
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
                  {userStats ? formatNumber(userStats.newUsers) : "0"}
                </h2>
                <p className="text-base text-gray-600">New User This Month</p>
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
                  {userStats ? formatNumber(userStats.activeUsers) : "0"}
                </h2>
                <p className="text-base text-gray-600">Active Users</p>
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
                  {userStats ? formatNumber(userStats.suspendedUsers) : "0"}
                </h2>
                <p className="text-base text-gray-600">Suspended Users</p>
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
          query={searchTerm || ""}
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
            {users.length === 0 ? (
              <TableRow>
                <TableBodyItem colSpan={5} className="text-center py-8">
                  No users found
                </TableBodyItem>
              </TableRow>
            ) : (
              users.map((user) => (
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
              ))
            )}
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
