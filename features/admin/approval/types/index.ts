export type ProviderInfo = {
  id: string;
  serviceProviderName: string;
  phoneNumber: string;
  email: string;
  location: {
    address: string;
    city: string;
    zipcode: string;
  };
  aboutProvider: string;
  documents: ProviderDocument[];
};

export type ProviderDocument = {
  id: string;
  type: "driving_license" | "insurance" | "truck_picture";
  label: string;
  imageUrl: string;
  uploadedAt: string;
};
