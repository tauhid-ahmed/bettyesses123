import { UserProfile } from "../types";

export async function getUserProfile(): Promise<UserProfile> {
  // TODO: Replace with actual API call
  // const token = await getAccessToken();
  // const response = await fetch(`${process.env.API_BASE_URL}/users/profile`, {
  //   headers: { Authorization: `Bearer ${token}` },
  //   cache: 'no-store',
  // });
  // return response.json();

  // Dummy data for now
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id: "user_123",
    fullName: "Sorento Baudeya",
    email: "null@gmail.com",
    location: "New York, USA",
    phoneNumber: "+1234567890",
    profilePicture: "https://i.pravatar.cc/150?img=12",
  };
}
