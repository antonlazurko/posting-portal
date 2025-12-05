'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VacancyFilters } from '@/features/vacancy-filters';
import { LinkVacancyDialog } from '@/features/vacancy-link';
import { VacancyTable } from '@/widgets/vacancy-table';
import { StatsCards } from '@/widgets/stats-cards';
import { Vacancy, VacancyFilters as Filters } from '@/shared/types/vacancy';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { VacancyDialog } from '@/features/vacancy-form/ui/VacancyDialog';
import {
  fetchVacancies,
  updateVacancyLinks,
  fetchDictionaries,
  createVacancy,
  updateVacancy,
} from '@/shared/api/vacancies';

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
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [dictionaries, setDictionaries] = useState<any>({
    clients: [],
    recruiters: [],
    atsStatuses: [],
    postingStatuses: [],
    countries: [],
    cities: [],
  });

  // Vacancy Dialog State
  const [vacancyDialogOpen, setVacancyDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('create');

  const loadVacancies = useCallback(async () => {
    try {
      const data = await fetchVacancies(filters);
      setVacancies(data);
    } catch (error) {
      console.error('Failed to load vacancies', error);
    }
  }, [filters]);

  useEffect(() => {
    loadVacancies();
  }, [loadVacancies]);

  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const data = await fetchDictionaries();
        setDictionaries(data);
      } catch (error) {
        console.error('Failed to load dictionaries', error);
      }
    };
    loadDictionaries();
  }, []);

  const handleLinkClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setLinkDialogOpen(true);
  };

  const handleLink = async (vacancyId: string, linkedIds: string[]) => {
    try {
      await updateVacancyLinks(vacancyId, linkedIds);
      loadVacancies(); // Refresh list
    } catch (error) {
      console.error('Failed to link vacancies', error);
    }
  };

  const handleCreate = () => {
    setSelectedVacancy(null);
    setDialogMode('create');
    setVacancyDialogOpen(true);
  };

  const handleEdit = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setDialogMode('edit');
    setVacancyDialogOpen(true);
  };

  const handleView = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setDialogMode('view');
    setVacancyDialogOpen(true);
  };

  const handleSaveVacancy = async (data: Partial<Vacancy>) => {
    try {
      if (dialogMode === 'create') {
        await createVacancy(data);
      } else if (dialogMode === 'edit' && selectedVacancy) {
        await updateVacancy(selectedVacancy.id, data);
      }
      loadVacancies();
    } catch (error) {
      console.error('Failed to save vacancy', error);
      throw error;
    }
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
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Vacancy
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <StatsCards vacancies={vacancies} />
        <VacancyFilters
          filters={filters}
          onFiltersChange={setFilters}
          dictionaries={dictionaries}
        />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Found: <span className="font-medium text-foreground">{vacancies.length}</span> vacancies
          </p>
        </div>
        <VacancyTable
          vacancies={vacancies}
          allVacancies={vacancies}
          onLinkClick={handleLinkClick}
          onView={handleView}
          onEdit={handleEdit}
        />
      </main>

      <LinkVacancyDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        vacancy={selectedVacancy}
        allVacancies={vacancies}
        onLink={handleLink}
      />

      <VacancyDialog
        open={vacancyDialogOpen}
        onOpenChange={setVacancyDialogOpen}
        mode={dialogMode}
        vacancy={selectedVacancy}
        onSave={handleSaveVacancy}
        dictionaries={dictionaries}
      />
    </div>
  );
};
