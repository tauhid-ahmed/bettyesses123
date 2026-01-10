export type BookTemplate = {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  category: string;
  coverImage: string;
  thumbnails: string[];
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BookTemplateResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  data: BookTemplate[];
};
