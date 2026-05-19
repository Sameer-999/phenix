import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BookOpen, 
  ListTodo, 
  BarChart3, 
  Lightbulb, 
  GraduationCap, 
  Notebook, 
  PlayCircle, 
  Trophy, 
  RotateCcw, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'daily-journal', label: 'Daily Journal', icon: BookOpen },
  { id: 'trade-log', label: 'Trade Log', icon: ListTodo },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'university', label: 'University', icon: GraduationCap },
  { id: 'notebook', label: 'Notebook', icon: Notebook },
  { id: 'playbook', label: 'Playbook', icon: PlayCircle },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
  { id: 'trade-replay', label: 'Trade Replay', icon: RotateCcw },
  { id: 'mentor-mode', label: 'Mentor Mode', icon: ShieldCheck },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <div className="w-56 h-screen bg-[#1A1B23] flex flex-col text-[#9E9EA4] border-r border-white/5">
      <div className="p-4 pb-2 flex items-center space-x-2">
        <div className="w-7 h-7 rounded-lg bg-[#6C4CF1] flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">TRADEZELLA</span>
      </div>

      <div className="px-3 mb-4">
        <Button 
          onClick={() => onNavigate('import')}
          className="w-full bg-[#6C4CF1] hover:bg-[#5A3ED9] text-white justify-start gap-2 h-9 rounded-xl shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold text-[13px]">Add Trade</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex items-center space-x-2.5 px-2.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 group text-[13px]",
              activePage === item.id
                ? "bg-[#6C4CF1]/20 text-white" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4",
              activePage === item.id ? "text-[#6C4CF1]" : "group-hover:text-white"
            )} />
            <span className="font-semibold">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center space-x-2.5 px-2.5 py-1.5 group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 border-2 border-white/10" />
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-white">Umar Ashraf</span>
            <span className="text-[10px] text-white/40">umarashraf0128@...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
