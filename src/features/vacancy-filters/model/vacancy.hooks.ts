import { useQuery } from '@tanstack/react-query';
import { fetchDictionaries } from '@/shared/api/vacancies';

export const useGetVacancyFilters = () => {
  return useQuery({
    queryKey: ['vacancy-filters'],
    queryFn: fetchDictionaries,
  });
};
