export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  location: string | null;
  phoneNumber: string | null;
  profilePicture: string | null;
};

export type ProfileFormData = {
  fullName: string;
  email: string;
  location: string;
  phoneNumber: string;
};

export type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
