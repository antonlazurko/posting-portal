import { Briefcase, Globe, CheckCircle, FileEdit } from 'lucide-react';
import { Vacancy } from '@/shared/types/vacancy';
import { useI18n } from '@/lib/i18n-provider';

interface StatsCardsProps {
  vacancies: Vacancy[];
}

export const StatsCards = ({ vacancies }: StatsCardsProps) => {
  const { t } = useI18n();
  const totalVacancies = vacancies.length;
  const postedVacancies = vacancies.filter((v) => v.isPosted).length;
  const atsOpenVacancies = vacancies.filter((v) => v.atsStatus.name === 'Open').length;
  const draftVacancies = vacancies.filter((v) => v.postingStatus.name === 'Draft').length;

  const stats = [
    {
      title: t('dashboard.stats.totalVacancies'),
      value: totalVacancies,
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: t('dashboard.stats.posted'),
      value: postedVacancies,
      icon: Globe,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: t('dashboard.stats.activeCountries'),
      value: atsOpenVacancies,
      icon: CheckCircle,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: t('dashboard.stats.drafts'),
      value: draftVacancies,
      icon: FileEdit,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
