"use client";

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VacancyFilters } from '@/features/vacancy-filters';
import { LinkVacancyDialog } from '@/features/vacancy-link';
import { VacancyTable } from '@/widgets/vacancy-table';
import { StatsCards } from '@/widgets/stats-cards';
import { mockVacancies } from '@/entities/vacancy';
import { Vacancy, VacancyFilters as Filters } from '@/shared/types/vacancy';
import { SidebarTrigger } from '@/components/ui/sidebar';

const initialFilters: Filters = {
  search: '',
  atsStatus: 'all',
  postingStatus: 'all',
  clientId: 'all',
  recruiterId: 'all',
  countryId: 'all',
  cityId: 'all',
};

export const Dashboard = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((vacancy) => {
      const searchMatch =
        !filters.search ||
        vacancy.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        vacancy.client.name.toLowerCase().includes(filters.search.toLowerCase());

      const atsStatusMatch = filters.atsStatus === 'all' || vacancy.atsStatus.id === filters.atsStatus;
      const postingStatusMatch = filters.postingStatus === 'all' || vacancy.postingStatus.id === filters.postingStatus;
      const clientMatch = filters.clientId === 'all' || vacancy.client.id === filters.clientId;
      const recruiterMatch = filters.recruiterId === 'all' || vacancy.recruiter.id === filters.recruiterId;
      const countryMatch = filters.countryId === 'all' || vacancy.country.id === filters.countryId;
      const cityMatch = filters.cityId === 'all' || vacancy.city.id === filters.cityId;

      return searchMatch && atsStatusMatch && postingStatusMatch && clientMatch && recruiterMatch && countryMatch && cityMatch;
    });
  }, [vacancies, filters]);

  const handleLinkClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setLinkDialogOpen(true);
  };

  const handleLink = (vacancyId: string, linkedIds: string[]) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === vacancyId ? { ...v, linkedIds: linkedIds } : v))
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Vacancy Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage vacancies and their relationships
              </p>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Vacancy
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <StatsCards vacancies={vacancies} />
        <VacancyFilters filters={filters} onFiltersChange={setFilters} />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Found: <span className="font-medium text-foreground">{filteredVacancies.length}</span> vacancies
          </p>
        </div>
        <VacancyTable
          vacancies={filteredVacancies}
          allVacancies={vacancies}
          onLinkClick={handleLinkClick}
        />
      </main>

      <LinkVacancyDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        vacancy={selectedVacancy}
        allVacancies={vacancies}
        onLink={handleLink}
      />
    </div>
  );
};
