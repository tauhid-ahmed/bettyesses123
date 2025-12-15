import Pagination from "@/features/table/components/Pagination";
import SearchField from "@/features/table/components/SearchField";
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
import Link from "next/link";

// -------------------- Types --------------------
type UserTier = "FREE" | "PREMIUM";
type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
type UserGender = "male" | "female" | "other" | null;

type User = {
  id: string;
  fullName: string;
  profilePic: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  status: string;
  tier: UserTier;
  emailVerified: boolean;
  createdAt: string;
  Profile: {
    gender: UserGender;
  } | null;
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
  tier?: "all" | "free" | "premium";
};

type TableHeaderConfig = {
  key: keyof User | "gender";
  label: string;
  sortable?: boolean;
};

// -------------------- Dummy Data --------------------
const DUMMY_USERS: User[] = [
  {
    id: "1",
    fullName: "John Doe",
    profilePic: null,
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "USER",
    status: "active",
    tier: "PREMIUM",
    emailVerified: true,
    createdAt: "2024-01-15T10:30:00Z",
    Profile: { gender: "male" },
  },
  {
    id: "2",
    fullName: "Jane Smith",
    profilePic: null,
    email: "jane.smith@example.com",
    phone: "+1234567891",
    role: "ADMIN",
    status: "active",
    tier: "FREE",
    emailVerified: true,
    createdAt: "2024-02-20T14:45:00Z",
    Profile: { gender: "female" },
  },
  {
    id: "3",
    fullName: "Alice Johnson",
    profilePic: null,
    email: "alice.j@example.com",
    phone: null,
    role: "USER",
    status: "active",
    tier: "PREMIUM",
    emailVerified: false,
    createdAt: "2024-03-10T09:15:00Z",
    Profile: { gender: "female" },
  },
  {
    id: "4",
    fullName: "Bob Williams",
    profilePic: null,
    email: "bob.w@example.com",
    phone: "+1234567892",
    role: "SUPER_ADMIN",
    status: "active",
    tier: "PREMIUM",
    emailVerified: true,
    createdAt: "2024-01-05T08:00:00Z",
    Profile: { gender: "male" },
  },
  {
    id: "5",
    fullName: "Carol Davis",
    profilePic: null,
    email: "carol.d@example.com",
    phone: "+1234567893",
    role: "USER",
    status: "inactive",
    tier: "FREE",
    emailVerified: true,
    createdAt: "2024-04-01T11:20:00Z",
    Profile: null,
  },
  {
    id: "6",
    fullName: "Carol Davis 3",
    profilePic: null,
    email: "carol.d@example.com",
    phone: "+1234567893",
    role: "USER",
    status: "inactive",
    tier: "FREE",
    emailVerified: true,
    createdAt: "2024-04-01T11:20:00Z",
    Profile: null,
  },
];

// -------------------- Table Header --------------------
const tableHeader: TableHeaderConfig[] = [
  { key: "fullName", label: "Name", sortable: true },
  { key: "gender", label: "Gender", sortable: true },
  { key: "tier", label: "Plan", sortable: true },
];

// -------------------- Helper Functions --------------------
function filterUsers(users: User[], query: SearchParams): User[] {
  let filtered = [...users];

  // Search filter
  if (query.q) {
    const searchTerm = query.q.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  // Tier filter
  if (query.tier && query.tier !== "all") {
    filtered = filtered.filter(
      (user) => user.tier === query.tier!.toUpperCase()
    );
  }

  return filtered;
}

function sortUsers(
  users: User[],
  sortField: string,
  sortDirection: string
): User[] {
  if (!sortField || !sortDirection) return users;

  return [...users].sort((a, b) => {
    let comparison = 0;

    if (sortField === "fullName") {
      comparison = a.fullName.localeCompare(b.fullName);
    } else if (sortField === "tier") {
      comparison = a.tier.localeCompare(b.tier);
    } else if (sortField === "gender") {
      const genderA = a.Profile?.gender || "";
      const genderB = b.Profile?.gender || "";
      comparison = genderA.localeCompare(genderB);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });
}

function paginateUsers(users: User[], page: number, limit: number): User[] {
  const startIndex = (page - 1) * limit;
  return users.slice(startIndex, startIndex + limit);
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
export default async function TopProviders({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  // Parse parameters with defaults
  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "10", 10);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  // Process data
  const filteredUsers = filterUsers(DUMMY_USERS, query);
  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection);
  const paginatedUsers = paginateUsers(sortedUsers, page, limit);
  const meta = calculateMeta(filteredUsers.length, page, limit);

  return (
    <TableProvider>
      <div className="space-y-4 overflow-x-hidden">
        <div className="flex items-center lg:justify-end print:hidden">
          <SearchField
            placeholder="Search users..."
            initialValue={query.q || ""}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map(({ key, label, sortable = true }) => (
                <TableHeaderItem
                  key={key}
                  prop={key}
                  currentSort={sortField}
                  sortDirection={sortDirection as SortDirection}
                  label={label}
                  sortable={sortable}
                />
              ))}
              <th
                className={cn(
                  "w-full flex items-center gap-2 p-4! py-1 truncate font-medium text-white transition cursor-pointer no-underline"
                )}
              >
                Details
              </th>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableBodyItem colSpan={tableHeader.length + 1}>
                  <div className="text-center py-8 text-gray-500">
                    No users found
                  </div>
                </TableBodyItem>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  {/* Name Column */}
                  <TableBodyItem>{user.fullName}</TableBodyItem>

                  {/* Gender Column */}
                  <TableBodyItem>
                    <span className="text-sm text-gray-900 capitalize">
                      {user.Profile?.gender || "N/A"}
                    </span>
                  </TableBodyItem>

                  {/* Plan Column */}
                  <TableBodyItem>
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        // user.tier === "PREMIUM"
                        //   ? "bg-[#FE5975] text-pink-50"
                        //   : "text-gray-600 bg-gray-100"
                      )}
                    >
                      {user.tier === "PREMIUM" ? "Premium" : "Free"}
                    </span>
                  </TableBodyItem>
                  <TableBodyItem>
                    <Link
                      className="text-sm text-primary-500 capitalize hover:underline"
                      href={`/mover-management/${user.id}`}
                    >
                      View Details
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
