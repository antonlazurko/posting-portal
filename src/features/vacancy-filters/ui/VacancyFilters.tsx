'use client';

import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { VacancyFilters as Filters } from '@/shared/types/vacancy';
import { useI18n } from '@/lib/i18n-provider';

interface VacancyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  dictionaries: {
    clients: any[];
    recruiters: any[];
    atsStatuses: any[];
    postingStatuses: any[];
    countries: any[];
    cities: any[];
  };
}

export const VacancyFilters = ({ filters, onFiltersChange, dictionaries }: VacancyFiltersProps) => {
  const { t } = useI18n();
  const handleReset = () => {
    onFiltersChange({
      search: '',
      atsStatus: 'all',
      postingStatus: 'all',
      clientId: 'all',
      recruiterId: 'all',
      countryId: 'all',
      cityId: 'all',
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.atsStatus !== 'all' ||
    filters.postingStatus !== 'all' ||
    filters.clientId !== 'all' ||
    filters.recruiterId !== 'all' ||
    filters.countryId !== 'all' ||
    filters.cityId !== 'all';

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">{t('filters.search')}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            {t('filters.clear')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('filters.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <Select
          value={filters.atsStatus}
          onValueChange={(value: string) => onFiltersChange({ ...filters, atsStatus: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.atsStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.atsStatus')}
            </SelectItem>
            {dictionaries.atsStatuses.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.postingStatus}
          onValueChange={(value: string) => onFiltersChange({ ...filters, postingStatus: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.postingStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.postingStatus')}
            </SelectItem>
            {dictionaries.postingStatuses.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.clientId}
          onValueChange={(value: string) => onFiltersChange({ ...filters, clientId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.client')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.client')}
            </SelectItem>
            {dictionaries.clients.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.recruiterId}
          onValueChange={(value: string) => onFiltersChange({ ...filters, recruiterId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.recruiter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.recruiter')}
            </SelectItem>
            {dictionaries.recruiters.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.firstName} {r.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.countryId}
          onValueChange={(value: string) => onFiltersChange({ ...filters, countryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.country')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.country')}
            </SelectItem>
            {dictionaries.countries.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.cityId}
          onValueChange={(value: string) => onFiltersChange({ ...filters, cityId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filters.city')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('filters.all')} {t('filters.city')}
            </SelectItem>
            {dictionaries.cities.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
