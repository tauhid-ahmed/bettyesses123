import { RefundDetails } from "../types";

export async function getRefundDetails(
  refundId: string
): Promise<RefundDetails | null> {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(
    //   `${process.env.API_BASE_URL}/refunds/${refundId}`,
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
      id: refundId,
      jobPosterName: "Seema Badasya",
      serviceProviderName: "Hasan",
      orderInfo: {
        servicePrice: 52,
        serviceName: "Chopping Vegetables",
        address: "New york , USA",
        dateAndTime: "9 August, 9 Am",
        orderCanceledBy: "User",
      },
      photos: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
        "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400",
      ],
    };
  } catch (error) {
    console.error("Error fetching refund details:", error);
    return null;
  }
}
