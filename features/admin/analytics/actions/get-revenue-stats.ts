"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { RevenueStats, TimeRange } from "../types";

export type GetRevenueStatsParams = {
  period?: "day" | "week" | "month" | "year";
};

export type ApiRevenueData = {
  period: string;
  revenue: number;
};

// Helper to format period to day name (for weekly) or month name
function formatPeriodToDay(period: string, index: number): string {
  // If period is like "2024-01", extract month
  if (period.match(/^\d{4}-\d{2}$/)) {
    const date = new Date(period + "-01");
    return date.toLocaleDateString("en-US", { month: "short" });
  }
  // If period is a date, extract day name
  if (period.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const date = new Date(period);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }
  // Fallback: use index
  return `Period ${index + 1}`;
}

// Helper to map API revenue data to chart format
function mapApiRevenueToChartData(
  apiData: ApiRevenueData[],
  period: TimeRange
): RevenueStats["data"] {
  return apiData.map((item, index) => {
    const day = formatPeriodToDay(item.period, index);
    // For now, put all revenue in serviceProvider, admin can be 0 or a percentage
    // You can adjust this based on your business logic
    const serviceProvider = item.revenue;
    const admin = 0; // Or calculate as percentage if needed

    return {
      day,
      serviceProvider,
      admin,
      date: item.period,
    };
  });
}

export async function getRevenueStats(
  params: GetRevenueStatsParams = {}
): Promise<RevenueStats> {
  const session = await auth();

  try {
    const { period = "month" } = params;

    const url = `${BACKEND_API_URL}/admin/dashboard/revenue?period=${period}`;

    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error fetching revenue stats - Status: ${res.status}, URL: ${url}`);
      // Return empty data on error
      return {
        timeRange: period as TimeRange,
        data: [],
        averageGrowth: 0,
        movers: 0,
        users: 0,
      };
    }

    const response = await res.json();

    if (response.success && response.data && Array.isArray(response.data)) {
      const chartData = mapApiRevenueToChartData(response.data, period as TimeRange);

      return {
        timeRange: period as TimeRange,
        data: chartData,
        averageGrowth: 0, // Calculate if API provides this
        movers: 0, // Calculate if API provides this
        users: 0, // Calculate if API provides this
      };
    }

    // Return empty data if response structure is unexpected
    return {
      timeRange: period as TimeRange,
      data: [],
      averageGrowth: 0,
      movers: 0,
      users: 0,
    };
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    // Return empty data on error
    return {
      timeRange: "monthly",
      data: [],
      averageGrowth: 0,
      movers: 0,
      users: 0,
    };
  }
}
