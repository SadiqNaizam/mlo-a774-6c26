import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative';
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  description,
}) => {
  console.log(`StatsCard loaded for: ${title}`);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span className={clsx({
              'text-green-600 dark:text-green-400': changeType === 'positive',
              'text-red-600 dark:text-red-500': changeType === 'negative',
            })}>
              {change}
            </span>
            {description && ` ${description}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;