export type PromoCode = {
  id: string;
  code: string;
  startTime: string;
  endTime: string;
  minOrderAmount: number;
  discountPercentage: number;
  perPersonUseLimit: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PromoCodeResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: PromoCode[];
};

export type CreatePromoCodePayload = {
  code: string;
  startTime: string;
  endTime: string;
  minOrderAmount: number;
  discountPercentage: number;
  perPersonUseLimit: number;
  isActive: boolean;
};
