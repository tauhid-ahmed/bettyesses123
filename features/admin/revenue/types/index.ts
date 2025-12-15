export type RevenueDetails = {
  id: string;
  jobPosterName: string;
  serviceProviderName: string;
  orderInfo: OrderInfo;
  photos: string[];
};

export type OrderInfo = {
  servicePrice: number;
  serviceName: string;
  serviceProviderRevenue: number;
  adminRevenue: number;
  address: string;
  dateAndTime: string;
};
