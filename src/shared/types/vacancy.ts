export interface IEntityBasic {
  id: string;
  name: string;
}

export interface IEntityRef extends IEntityBasic {
  code: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface Vacancy {
  id: string;
  atsId: string;
  title: string;
  mainJbUrl: string | null;
  isRepeating: boolean;
  comment: string | null;
  specificProject: string;
  mainJbPosted: string; // ISO 8601
  isPosted: boolean;
  dateCreated: string; // ISO 8601
  isMain: boolean;
  linkedIds: string[] | null;
  client: IEntityBasic;
  recruiter: IUser & { isActive: boolean };
  atsStatus: IEntityBasic;
  postingStatus: IEntityBasic;
  country: IEntityBasic;
  city: IEntityBasic;
}

export interface VacancyFilters {
  search: string;
  atsStatus: string | 'all';
  postingStatus: string | 'all';
  clientId: string | 'all';
  recruiterId: string | 'all';
  countryId: string | 'all';
  cityId: string | 'all';
}
