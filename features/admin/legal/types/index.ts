export type LegalPageType = "TERMS_AND_CONDITIONS" | "PRIVACY_POLICY";

export type CreateLegalPagePayload = {
  type: LegalPageType;
  title: string;
  policyNumber: number;
  features: string[];
};

export type UpdateLegalPagePayload = {
  title: string;
  policyNumber: number;
  features: string[];
  isActive?: boolean;
};

export interface LegalPage {
  id: string;
  type: LegalPageType;
  title: string;
  policyNumber: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LegalPageResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: LegalPage;
};

export type LegalPagesListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: LegalPage[];
};
