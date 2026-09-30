export type VerificationStatus = 'VERIFIED' | 'RECENTLY_VERIFIED' | 'NEEDS_REVIEW' | 'OUTDATED';

export type ServiceStatus = 'DRAFT' | 'UNDER_REVIEW' | 'VERIFIED' | 'PUBLISHED' | 'ARCHIVED';

export type FeeType = 'OFFICIAL_GOVERNMENT' | 'OFFICE_ESTIMATED' | 'ADDITIONAL';

export type TargetAudience = 'ALL' | 'RESIDENTS' | 'ESTABLISHMENTS' | 'FAMILIES' | 'DOMESTIC_WORKERS' | 'INVESTORS';

export interface ServiceCategory {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  icon: string;
  sort_order: number;
}

export interface GovernmentPlatform {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  logo_url: string;
  official_url: string;
  services_count?: number;
  verification_status: VerificationStatus;
}

export interface ServiceStep {
  step_number: number;
  title_ar: string;
  description_ar: string;
}

export interface ServiceRequirement {
  id: string;
  title_ar: string;
  is_mandatory: boolean;
  conditional_clause?: string;
}

export interface ServiceFee {
  id: string;
  fee_type: FeeType;
  title_ar: string;
  amount: number;
  currency: string;
  duration_unit?: string;
  notes_ar?: string;
  source_name: string;
  verified_at: string;
}

export interface ServiceSource {
  source_name: string;
  source_url: string;
  source_type: 'GOV_PORTAL' | 'OFFICIAL_PDF' | 'GAZETTE' | 'CIRCULAR';
  verified_at: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Service {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  category_id: string;
  category_name_ar: string;
  platform_id: string;
  platform_name_ar: string;
  platform_url: string;
  entity_name_ar: string;
  target_audience: TargetAudience;
  target_audience_label: string;
  processing_time: string;
  application_method: string;
  official_url: string;
  status: ServiceStatus;
  verification_status: VerificationStatus;
  last_verified_at: string;
  featured: boolean;
  view_count: number;
  steps: ServiceStep[];
  requirements: ServiceRequirement[];
  fees: ServiceFee[];
  sources: ServiceSource[];
  related_service_slugs?: string[];
  faqs?: { question_ar: string; answer_ar: string }[];
}

export interface ServiceUpdate {
  id: string;
  title_ar: string;
  summary_ar: string;
  source_name: string;
  source_url: string;
  published_at: string;
  related_services: string[];
}

export interface Office {
  id: string;
  name_ar: string;
  city_ar: string;
  district_ar: string;
  services_offered: string[];
  phone: string;
  whatsapp: string;
  is_verified: boolean;
  rating_avg: number;
  reviews_count: number;
}

export interface ServiceOrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceCategory?: string;
  notes?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  filesCount: number;
  filesList?: string;
  createdAt: string;
  updatedAt: string;
}

