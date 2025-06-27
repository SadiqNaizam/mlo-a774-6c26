import React, { useState } from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
};

// Mock data for orders
const mockOrders: Order[] = [
  { id: "ORD001", customerName: "Liam Johnson", customerEmail: "liam@example.com", date: "2023-11-23", status: "Delivered", total: 250.00 },
  { id: "ORD002", customerName: "Olivia Smith", customerEmail: "olivia@example.com", date: "2023-11-22", status: "Shipped", total: 150.75 },
  { id: "ORD003", customerName: "Noah Williams", customerEmail: "noah@example.com", date: "2023-11-21", status: "Processing", total: 350.50 },
  { id: "ORD004", customerName: "Emma Brown", customerEmail: "emma@example.com", date: "2023-11-20", status: "Cancelled", total: 75.00 },
  { id: "ORD005", customerName: "Ava Jones", customerEmail: "ava@example.com", date: "2023-11-19", status: "Delivered", total: 450.00 },
  { id: "ORD006", customerName: "William Garcia", customerEmail: "william@example.com", date: "2023-11-18", status: "Shipped", total: 55.25 },
];

const Orders = () => {
  console.log('Orders page loaded');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders => 
        currentOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    if(selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'default'; // 'default' is often green-ish primary
      case 'Shipped':
        return 'secondary'; // 'secondary' is often grey/neutral
      case 'Processing':
        return 'outline'; // 'outline' is less prominent
      case 'Cancelled':
        return 'destructive'; // 'destructive' is red
      default:
        return 'default';
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>
                Here's a list of all orders from your store.
              </CardDescription>
               <div className="flex items-center gap-2 pt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search orders..." className="pl-8 w-full md:w-1/3" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Add Order</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(order)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Customer History</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-6</strong> of <strong>{orders.length}</strong> orders
                </div>
                <Pagination className="ml-auto">
                    <PaginationContent>
                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Viewing order {selectedOrder?.id}. You can update the status below.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
             <div className="grid gap-4 py-4">
                <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {selectedOrder.status} <MoreHorizontal className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            {(['Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map(status => (
                                <DropdownMenuItem 
                                    key={status}
                                    onSelect={() => handleStatusChange(selectedOrder.id, status)}
                                >
                                    {status}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
             </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;