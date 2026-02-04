import React from "react";
import { ShoppingCart, DollarSign, Percent, Users, TrendingUp } from "lucide-react";
import { getDashboardStats } from "../actions/get-dashboard-stats";

// Types
type StatCardData = {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
};

// Server Component
export default async function OverviewStats() {
  const stats = await getDashboardStats();

  // Map API data to stat cards
  const statsData: StatCardData[] = [
    {
      id: "total-users",
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <Users className="w-5 h-5" />,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "total-orders",
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: <ShoppingCart className="w-5 h-5" />,
      iconBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: "total-revenue",
      label: "Total Revenue",
      value: stats?.totalRevenue ?? 0,
      icon: <DollarSign className="w-5 h-5" />,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    // {
    //   id: "new-users-this-month",
    //   label: "New Users This Month",
    //   value: stats?.newUsersThisMonth ?? 0,
    //   icon: <TrendingUp className="w-5 h-5" />,
    //   iconBgColor: "bg-slate-50",
    //   iconColor: "text-slate-600",
    // },
  ];

  // Add average order value if it exists
  if (stats?.averageOrderValue !== undefined) {
    statsData.push({
      id: "average-order-value",
      label: "Average Order Value",
      value: stats.averageOrderValue,
      icon: <Percent className="w-5 h-5" />,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    });
  }

  return (
    <section className="w-full @container">
      {/* Header */}
      <div className="mb-4 @sm:mb-6">
        <h1 className="text-xl @sm:text-2xl @lg:text-3xl font-medium py-3 @sm:py-4">
          Overview
        </h1>
      </div>

      {/* Stats Grid - Container Query breakpoints */}
      <div className="grid grid-cols-1 @sm:grid-cols-2 @4xl:grid-cols-4 gap-3 @sm:gap-4 @lg:gap-5">
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}

// Client Component for individual stat card
type StatCardProps = {
  stat: StatCardData;
};

function StatCard({ stat }: StatCardProps) {
  return (
    <article
      className="bg-white rounded-lg @sm:rounded-xl px-4 py-5 @sm:px-5 @sm:py-6 @lg:px-6 @lg:py-12 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
      aria-label={`${stat.label}: ${stat.value}`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Value and Label */}
        <div className="flex-1 min-w-0">
          <p className="text-xl @sm:text-2xl @lg:text-3xl font-bold text-gray-900 mb-1 @sm:mb-2 truncate">
            {typeof stat.value === "number"
              ? stat.value.toLocaleString()
              : stat.value}
          </p>
          <p className="text-xs @sm:text-sm font-medium text-gray-600 line-clamp-2">
            {stat.label}
          </p>
        </div>

        {/* Icon */}
        <div
          className={`${stat.iconBgColor} ${stat.iconColor} p-2 @sm:p-2.5 @lg:p-3 rounded-lg shrink-0`}
          aria-hidden="true"
        >
          {stat.icon}
        </div>
      </div>
    </article>
  );
}
