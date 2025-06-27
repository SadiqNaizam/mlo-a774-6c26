import * as React from 'react';
import { useState } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import ProductForm from '@/components/ProductForm';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Mock data for products
const productsData = [
  {
    id: 'prod_1',
    name: 'GamerPro Mechanical Keyboard',
    status: 'In Stock',
    price: 129.99,
    stock: 72,
    image: 'https://images.unsplash.com/photo-1587829741301-462848e91511?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod_2',
    name: 'Acoustic Bliss Headphones',
    status: 'In Stock',
    price: 89.0,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod_3',
    name: 'ErgoComfort Office Chair',
    status: 'Low Stock',
    price: 249.5,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod_4',
    name: '4K Ultra HD Monitor',
    status: 'Out of Stock',
    price: 499.99,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1527814223028-769a18843d34?q=80&w=800&auto=format&fit=crop',
  },
];

type Product = typeof productsData[0];

const Products = () => {
  console.log('Products page loaded');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    // In a real app, you would call an API to delete the product
    alert(`Deleting product ${productId}`);
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form submitted:', values);
    // In a real app, you would call an API to save the product
    if (editingProduct) {
      console.log('Updating product:', editingProduct.id);
    } else {
      console.log('Creating new product');
    }
    setIsDialogOpen(false);
  };

  const dialogTitle = editingProduct ? 'Edit Product' : 'Add a New Product';
  const dialogDescription = editingProduct ? "Make changes to your product's details." : "Fill in the form to add a new product to your store.";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline">
                Export
              </Button>
              <Button size="sm" onClick={handleAddNewProduct}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <DialogContent className="sm:max-w-[825px]">
               <DialogHeader>
                 <DialogTitle>{dialogTitle}</DialogTitle>
                 <DialogDescription>{dialogDescription}</DialogDescription>
               </DialogHeader>
               <ProductForm
                 onSubmit={handleFormSubmit}
                 initialData={editingProduct || undefined}
                 isSubmitting={false} // This would be managed by a state from a hook like useMutation
               />
             </DialogContent>
           </Dialog>

          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="hidden md:table-cell text-right">
                      Stock
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.image}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'Out of Stock' ? 'destructive' : (product.status === 'Low Stock' ? 'secondary' : 'default')}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                 <div className="text-xs text-muted-foreground ml-auto">
                    Showing <strong>1-4</strong> of <strong>{productsData.length}</strong> products
                </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Products;