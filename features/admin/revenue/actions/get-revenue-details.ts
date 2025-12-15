import { RevenueDetails } from "../types";

export async function getRevenueDetails(
  revenueId: string
): Promise<RevenueDetails | null> {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(
    //   `${process.env.API_BASE_URL}/revenue/${revenueId}`,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //     cache: "no-store",
    //   }
    // );
    // if (!response.ok) return null;
    // return response.json();

    // Dummy data
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      id: revenueId,
      jobPosterName: "Seema Badasya",
      serviceProviderName: "Hasan",
      orderInfo: {
        servicePrice: 52,
        serviceName: "Chopping Vegetables",
        serviceProviderRevenue: 45.8,
        adminRevenue: 5.2,
        address: "New york, USA",
        dateAndTime: "9 August, 9 Am",
      },
      photos: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
        "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400",
      ],
    };
  } catch (error) {
    console.error("Error fetching revenue details:", error);
    return null;
  }
}
