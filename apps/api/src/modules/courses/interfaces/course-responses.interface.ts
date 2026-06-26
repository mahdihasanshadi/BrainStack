export interface CourseSummaryResponse {
  id: string;
  slug: string;
  title: string;
  ageMin: number;
  ageMax: number;
  shortDescription: string;
  longDescription: string | null;
  durationMonths: number;
  displayOrder: number;
  priceBdt: number;
  originalPriceBdt: number;
  isPurchasable: boolean;
}

export interface CourseLevelResponse {
  id: string;
  levelNumber: number;
  title: string;
  toolName: string;
  description: string;
  finalOutcome: string;
  durationMonths: number;
  learningOutcomes: string[];
}

export interface CourseDetailResponse extends CourseSummaryResponse {
  levels: CourseLevelResponse[];
}
