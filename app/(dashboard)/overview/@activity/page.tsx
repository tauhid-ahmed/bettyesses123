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

/* -------------------- Types -------------------- */
type OrderStatus = "Processing" | "Shipped" | "In Route" | "Delivered";

type Order = {
  id: string;
  userName: string;
  email: string;
  bookCount: number;
  bookPrice: number;
  shipping: number;
  status: OrderStatus;
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
  key: keyof Order;
  label: string;
  sortable?: boolean;
};

/* -------------------- Dummy Data (Image Based) -------------------- */
const DUMMY_ORDERS: Order[] = [
  {
    id: "1",
    userName: "Seema Badaya",
    email: "null@gmail.com",
    bookCount: 2,
    bookPrice: 50,
    shipping: 10,
    status: "Processing",
  },
  {
    id: "2",
    userName: "Al Muntakim",
    email: "null@gmail.com",
    bookCount: 1,
    bookPrice: 50,
    shipping: 10,
    status: "Processing",
  },
  {
    id: "3",
    userName: "Seema Badaya",
    email: "null@gmail.com",
    bookCount: 1,
    bookPrice: 50,
    shipping: 10,
    status: "Processing",
  },
  {
    id: "4",
    userName: "Al Muntakim",
    email: "null@gmail.com",
    bookCount: 2,
    bookPrice: 50,
    shipping: 10,
    status: "Processing",
  },
  {
    id: "5",
    userName: "Seema Badaya",
    email: "null@gmail.com",
    bookCount: 1,
    bookPrice: 50,
    shipping: 10,
    status: "Processing",
  },
];

/* -------------------- Table Header -------------------- */
const tableHeader: TableHeaderConfig[] = [
  { key: "userName", label: "User Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "bookCount", label: "Book Count", sortable: true },
  { key: "bookPrice", label: "Book Price", sortable: true },
  { key: "shipping", label: "Shipping" },
  { key: "status", label: "Status", sortable: true },
];

/* -------------------- Helpers -------------------- */
function filterOrders(orders: Order[], query: SearchParams) {
  if (!query.q) return orders;
  const q = query.q.toLowerCase();

  return orders.filter(
    (order) =>
      order.userName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q)
  );
}

function sortOrders(
  orders: Order[],
  sortField: string,
  sortDirection: string
) {
  if (!sortField || !sortDirection) return orders;

  return [...orders].sort((a, b) => {
    const aVal = a[sortField as keyof Order];
    const bVal = b[sortField as keyof Order];

    let result = 0;
    if (typeof aVal === "number" && typeof bVal === "number") {
      result = aVal - bVal;
    } else {
      result = String(aVal).localeCompare(String(bVal));
    }

    return sortDirection === "asc" ? result : -result;
  });
}

function paginate(orders: Order[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return orders.slice(start, start + limit);
}

function calculateMeta(total: number, page: number, limit: number): Meta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

/* -------------------- Status Badge -------------------- */
function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Shipped: "bg-pink-100 text-pink-600 border border-pink-300",
    "In Route": "bg-purple-100 text-purple-600 border border-purple-300",
    Delivered: "bg-green-100 text-green-600 border border-green-300",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium inline-flex",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

/* -------------------- Component -------------------- */
export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "10", 10);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  const filtered = filterOrders(DUMMY_ORDERS, query);
  const sorted = sortOrders(filtered, sortField, sortDirection);
  const paginated = paginate(sorted, page, limit);
  const meta = calculateMeta(filtered.length, page, limit);

  return (
    <TableProvider>
      <div className="space-y-4 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium py-3">
            Recent Orders
          </h2>
          <SearchField
            placeholder="Search orders..."
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
                  label={label}
                  sortable={sortable}
                  currentSort={sortField}
                  sortDirection={sortDirection as SortDirection}
                />
              ))}
              <th className="p-4 text-white">Details</th>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableBodyItem colSpan={tableHeader.length + 1}>
                  <div className="text-center py-8 text-gray-500">
                    No orders found
                  </div>
                </TableBodyItem>
              </TableRow>
            ) : (
              paginated.map((order) => (
                <TableRow key={order.id}>
                  <TableBodyItem>{order.userName}</TableBodyItem>
                  <TableBodyItem>{order.email}</TableBodyItem>
                  <TableBodyItem>{order.bookCount}</TableBodyItem>
                  <TableBodyItem>€ {order.bookPrice}</TableBodyItem>
                  <TableBodyItem>€ {order.shipping}</TableBodyItem>
                  <TableBodyItem>
                    <StatusBadge status={order.status} />
                  </TableBodyItem>
                  <TableBodyItem>
                    <Link
                      href={`/order-management/${order.id}`}
                      className="text-primary-500 hover:underline text-sm"
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
