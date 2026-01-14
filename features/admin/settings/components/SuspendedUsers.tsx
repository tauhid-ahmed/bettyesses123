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
import { getSuspendedUsers, SuspendedUserApiItem } from "../actions/get-suspended-user";
import EndSuspensionButton from "./EndSuspensionButton";

// -------------------- Types --------------------
type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
};

type SuspendedUser = SuspendedUserApiItem;

// -------------------- Table Header --------------------
const tableHeader = [
  { key: "userName", label: "User Name", sortable: false },
  { key: "suspendedUntil", label: "Suspended Until", sortable: false },
  { key: "suspensionNote", label: "Note", sortable: false },
];

// -------------------- Helpers --------------------
function filterUsers(users: SuspendedUser[], query: SearchParams) {
  if (!query.q) return users;
  const q = query.q!.toLowerCase();
  return users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return (
      fullName.includes(q) ||
      (u.email || "").toLowerCase().includes(q)
    );
  });
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

  const apiUsers = (await getSuspendedUsers()) || [];

  const normalized: SuspendedUser[] = apiUsers.map((u) => ({
    ...u,
  }));

  const filteredUsers = filterUsers(normalized, query);
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
                  <TableBodyItem>
                    {user.firstName} {user.lastName}
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </TableBodyItem>

                  {/* Suspended Until */}
                  <TableBodyItem>
                    {user.suspendedUntil
                      ? new Date(user.suspendedUntil).toLocaleString()
                      : "-"}
                  </TableBodyItem>

                  {/* Note / Action */}
                  <TableBodyItem>
                    <div className="mb-2 text-sm text-gray-700">
                      {user.suspensionNote || "-"}
                    </div>
                    <EndSuspensionButton userId={user.id} />
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
