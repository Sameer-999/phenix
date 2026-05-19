import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const data = [
  { date: '07/11/23', value: 0 },
  { date: '07/18/23', value: 500 },
  { date: '07/25/23', value: 1200 },
  { date: '07/28/23', value: 45000 },
  { date: '08/02/23', value: 93171 },
];

export function PerformanceChart() {
  return (
    <Card className="border-[#ECECEC] shadow-sm col-span-2">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
        <CardTitle className="text-[12px] font-bold flex items-center gap-1.5 uppercase tracking-tight text-slate-600">
          Daily Net Cumulative P&L <Info className="w-3 h-3 text-slate-300" />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] p-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94A3B8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'Net P&L']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10B981" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorPnL)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
