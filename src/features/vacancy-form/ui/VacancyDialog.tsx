import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Vacancy } from '@/shared/types/vacancy';

interface VacancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit' | 'view';
  vacancy?: Vacancy | null;
  onSave: (data: Partial<Vacancy>) => Promise<void>;
  dictionaries: {
    clients: any[];
    recruiters: any[];
    atsStatuses: any[];
    postingStatuses: any[];
    countries: any[];
    cities: any[];
  };
}

export const VacancyDialog = ({
  open,
  onOpenChange,
  mode,
  vacancy,
  onSave,
  dictionaries,
}: VacancyDialogProps) => {
  const [formData, setFormData] = useState<Partial<Vacancy>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'create') {
        setFormData({
          isRepeating: false,
          isPosted: false,
          isMain: false,
        });
      } else if (vacancy) {
        setFormData({
          ...vacancy,
          clientId: vacancy.client.id,
          recruiterId: vacancy.recruiter.id,
          atsStatusId: vacancy.atsStatus.id,
          postingStatusId: vacancy.postingStatus.id,
          countryId: vacancy.country.id,
          cityId: vacancy.city.id,
        } as any);
      }
    }
  }, [open, mode, vacancy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save vacancy', error);
    } finally {
      setLoading(false);
    }
  };

  const isView = mode === 'view';
  const title =
    mode === 'create' ? 'New Vacancy' : mode === 'edit' ? 'Edit Vacancy' : 'View Vacancy';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Fill in the details to create a new vacancy.'
              : mode === 'edit'
                ? 'Modify the details of the existing vacancy.'
                : 'View the details of the vacancy.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isView}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="atsId">ATS ID</Label>
              <Input
                id="atsId"
                value={formData.atsId || ''}
                onChange={(e) => setFormData({ ...formData, atsId: e.target.value })}
                disabled={isView}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                value={formData.specificProject || ''}
                onChange={(e) => setFormData({ ...formData, specificProject: e.target.value })}
                disabled={isView}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recruiter">Recruiter</Label>
              <Select
                value={formData.recruiterId}
                onValueChange={(value) => setFormData({ ...formData, recruiterId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recruiter" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.recruiters.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.firstName} {r.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="atsStatus">ATS Status</Label>
              <Select
                value={formData.atsStatusId}
                onValueChange={(value) => setFormData({ ...formData, atsStatusId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.atsStatuses.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.countryId}
                onValueChange={(value) => setFormData({ ...formData, countryId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.countries.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                value={formData.cityId}
                onValueChange={(value) => setFormData({ ...formData, cityId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.cities.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postingStatus">Posting Status</Label>
              <Select
                value={formData.postingStatusId}
                onValueChange={(value) => setFormData({ ...formData, postingStatusId: value })}
                disabled={isView}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.postingStatuses.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jbUrl">Job Board URL</Label>
              <Input
                id="jbUrl"
                value={formData.mainJbUrl || ''}
                onChange={(e) => setFormData({ ...formData, mainJbUrl: e.target.value })}
                disabled={isView}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={formData.comment || ''}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              disabled={isView}
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPosted"
                checked={formData.isPosted}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPosted: checked as boolean })
                }
                disabled={isView}
              />
              <Label htmlFor="isPosted">Posted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRepeating"
                checked={formData.isRepeating}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isRepeating: checked as boolean })
                }
                disabled={isView}
              />
              <Label htmlFor="isRepeating">Repeating</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isMain"
                checked={formData.isMain}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isMain: checked as boolean })
                }
                disabled={isView}
              />
              <Label htmlFor="isMain">Main</Label>
            </div>
          </div>

          {!isView && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
