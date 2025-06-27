import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define the type for a single recent order
type RecentOrder = {
  id: string;
  customerName: string;
  date: string;
  status: 'Fulfilled' | 'Processing' | 'Declined';
};

// Mock data to represent recent orders, as this component is for display on the dashboard.
// In a real application, this data would be passed in as a prop.
const MOCK_ORDERS: RecentOrder[] = [
  { id: '#3210', customerName: 'Olivia Martin', date: 'Feb 20, 2024', status: 'Fulfilled' },
  { id: '#3209', customerName: 'Jackson Lee', date: 'Feb 19, 2024', status: 'Fulfilled' },
  { id: '#3208', customerName: 'Isabella Nguyen', date: 'Feb 18, 2024', status: 'Processing' },
  { id: '#3207', customerName: 'William Kim', date: 'Feb 17, 2024', status: 'Declined' },
  { id: '#3206', customerName: 'Sophia Davis', date: 'Feb 16, 2024', status: 'Fulfilled' },
];

const RecentOrdersTable: React.FC = () => {
  console.log('RecentOrdersTable loaded');

  // Helper function to determine the visual style of the status badge
  const getStatusVariant = (status: RecentOrder['status']): 'default' | 'secondary' | 'destructive' => {
    if (status === 'Fulfilled') return 'default';
    if (status === 'Processing') return 'secondary';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            An overview of your 5 most recent sales.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/orders">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden text-right sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.id}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.customerName}</div>
                </TableCell>
                <TableCell className="hidden text-right sm:table-cell">{order.date}</TableCell>
                <TableCell className="text-right">
                  <Badge className="text-xs" variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;