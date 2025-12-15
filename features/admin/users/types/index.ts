export type UserLocation = {
  address: string;
  city: string;
  zipcode: string;
};

export type UserDetails = {
  id: string;
  serviceProviderName: string;
  phoneNumber: string;
  email: string;
  location: UserLocation;
  moveDetails: {
    totalService: number;
    ongoingService: number;
    completedService: number;
    canceledService: number;
  };
  aboutProvider: string;
  overallRating: number;
  isTopRatedProvider: boolean;
  documents: UserDocument[];
};

export type UserDocument = {
  id: string;
  type: "national_id" | "driving_license" | "tax_document";
  label: string;
  imageUrl: string;
  uploadedAt: string;
};
