"use client";

import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { VacancyFilters as Filters } from '@/shared/types/vacancy';
import { locations, departments } from '@/entities/vacancy';

interface VacancyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const VacancyFilters = ({ filters, onFiltersChange }: VacancyFiltersProps) => {
  const handleReset = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      location: '',
      salaryMin: 0,
      salaryMax: 1000000,
      department: '',
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status !== 'all' ||
    filters.location ||
    filters.department;

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or company..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <Select
          value={filters.status}
          onValueChange={(value: string) => onFiltersChange({ ...filters, status: value as Filters['status'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.location || 'all'}
          onValueChange={(value: string) => onFiltersChange({ ...filters, location: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc === 'All' ? 'all' : loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.department || 'all'}
          onValueChange={(value: string) => onFiltersChange({ ...filters, department: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dep) => (
              <SelectItem key={dep} value={dep === 'All' ? 'all' : dep}>
                {dep}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
