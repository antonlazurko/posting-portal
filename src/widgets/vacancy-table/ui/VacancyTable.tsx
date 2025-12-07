import { Link2, MoreHorizontal, Eye, Pencil, Trash2, Calendar } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Vacancy } from '@/shared/types/vacancy';
import { format } from 'date-fns';
import { useI18n } from '@/lib/i18n-provider';

interface VacancyTableProps {
  vacancies: Vacancy[];
  allVacancies: Vacancy[];
  onLinkClick: (vacancy: Vacancy) => void;
  onView: (vacancy: Vacancy) => void;
  onEdit: (vacancy: Vacancy) => void;
  isRecruiter?: boolean; // Add role check prop
}

export const VacancyTable = ({
  vacancies,
  allVacancies,
  onLinkClick,
  onView,
  onEdit,
  isRecruiter = false, // Default to false
}: VacancyTableProps) => {
  const { t } = useI18n();
  const getLinkedVacancyNames = (linkedIds: string[] | null) => {
    if (!linkedIds) return [];
    return linkedIds.map((id) => allVacancies.find((v) => v.id === id)?.title).filter(Boolean);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">{t('dashboard.table.vacancy')}</TableHead>
            <TableHead className="font-semibold">{t('dashboard.table.atsInfo')}</TableHead>
            <TableHead className="font-semibold">{t('dashboard.table.posting')}</TableHead>
            <TableHead className="font-semibold">{t('dashboard.table.recruiter')}</TableHead>
            <TableHead className="font-semibold">{t('dashboard.table.location')}</TableHead>
            <TableHead className="font-semibold text-center">
              {t('dashboard.table.links')}
            </TableHead>
            <TableHead className="font-semibold w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacancies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                {t('dashboard.table.noVacancies')}
              </TableCell>
            </TableRow>
          ) : (
            vacancies.map((vacancy) => {
              const linkedNames = getLinkedVacancyNames(vacancy.linkedIds);

              return (
                <TableRow key={vacancy.id} className="group">
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-foreground">{vacancy.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-primary">{vacancy.client.name}</span>
                        <span>•</span>
                        <span>{vacancy.specificProject}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="w-fit">
                        {vacancy.atsStatus.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {vacancy.atsId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="secondary"
                        className={
                          vacancy.isPosted
                            ? 'bg-success/10 text-success hover:bg-success/20'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {vacancy.postingStatus.name}
                      </Badge>
                      {vacancy.isPosted && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(vacancy.mainJbPosted)}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={vacancy.recruiter.avatarUrl} />
                        <AvatarFallback>
                          {vacancy.recruiter.firstName[0]}
                          {vacancy.recruiter.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {vacancy.recruiter.firstName} {vacancy.recruiter.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {vacancy.recruiter.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{vacancy.city.name}</span>
                      <span className="text-muted-foreground text-xs">{vacancy.country.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {isRecruiter && (
                      <>
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
                              <p className="font-medium mb-1">
                                {t('dashboard.table.linkedVacancies')}:
                              </p>
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
                            {t('common.link')}
                          </Button>
                        )}
                      </>
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
                        <DropdownMenuItem onClick={() => onView(vacancy)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {t('common.view')}
                        </DropdownMenuItem>
                        {isRecruiter && (
                          <>
                            <DropdownMenuItem onClick={() => onEdit(vacancy)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              {t('common.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onLinkClick(vacancy)}>
                              <Link2 className="h-4 w-4 mr-2" />
                              {t('common.link')}
                            </DropdownMenuItem>
                          </>
                        )}
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
