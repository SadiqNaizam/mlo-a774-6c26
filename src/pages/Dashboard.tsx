import React from 'react';
import { DollarSign, Users, CreditCard } from 'lucide-react';

// Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';

// Custom Page-specific Components
import StatsCard from '@/components/StatsCard';
import SalesChart from '@/components/SalesChart';
import RecentOrdersTable from '@/components/RecentOrdersTable';

const Dashboard = () => {
  console.log('Dashboard loaded');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {/* Section for KPI Stats Cards */}
          <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1% from last month"
              changeType="positive"
              icon={DollarSign}
            />
            <StatsCard
              title="New Customers"
              value="+2,350"
              change="+18.7% from last month"
              changeType="positive"
              icon={Users}
            />
             <StatsCard
              title="Open Orders"
              value="12"
              description="awaiting processing"
              icon={CreditCard}
            />
          </section>

          {/* Section for Chart and Recent Orders */}
          <section className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div className="lg:col-span-1">
              <RecentOrdersTable />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;