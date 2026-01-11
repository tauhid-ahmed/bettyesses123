export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  profileView?: number;
  isEmailVerified: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ShippingAddress {
  id: string;
  userId: string;
  addressType: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptBuilding: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ShippingAddress[];
}
