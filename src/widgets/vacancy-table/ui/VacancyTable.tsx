import { Link2, Users, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Vacancy } from '@/shared/types/vacancy';

interface VacancyTableProps {
  vacancies: Vacancy[];
  allVacancies: Vacancy[];
  onLinkClick: (vacancy: Vacancy) => void;
}

const statusConfig = {
  open: { label: 'Open', className: 'bg-success/10 text-success border-success/20' },
  closed: { label: 'Closed', className: 'bg-muted text-muted-foreground border-muted' },
  paused: { label: 'Paused', className: 'bg-warning/10 text-warning border-warning/20' },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-muted' },
};

const formatSalary = (min: number, max: number) => {
  const format = (n: number) => {
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return n.toString();
  };
  return `${format(min)} - ${format(max)} ₽`;
};

export const VacancyTable = ({ vacancies, allVacancies, onLinkClick }: VacancyTableProps) => {
  const getLinkedVacancyNames = (linkedIds: string[]) => {
    return linkedIds
      .map((id) => allVacancies.find((v) => v.id === id)?.title)
      .filter(Boolean);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Vacancy</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">Salary</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-center">Candidates</TableHead>
            <TableHead className="font-semibold text-center">Links</TableHead>
            <TableHead className="font-semibold w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacancies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No vacancies found
              </TableCell>
            </TableRow>
          ) : (
            vacancies.map((vacancy) => {
              const linkedNames = getLinkedVacancyNames(vacancy.linkedVacancies);
              const status = statusConfig[vacancy.status];

              return (
                <TableRow key={vacancy.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{vacancy.title}</p>
                      <p className="text-sm text-muted-foreground">{vacancy.company} · {vacancy.department}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vacancy.location}</TableCell>
                  <TableCell className="font-medium">
                    {formatSalary(vacancy.salary.min, vacancy.salary.max)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{vacancy.applicantsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {linkedNames.length > 0 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onLinkClick(vacancy)}
                            className="gap-1 text-primary hover:text-primary"
                          >
                            <Link2 className="h-4 w-4" />
                            {linkedNames.length}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px]">
                          <p className="font-medium mb-1">Linked vacancies:</p>
                          <ul className="text-xs space-y-0.5">
                            {linkedNames.map((name, i) => (
                              <li key={i}>• {name}</li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLinkClick(vacancy)}
                        className="gap-1 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Link2 className="h-4 w-4" />
                        Link
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onLinkClick(vacancy)}>
                          <Link2 className="h-4 w-4 mr-2" />
                          Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
