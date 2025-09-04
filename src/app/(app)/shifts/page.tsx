import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { CreateShiftForm } from './components/create-shift-form';
import { Sparkles, PlusCircle } from 'lucide-react';
import { shifts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function ShiftsPage() {
  return (
    <>
      <PageHeader title="Shift Roster">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Intelligent Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Intelligent Shift Assignment</DialogTitle>
              <DialogDescription>
                Let AI suggest the best employees for the job based on skills,
                availability, and more.
              </DialogDescription>
            </DialogHeader>
            <CreateShiftForm />
          </DialogContent>
        </Dialog>
      </PageHeader>
      
      <Card>
        <CardHeader>
            <CardTitle>Upcoming Shifts</CardTitle>
            <CardDescription>A list of all scheduled shifts.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Assigned To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shifts.sort((a,b) => a.date.getTime() - b.date.getTime()).map(shift => (
                        <TableRow key={shift.id}>
                            <TableCell>{format(shift.date, 'MMM d, yyyy')}</TableCell>
                            <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                            <TableCell>{shift.role}</TableCell>
                            <TableCell>
                                {shift.employeeName ? (
                                    <span>{shift.employeeName}</span>
                                ) : (
                                    <Badge variant="outline">Unassigned</Badge>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </>
  );
}
