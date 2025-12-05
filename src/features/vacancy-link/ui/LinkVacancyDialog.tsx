import { useState } from 'react';
import { Link2, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Vacancy } from '@/shared/types/vacancy';

interface LinkVacancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: Vacancy | null;
  allVacancies: Vacancy[];
  onLink: (vacancyId: string, linkedIds: string[]) => void;
}

export const LinkVacancyDialog = ({
  open,
  onOpenChange,
  vacancy,
  allVacancies,
  onLink,
}: LinkVacancyDialogProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && vacancy) {
      setSelectedIds(vacancy.linkedIds || []);
    }
    onOpenChange(isOpen);
  };

  const toggleVacancy = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleSave = () => {
    if (vacancy) {
      onLink(vacancy.id, selectedIds);
      onOpenChange(false);
    }
  };

  const otherVacancies = allVacancies.filter((v) => v.id !== vacancy?.id);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Link Vacancies
          </DialogTitle>
          <DialogDescription>Select vacancies to link with the current vacancy.</DialogDescription>
        </DialogHeader>

        {vacancy && (
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Current Vacancy:</p>
              <p className="font-medium">{vacancy.title}</p>
              <p className="text-sm text-muted-foreground">{vacancy.client.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Select Linked Vacancies:</p>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {otherVacancies.map((v) => (
                    <label
                      key={v.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={selectedIds.includes(v.id)}
                        onCheckedChange={() => toggleVacancy(v.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{v.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {v.client.name} · {v.city.name}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {v.atsStatus.name}
                      </Badge>
                    </label>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
