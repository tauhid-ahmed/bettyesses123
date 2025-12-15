export type RefundDetails = {
  id: string;
  jobPosterName: string;
  serviceProviderName: string;
  orderInfo: OrderInfo;
  photos: string[];
};

export type OrderInfo = {
  servicePrice: number;
  serviceName: string;
  address: string;
  dateAndTime: string;
  orderCanceledBy: string;
};
