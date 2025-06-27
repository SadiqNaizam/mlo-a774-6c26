import { NavLink, Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Package2,
  Settings
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LeftSidebar = () => {
  console.log('LeftSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
    }`;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>ShopMaster</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink to="/" end className={navLinkClasses}>
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink to="/orders" className={navLinkClasses}>
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
              <Package className="h-4 w-4" />
              Products
            </NavLink>
            <NavLink to="/customers" className={navLinkClasses}>
              <Users className="h-4 w-4" />
              Customers
            </NavLink>
            {/* Analytics link can be added later if needed */}
            {/* 
            <NavLink to="/analytics" className={navLinkClasses}>
              <LineChart className="h-4 w-4" />
              Analytics
            </NavLink> 
            */}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <NavLink to="/settings" className={navLinkClasses}>
                    <Settings className="h-4 w-4" />
                    Settings
                </NavLink>
            </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;