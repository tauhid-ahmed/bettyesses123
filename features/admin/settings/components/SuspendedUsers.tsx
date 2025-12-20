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
import { cn } from "@/lib/utils";

// -------------------- Types --------------------
type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
};

type SuspendedUser = {
  id: string;
  userName: string;
  suspendedFrom: string;
  suspendedTo: string;
};

// -------------------- Dummy Data (IMAGE BASED) --------------------
const DUMMY_SUSPENDED_USERS: SuspendedUser[] = Array.from(
  { length: 1450 },
  (_, i) => ({
    id: `${i + 1}`,
    userName: "Al Muntakim",
    suspendedFrom: "21 Oct, 2025",
    suspendedTo: "30 Aug 2026",
  })
);

// -------------------- Table Header --------------------
const tableHeader = [
  { key: "userName", label: "User Name", sortable: false },
  { key: "suspensionPeriod", label: "Suspension Period", sortable: false },
  { key: "suspension", label: "Suspension", sortable: false },
];

// -------------------- Helpers --------------------
function filterUsers(users: SuspendedUser[], query: SearchParams) {
  if (!query.q) return users;
  return users.filter((u) =>
    u.userName.toLowerCase().includes(query.q!.toLowerCase())
  );
}

function paginateUsers(users: SuspendedUser[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  return users.slice(startIndex, startIndex + limit);
}

function calculateMeta(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

// -------------------- Component --------------------
export default async function Suspended({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "11", 10);

  const filteredUsers = filterUsers(DUMMY_SUSPENDED_USERS, query);
  const paginatedUsers = paginateUsers(filteredUsers, page, limit);
  const meta = calculateMeta(filteredUsers.length, page, limit);

  return (
    <TableProvider>
      <div className="space-y-4 overflow-x-hidden">
        {/* Search */}
        <div className="flex items-center justify-start lg:justify-end print:hidden">
          <SearchField
            placeholder="Search users..."
            initialValue={query.q || ""}
          />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map(({ key, label }) => (
                <TableHeaderItem
                  key={key}
                  label={label}
                  prop={key}
                  sortable={false}
                  currentSort=""
                  sortDirection="asc"
                />
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableBodyItem colSpan={3}>
                  <div className="py-8 text-center text-gray-500">
                    No suspended users found
                  </div>
                </TableBodyItem>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  {/* User Name */}
                  <TableBodyItem>{user.userName}</TableBodyItem>

                  {/* Suspension Period */}
                  <TableBodyItem>
                    {user.suspendedFrom} - {user.suspendedTo}
                  </TableBodyItem>

                  {/* Action */}
                  <TableBodyItem>
                    <button
                      className={cn(
                        "rounded-md bg-[#10B981] px-4 py-2 text-sm font-medium text-white",
                        "hover:bg-[#10B981] transition"
                      )}
                    >
                      End Suspension
                    </button>
                  </TableBodyItem>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          totalPages={meta.totalPages}
          currentPage={meta.page}
          pageSize={meta.limit}
        />
      </div>
    </TableProvider>
  );
}
