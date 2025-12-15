import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";
import { getUserProfile } from "../actions/get-user-profile";

export default async function SettingsPage() {
  const userProfile = await getUserProfile();

  return (
    <div className="space-y-4">
      {/* Profile Section */}
      <div className="bg-white rounded p-4">
        <ProfileForm initialData={userProfile} />
      </div>

      {/* Password Section */}
      <div className="bg-white rounded p-4">
        <PasswordForm />
      </div>
    </div>
  );
}
