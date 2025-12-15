import { ProviderInfo } from "../types";

export async function getProviderInfo(
  providerId: string
): Promise<ProviderInfo | null> {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(
    //   `${process.env.API_BASE_URL}/providers/${providerId}`,
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
      id: providerId,
      serviceProviderName: "Hasan",
      phoneNumber: "+8801645457",
      email: "null@gmail.com",
      location: {
        address: "New York, USA",
        city: "USA",
        zipcode: "10443",
      },
      aboutProvider:
        "I need a dish washer for my home. I have a party tomorrow. After the party, I need someone who can do the dishes.",
      documents: [
        {
          id: "doc_1",
          type: "driving_license",
          label: "Driving license",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
        {
          id: "doc_2",
          type: "insurance",
          label: "Insurance",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
        {
          id: "doc_3",
          type: "truck_picture",
          label: "Truck Picture",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching provider info:", error);
    return null;
  }
}
