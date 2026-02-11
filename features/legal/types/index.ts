export type PublicLegalPageType = "PRIVACY_POLICY" | "TERMS_AND_CONDITIONS";

export interface PublicLegalPage {
  id: string;
  type: PublicLegalPageType;
  title: string;
  policyNumber: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicLegalPagesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PublicLegalPage[];
}
