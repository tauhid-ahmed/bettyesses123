import { getMe } from "@/actions/getMe";
import UserProfileProvider from "./UserProfileProvider";
import { type UserProfile } from "@/types/user-profile";

export default async function UserProfileServerProvider({
  children,
}: React.PropsWithChildren) {
  const userProfile: UserProfile = await getMe();
  return (
    <UserProfileProvider userProfile={userProfile}>
      {children}
    </UserProfileProvider>
  );
}
