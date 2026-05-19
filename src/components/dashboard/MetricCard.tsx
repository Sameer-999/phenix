import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  type?: 'pnl' | 'percentage' | 'number';
  trend?: 'up' | 'down';
  chartData?: { value: number; color: string }[];
}

export function MetricCard({ label, value, subValue, type, trend, chartData }: MetricCardProps) {
  const isPnl = type === 'pnl';
  const displayValue = isPnl ? `$${value}` : value;

  return (
    <Card className="border-[#ECECEC] shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <CardContent className="p-3 flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex items-center space-x-1 text-slate-500 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            <Info className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-[18px] font-bold tracking-tight",
              isPnl && trend === 'up' && "text-emerald-500",
              isPnl && trend === 'down' && "text-rose-500",
              !isPnl && "text-[#1D1D21]"
            )}>
              {displayValue}
            </span>
            {subValue && (
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">{subValue}</span>
            )}
          </div>
        </div>
        
        {chartData && (
          <div className="w-14 h-14 -mr-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={18}
                  outerRadius={26}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
