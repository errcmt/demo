'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { inventory, vehicles, shifts } from '@/lib/data';
import type { Shift } from '@/lib/types';
import { format } from 'date-fns';
import { Boxes, Truck, UserCheck } from 'lucide-react';

const inventoryStatusData = [
  { name: 'In Stock', value: inventory.filter((i) => i.status === 'In Stock').length, color: 'hsl(var(--chart-1))' },
  { name: 'Low Stock', value: inventory.filter((i) => i.status === 'Low Stock').length, color: 'hsl(var(--chart-4))' },
  { name: 'Out of Stock', value: inventory.filter((i) => i.status === 'Out of Stock').length, color: 'hsl(var(--destructive))' },
];

const fleetStatusData = [
  { name: 'Available', count: vehicles.filter((v) => v.status === 'Available').length },
  { name: 'On Route', count: vehicles.filter((v) => v.status === 'On Route').length },
  { name: 'Maintenance', count: vehicles.filter((v) => v.status === 'Maintenance').length },
];

const today = new Date();
const todaysShifts: Shift[] = shifts.filter(
  (shift) => new Date(shift.date).toDateString() === today.toDateString()
);

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">
              {inventory.filter((i) => i.status === 'Low Stock').length} items are low on stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Availability</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.filter(v => v.status === 'Available').length} / {vehicles.length}</div>
            <p className="text-xs text-muted-foreground">
              {vehicles.filter(v => v.status === 'On Route').length} vehicles currently on route
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff on Duty Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysShifts.filter(s => s.employeeName).length}</div>
            <p className="text-xs text-muted-foreground">
              {todaysShifts.length} total shifts scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square text-muted-foreground" viewBox="0 0 16 16">
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8.5A1.5 1.5 0 0 1 13 3v1.5h-2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H13v1.5h-2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H13v1.5h-2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H13A1.5 1.5 0 0 1 11.5 13H3z"/>
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                 </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 overdue</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Today's Shift Roster</CardTitle>
            <CardDescription>{format(today, 'EEEE, MMMM do')}</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Assigned</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todaysShifts.length > 0 ? todaysShifts.map(shift => (
                        <TableRow key={shift.id}>
                            <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                            <TableCell>{shift.role}</TableCell>
                            <TableCell>{shift.employeeName ? shift.employeeName : <Badge variant="outline">Unassigned</Badge>}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">No shifts scheduled for today.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={inventoryStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {inventoryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
