import type { Employee, InventoryItem, Vehicle, Shift } from './types';

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Warehouse Manager',
    email: 'alice@bizboard.com',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    skills: ['Forklift Operation', 'Inventory Management', 'Logistics'],
    certifications: ['Forklift Certified', 'OSHA 10'],
    availability: 'Mon-Fri 8am-4pm',
  },
  {
    id: '2',
    name: 'Bob Williams',
    role: 'Driver',
    email: 'bob@bizboard.com',
    avatar: 'https://i.pravatar.cc/150?u=bob',
    skills: ['Defensive Driving', 'Route Planning'],
    certifications: ['CDL Class A'],
    availability: 'Mon-Thu 6am-6pm',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    role: 'Technician',
    email: 'charlie@bizboard.com',
    avatar: 'https://i.pravatar.cc/150?u=charlie',
    skills: ['Mechanical Repair', 'Diagnostics'],
    certifications: ['ASE Certified'],
    availability: 'Tue-Sat 10am-6pm',
  },
  {
    id: '4',
    name: 'Diana Prince',
    role: 'Sales Associate',
    email: 'diana@bizboard.com',
    avatar: 'https://i.pravatar.cc/150?u=diana',
    skills: ['Customer Service', 'Salesforce'],
    certifications: [],
    availability: 'Mon-Fri 9am-5pm',
  },
];

export const inventory: InventoryItem[] = [
  { id: 'inv-001', name: 'Heavy-Duty Widget', sku: 'HDW-001', stock: 150, status: 'In Stock', lastUpdated: '2023-10-26' },
  { id: 'inv-002', name: 'Standard Sprocket', sku: 'STS-002', stock: 45, status: 'Low Stock', lastUpdated: '2023-10-25' },
  { id: 'inv-003', name: 'Lightweight Gear', sku: 'LWG-003', stock: 300, status: 'In Stock', lastUpdated: '2023-10-26' },
  { id: 'inv-004', name: 'Industrial Cog', sku: 'INC-004', stock: 0, status: 'Out of Stock', lastUpdated: '2023-10-20' },
  { id: 'inv-005', name: 'Precision Bearing', sku: 'PRB-005', stock: 88, status: 'In Stock', lastUpdated: '2023-10-24' },
];

export const vehicles: Vehicle[] = [
    { id: 'veh-1', name: 'Truck 1', type: 'Truck', status: 'Available', location: 'Main Depot' },
    { id: 'veh-2', name: 'Van 3', type: 'Van', status: 'On Route', location: 'Highway 101' },
    { id: 'veh-3', name: 'Car 2', type: 'Car', status: 'Maintenance', location: 'Service Center' },
    { id: 'veh-4', name: 'Truck 2', type: 'Truck', status: 'Available', location: 'Main Depot' },
];

export const shifts: Shift[] = [
    { id: 'shift-1', date: new Date(), startTime: '08:00', endTime: '16:00', role: 'Warehouse Manager', employeeId: '1', employeeName: 'Alice Johnson' },
    { id: 'shift-2', date: new Date(), startTime: '06:00', endTime: '14:00', role: 'Driver', employeeId: '2', employeeName: 'Bob Williams' },
    { id: 'shift-3', date: new Date(new Date().setDate(new Date().getDate() + 1)), startTime: '10:00', endTime: '18:00', role: 'Technician', employeeId: '3', employeeName: 'Charlie Brown' },
    { id: 'shift-4', date: new Date(), startTime: '09:00', endTime: '17:00', role: 'Sales Associate' },
];
