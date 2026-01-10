export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  location: string | null;
  phoneNumber: string | null;
  image: string | null;
  createdAt: string;
};

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  phoneNumber: string;
  image?: string | null;
};

export type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
