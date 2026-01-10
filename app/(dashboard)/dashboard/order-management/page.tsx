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
import { getOrders } from "@/features/admin/orders/actions/get-orders";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type OrderStatus = "COMPLETED" | "CANCELLED" | "PENDING";

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
  searchTerm?: string;
  status?: string;
};

type TableHeaderConfig = {
  key: keyof Order;
  label: string;
  sortable?: boolean;
};

// Map API status to component status
function mapApiStatusToOrderStatus(apiStatus: string): OrderStatus {
  const statusUpper = apiStatus.toUpperCase();
  if (statusUpper === "COMPLETED" || statusUpper === "CANCELLED" || statusUpper === "PENDING") {
    return statusUpper as OrderStatus;
  }
  // Default to PENDING if status doesn't match
  return "PENDING";
}

// Helper to map API order to Order type
function mapApiOrderToOrder(apiOrder: {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  total: number;
  orderItems: Array<{ id: string }>;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}): Order {
  // Use user object if available, otherwise use firstName/lastName from order
  const userName = apiOrder.user
    ? `${apiOrder.user.firstName} ${apiOrder.user.lastName}`.trim()
    : `${apiOrder.firstName} ${apiOrder.lastName}`.trim();
  
  const email = apiOrder.user?.email || apiOrder.email;

  return {
    id: apiOrder.id,
    userName: userName || "Unknown User",
    email: email || "N/A",
    orderedBooks: apiOrder.orderItems?.length || 0,
    price: apiOrder.total || 0,
    orderId: apiOrder.orderNumber,
    status: mapApiStatusToOrderStatus(apiOrder.status),
  };
}

const tableHeader: TableHeaderConfig[] = [
  { key: "userName", label: "User Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "orderedBooks", label: "Ordered Books", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "orderId", label: "Order ID" },
  { key: "status", label: "Status", sortable: true },
];


function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    COMPLETED: "bg-green-100 text-green-600 border border-green-300",
    CANCELLED: "bg-red-100 text-red-600 border border-red-300",
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
  const limit = parseInt(query.limit || "20", 20);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  // Get search term from URL (support both 'q' and 'searchTerm' for compatibility)
  const searchTerm = query.searchTerm || query.q;
  
  // Get status filter
  const status = query.status as "COMPLETED" | "CANCELLED" | "PENDING" | undefined;

  // Fetch orders from API
  const ordersResponse = await getOrders({
    page,
    limit,
    status,
    searchTerm,
  });

  // Map API orders to Order type
  const orders: Order[] = ordersResponse?.data
    ? ordersResponse.data.map(mapApiOrderToOrder)
    : [];

  // Use API meta or fallback
  const meta: Meta = ordersResponse?.meta
    ? {
        page: ordersResponse.meta.page,
        limit: ordersResponse.meta.limit,
        total: ordersResponse.meta.total,
        totalPages: ordersResponse.meta.totalPage,
      }
    : {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      };

      // console.log(getOrders)

  return (
    <TableProvider>
      <div className="space-y-4">
        <PageHeading
          title="Order Management"
          query={searchTerm || ""}
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
            {orders.length === 0 ? (
              <TableRow>
                <TableBodyItem colSpan={tableHeader.length + 1}>
                  <div className="text-center py-8 text-gray-500">
                    No orders found
                  </div>
                </TableBodyItem>
              </TableRow>
            ) : (
              orders.map((order) => (
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
          totalItems={meta.total}
        />
      </div>
    </TableProvider>
  );
}
