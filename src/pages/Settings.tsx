import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';

const Settings = () => {
  console.log('Settings page loaded');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
          </div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="store">Store</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
               <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your email and push notification preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="new-orders-notification" className="flex flex-col space-y-1">
                            <span>New Orders</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive an email for every new order.
                            </span>
                        </Label>
                        <Switch id="new-orders-notification" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="stock-alerts-notification" className="flex flex-col space-y-1">
                            <span>Low Stock Alerts</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get notified when product inventory is low.
                            </span>
                        </Label>
                        <Switch id="stock-alerts-notification" />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                            <span>Marketing Emails</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive updates about new features and promotions.
                            </span>
                        </Label>
                        <Switch id="marketing-emails" defaultChecked />
                    </div>
                </CardContent>
                <CardFooter>
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="store">
               <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>
                    Manage your store's general information and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" placeholder="My Awesome Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-currency">Currency</Label>
                    <Input id="store-currency" placeholder="USD" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save store settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;