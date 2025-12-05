import { Briefcase, Users, TrendingUp, Clock } from 'lucide-react';
import { Vacancy } from '@/shared/types/vacancy';

interface StatsCardsProps {
  vacancies: Vacancy[];
}

export const StatsCards = ({ vacancies }: StatsCardsProps) => {
  const openVacancies = vacancies.filter((v) => v.status === 'open').length;
  const totalApplicants = vacancies.reduce((sum, v) => sum + v.applicantsCount, 0);
  const avgApplicants = vacancies.length > 0 ? Math.round(totalApplicants / vacancies.length) : 0;
  const pausedVacancies = vacancies.filter((v) => v.status === 'paused').length;

  const stats = [
    {
      title: 'Open Vacancies',
      value: openVacancies,
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Candidates',
      value: totalApplicants,
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Avg per Vacancy',
      value: avgApplicants,
      icon: TrendingUp,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: 'On Pause',
      value: pausedVacancies,
      icon: Clock,
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
