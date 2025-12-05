import { Vacancy, VacancyFilters } from '@/shared/types/vacancy';

export const fetchVacancies = async (filters: VacancyFilters): Promise<Vacancy[]> => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.atsStatus !== 'all') params.append('atsStatusId', filters.atsStatus);
  if (filters.postingStatus !== 'all') params.append('postingStatusId', filters.postingStatus);
  if (filters.clientId !== 'all') params.append('clientId', filters.clientId);
  if (filters.recruiterId !== 'all') params.append('recruiterId', filters.recruiterId);
  if (filters.countryId !== 'all') params.append('countryId', filters.countryId);
  if (filters.cityId !== 'all') params.append('cityId', filters.cityId);

  const response = await fetch(`/api/vacancies?${params.toString()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch vacancies');
  return response.json();
};

export const createVacancy = async (data: Partial<Vacancy>): Promise<Vacancy> => {
  const response = await fetch('/api/vacancies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create vacancy');
  return response.json();
};

export const updateVacancy = async (id: string, data: Partial<Vacancy>): Promise<Vacancy> => {
  const response = await fetch(`/api/vacancies/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update vacancy');
  return response.json();
};

export const updateVacancyLinks = async (id: string, linkedIds: string[]): Promise<Vacancy> => {
  const response = await fetch(`/api/vacancies/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linkedIds }),
  });
  if (!response.ok) throw new Error('Failed to update vacancy links');
  return response.json();
};

export const fetchDictionaries = async () => {
  const response = await fetch('/api/dictionaries');
  if (!response.ok) throw new Error('Failed to fetch dictionaries');
  return response.json();
};
