import { ServiceDetails } from "../types";

export async function getServiceDetails(
  serviceId: string
): Promise<ServiceDetails | null> {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(
    //   `${process.env.API_BASE_URL}/services/${serviceId}`,
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
      id: serviceId,
      jobPosterName: "Seema Badaya",
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
      complaint:
        "I need a dish washer for my home. I have a party tomorrow. After the party, I need someone who can do the dishes.",
    };
  } catch (error) {
    console.error("Error fetching service details:", error);
    return null;
  }
}
