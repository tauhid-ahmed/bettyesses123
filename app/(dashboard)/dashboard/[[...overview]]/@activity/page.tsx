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
import { getRecentOrders } from "@/features/admin/analytics/actions/get-recent-orders";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type OrderStatus = "COMPLETED" | "CANCELLED" | "PENDING";

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
  searchTerm?: string;
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
  userName: string;
  email: string;
  bookCount: number;
  price: number;
  shipping: number;
  status: string;
}): Order {
  return {
    id: apiOrder.id,
    userName: apiOrder.userName,
    email: apiOrder.email,
    bookCount: apiOrder.bookCount,
    bookPrice: apiOrder.price,
    shipping: apiOrder.shipping,
    status: mapApiStatusToOrderStatus(apiOrder.status),
  };
}

const tableHeader: TableHeaderConfig[] = [
  { key: "userName", label: "User Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "bookCount", label: "Book Count", sortable: true },
  { key: "bookPrice", label: "Book Price", sortable: true },
  { key: "shipping", label: "Shipping" },
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
        "px-3 py-1 rounded-full text-sm font-medium inline-flex",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

const ActivityPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const query = await searchParams;

  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "10", 10);
  const [sortField = "", sortDirection = ""] = (query.sort || "").split(":");

  // Get search term from URL (support both 'q' and 'searchTerm' for compatibility)
  // Convert to lowercase as required
  const searchTerm = query.searchTerm || query.q;
  const searchTermLower = searchTerm ? searchTerm.toLowerCase() : undefined;

  // Fetch recent orders from API
  const ordersResponse = await getRecentOrders({
    page,
    limit,
    searchTerm: searchTermLower,
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
        limit: 10,
        total: 0,
        totalPages: 0,
      };

  return (
    <TableProvider>
      <div className="space-y-4 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium py-3">
            Recent Orders
          </h2>
          <SearchField
            placeholder="Search orders..."
            initialValue={searchTerm || ""}
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
                  <TableBodyItem>{order.bookCount}</TableBodyItem>
                  <TableBodyItem>€ {order.bookPrice}</TableBodyItem>
                  <TableBodyItem>€ {order.shipping}</TableBodyItem>
                  <TableBodyItem>
                    <StatusBadge status={order.status} />
                  </TableBodyItem>
                  <TableBodyItem>
                    <Link
                      href={`/dashboard/order-management/${order.id}`}
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
          totalItems={meta.total}
        />
      </div>
    </TableProvider>
  );
};
export default ActivityPage;
