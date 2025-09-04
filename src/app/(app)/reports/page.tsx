'use client';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', inventory: 4000, fleetUsage: 2400 },
  { name: 'Feb', inventory: 3000, fleetUsage: 1398 },
  { name: 'Mar', inventory: 2000, fleetUsage: 9800 },
  { name: 'Apr', inventory: 2780, fleetUsage: 3908 },
  { name: 'May', inventory: 1890, fleetUsage: 4800 },
  { name: 'Jun', inventory: 2390, fleetUsage: 3800 },
  { name: 'Jul', inventory: 3490, fleetUsage: 4300 },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="Reporting & Analytics" />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="inventory"
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="fleetUsage" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
