export type ServiceDetails = {
  id: string;
  jobPosterName: string;
  serviceProviderName: string;
  orderInfo: OrderInfo;
  photos: string[];
  complaint: string | null;
};

export type OrderInfo = {
  servicePrice: number;
  serviceName: string;
  serviceProviderRevenue: number;
  adminRevenue: number;
  address: string;
  dateAndTime: string;
};
