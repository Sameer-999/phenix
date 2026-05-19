import React from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ZellaScore } from '@/components/dashboard/ZellaScore';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { DailyPnLChart } from '@/components/dashboard/DailyPnLChart';
import { RecentTrades } from '@/components/dashboard/RecentTrades';
import { CalendarHeatmap } from '@/components/dashboard/CalendarHeatmap';

export function DashboardPage() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          Good morning! <span className="font-normal text-slate-400 text-xs italic">Last import was made: Aug 02, 2023 11:35 AM</span>
        </h2>
        <div className="flex items-center space-x-2">
          <button className="px-2.5 py-1 bg-white border border-[#ECECEC] rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">Edit Widgets</button>
          <button className="px-2.5 py-1 bg-[#6C4CF1] rounded-lg text-[11px] font-bold text-white hover:bg-[#5A3ED9] transition-colors flex items-center gap-1.5">
            Import trades
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard 
          label="Net P&L" 
          value="93,171.27" 
          subValue="35 trades" 
          type="pnl" 
          trend="up"
        />
        <MetricCard 
          label="Trade Win %" 
          value="71.43%" 
          chartData={[{ value: 71.43, color: '#10B981' }, { value: 28.57, color: '#E2E8F0' }]}
        />
        <MetricCard 
          label="Profit Factor" 
          value="10.86" 
          chartData={[{ value: 90, color: '#10B981' }, { value: 10, color: '#E2E8F0' }]}
        />
        <MetricCard 
          label="Day Win %" 
          value="91.67%" 
          chartData={[{ value: 91.67, color: '#10B981' }, { value: 8.33, color: '#E2E8F0' }]}
        />
        <MetricCard 
          label="Avg win/loss" 
          value="4.34" 
          subValue="$4.1K / -$945"
        />
      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <ZellaScore />
        <PerformanceChart />
        <DailyPnLChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 pb-2">
        <RecentTrades />
        <CalendarHeatmap />
      </div>
    </div>
  );
}
