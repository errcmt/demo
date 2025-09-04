export type Employee = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  skills: string[];
  certifications: string[];
  availability: string;
};

export type Vehicle = {
  id: string;
  name: string;
  type: 'Truck' | 'Van' | 'Car';
  status: 'Available' | 'On Route' | 'Maintenance';
  location: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
};

export type Shift = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  role: string;
  employeeId?: string;
  employeeName?: string;
};
