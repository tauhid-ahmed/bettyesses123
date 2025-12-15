export type MoverLocation = {
  address: string;
  city: string;
  zipcode: string;
};

export type MoverDetails = {
  id: string;
  serviceProviderName: string;
  phoneNumber: string;
  email: string;
  location: MoverLocation;
  moveDetails: {
    totalService: number;
    ongoingService: number;
    completedService: number;
    canceledService: number;
  };
  aboutProvider: string;
  overallRating: number;
  isTopRatedProvider: boolean;
  documents: MoverDocument[];
};

export type MoverDocument = {
  id: string;
  type: "national_id" | "driving_license" | "tax_document";
  label: string;
  imageUrl: string;
  uploadedAt: string;
};
