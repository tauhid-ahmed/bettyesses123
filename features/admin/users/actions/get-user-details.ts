import { UserDetails } from "../types";

export async function getUserDetails(
  userId: string
): Promise<UserDetails | null> {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(
    //   `${process.env.API_BASE_URL}/movers/${userId}`,
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
      id: userId,
      serviceProviderName: "Jason",
      phoneNumber: "+8801542242547",
      email: "null@gmail.com",
      location: {
        address: "New York, USA",
        city: "New York",
        zipcode: "10001",
      },
      moveDetails: {
        totalService: 12,
        ongoingService: 2,
        completedService: 8,
        canceledService: 2,
      },
      aboutProvider:
        "I need a pro cleaner for my home. I have a pretty tomorrow. After that party, I need someone who can fix my home.",
      overallRating: 4.5,
      isTopRatedProvider: true,
      documents: [
        {
          id: "doc_1",
          type: "national_id",
          label: "National ID Card",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
        {
          id: "doc_2",
          type: "driving_license",
          label: "Driving License",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
        {
          id: "doc_3",
          type: "tax_document",
          label: "Tax document",
          imageUrl: "https://i.imgur.com/8qQZ6ZG.png",
          uploadedAt: "2024-01-15",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching mover details:", error);
    return null;
  }
}
