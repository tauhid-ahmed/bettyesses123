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
import Link from "next/link";

type OrderStatus = "Processing" | "Shipped" | "In Route" | "Delivered";

type Order = {
  id: string;
  userName: string;
  email: string;
  orderedBooks: number;
  price: number;
  orderId: string;
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

const DUMMY_ORDERS: Order[] = [
  {
    id: "1",
    userName: "Seema Badaya",
    email: "seema@gmail.com",
    orderedBooks: 2,
    price: 50,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Processing",
  },
  {
    id: "2",
    userName: "Al Muntakim",
    email: "almuntakim@gmail.com",
    orderedBooks: 1,
    price: 35,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Shipped",
  },
  {
    id: "3",
    userName: "Nusrat Jahan",
    email: "nusrat@gmail.com",
    orderedBooks: 7,
    price: 120,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
  {
    id: "4",
    userName: "Rafsan Rahman",
    email: "rafsan@gmail.com",
    orderedBooks: 4,
    price: 80,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Delivered",
  },
  {
    id: "5",
    userName: "Seema Badaya",
    email: "seema@gmail.com",
    orderedBooks: 1,
    price: 25,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Processing",
  },
  {
    id: "6",
    userName: "Tahmid Hasan",
    email: "tahmid@gmail.com",
    orderedBooks: 3,
    price: 60,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Shipped",
  },
  {
    id: "7",
    userName: "Ayesha Akter",
    email: "ayesha@gmail.com",
    orderedBooks: 6,
    price: 110,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
  {
    id: "8",
    userName: "Imran Hossain",
    email: "imran@gmail.com",
    orderedBooks: 2,
    price: 40,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Delivered",
  },
  {
    id: "9",
    userName: "Farhan Ahmed",
    email: "farhan@gmail.com",
    orderedBooks: 5,
    price: 95,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Processing",
  },
  {
    id: "10",
    userName: "Sadia Islam",
    email: "sadia@gmail.com",
    orderedBooks: 8,
    price: 150,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Shipped",
  },
  {
    id: "11",
    userName: "Mehedi Hasan",
    email: "mehedi@gmail.com",
    orderedBooks: 3,
    price: 55,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "Delivered",
  },
  {
    id: "12",
    userName: "Nabila Khan",
    email: "nabila@gmail.com",
    orderedBooks: 4,
    price: 75,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
  {
    id: "13",
    userName: "Nabila Khan",
    email: "nabila@gmail.com",
    orderedBooks: 4,
    price: 75,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
  {
    id: "14",
    userName: "Nabila Khan",
    email: "nabila@gmail.com",
    orderedBooks: 4,
    price: 75,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
  {
    id: "15",
    userName: "Nabila Khan",
    email: "nabila@gmail.com",
    orderedBooks: 4,
    price: 75,
    orderId: "pi_1N8xXh2eZvKYlo2CabcDEF12",
    status: "In Route",
  },
];

const tableHeader: TableHeaderConfig[] = [
  { key: "userName", label: "User Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "orderedBooks", label: "Ordered Books", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "orderId", label: "Order ID" },
  { key: "status", label: "Status", sortable: true },
];

function filterOrders(orders: Order[], query: SearchParams) {
  if (!query.q) return orders;

  const q = query.q.toLowerCase();
  return orders.filter(
    (order) =>
      order.userName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q) ||
      order.orderId.toLowerCase().includes(q)
  );
}

function sortOrders(orders: Order[], sortField: string, sortDirection: string) {
  if (!sortField || !sortDirection) return orders;

  return [...orders].sort((a, b) => {
    let result = 0;

    if (typeof a[sortField as keyof Order] === "number") {
      result =
        (a[sortField as keyof Order] as number) -
        (b[sortField as keyof Order] as number);
    } else {
      result = String(a[sortField as keyof Order]).localeCompare(
        String(b[sortField as keyof Order])
      );
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

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Processing: "bg-yellow-100 text-[#FFBB00] border-[#FFBB00] border",
    Shipped: "bg-pink-100 text-[#FF008C] border-[#FF008C] border",
    "In Route": "bg-purple-100 text-[#9935E5] border-[#9935E5] border",
    Delivered: "bg-green-100 text-[#00FF44] border-[#00FF44] border",
  };

  return (
    <span
      className={cn(
        "inline-flex px-3 py-1 rounded-full text-sm font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

export default async function OrderManagementTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "12", 12);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  const filtered = filterOrders(DUMMY_ORDERS, query);
  const sorted = sortOrders(filtered, sortField, sortDirection);
  const paginated = paginate(sorted, page, limit);
  const meta = calculateMeta(filtered.length, page, limit);

  return (
    <TableProvider>
      <div className="space-y-4">
        <PageHeading
          title="Order Management"
          query={query.q || ""}
          placeholder="Search orders..."
        />

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
                  <TableBodyItem>{order.orderedBooks}</TableBodyItem>
                  <TableBodyItem>€ {order.price}</TableBodyItem>
                  <TableBodyItem>{order.orderId}</TableBodyItem>
                  <TableBodyItem>
                    <StatusBadge status={order.status} />
                  </TableBodyItem>
                  <TableBodyItem>
                    <Link
                      href={`/dashboard/order-management/${order.id}`}
                      className="text-blue-600 hover:underline text-sm"
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
