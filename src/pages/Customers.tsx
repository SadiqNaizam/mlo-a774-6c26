import React from 'react';
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Mock data for customers
const customers = [
  {
    id: "cus_001",
    name: "Liam Johnson",
    email: "liam@example.com",
    type: "Returning",
    totalSpent: "2,500.00",
    orders: 5,
  },
  {
    id: "cus_002",
    name: "Olivia Smith",
    email: "olivia@example.com",
    type: "New",
    totalSpent: "300.50",
    orders: 1,
  },
  {
    id: "cus_003",
    name: "Noah Williams",
    email: "noah@example.com",
    type: "Returning",
    totalSpent: "1,250.75",
    orders: 3,
  },
  {
    id: "cus_004",
    name: "Emma Brown",
    email: "emma@example.com",
    type: "VIP",
    totalSpent: "15,000.00",
    orders: 25,
  },
  {
    id: "cus_005",
    name: "Ava Jones",
    email: "ava@example.com",
    type: "New",
    totalSpent: "75.00",
    orders: 1,
  },
  {
    id: "cus_006",
    name: "James Garcia",
    email: "james@example.com",
    type: "Returning",
    totalSpent: "850.20",
    orders: 4,
  },
];

const Customers = () => {
  console.log('Customers page loaded');
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Customers</h1>
          </div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle>Customer Overview</CardTitle>
                      <CardDescription>
                          Manage your customers and view their details.
                      </CardDescription>
                  </div>
                  <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add Customer
                      </span>
                  </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={customer.type === 'New' ? 'secondary' : customer.type === 'VIP' ? 'default' : 'outline'}>
                          {customer.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{customer.orders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent}</TableCell>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between w-full items-center">
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-6</strong> of <strong>32</strong> customers
                    </div>
                    <Pagination>
                        <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                            2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Customers;