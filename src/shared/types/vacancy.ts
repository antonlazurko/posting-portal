export type VacancyStatus = 'open' | 'closed' | 'paused' | 'draft';

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: VacancyStatus;
  department: string;
  createdAt: string;
  linkedVacancies: string[];
  applicantsCount: number;
}

export interface VacancyFilters {
  search: string;
  status: VacancyStatus | 'all';
  location: string;
  salaryMin: number;
  salaryMax: number;
  department: string;
}
