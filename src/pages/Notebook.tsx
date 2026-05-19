import React from 'react';
import { 
  Search, 
  FolderPlus, 
  Plus, 
  Filter, 
  MoreVertical, 
  Share2, 
  Trash2,
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NotebookPageProps {
  onOpenJournal: () => void;
}

export function NotebookPage({ onOpenJournal }: NotebookPageProps) {
  const { trades } = useAppStore();

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 overflow-hidden">
      {/* Left Panel: Folders & Tags */}
      <div className="w-52 flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input className="pl-8 bg-white border-[#ECECEC] rounded-lg h-8 text-[12px]" placeholder="Search notes" />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Folders</span>
            <button className="p-1 hover:bg-slate-200 rounded text-slate-400"><FolderPlus className="w-3.5 h-3.5" /></button>
          </div>
          <ScrollArea className="flex-1 -mx-2 px-2">
            <div className="space-y-0.5">
              {['All notes', 'Trade Notes', 'Daily Journal', 'Sessions Recap'].map((folder, i) => (
                <div key={folder} className={`px-2.5 py-1.5 rounded-lg text-[13px] font-semibold cursor-pointer transition-colors ${i === 2 ? 'bg-[#6C4CF1]/10 text-[#6C4CF1]' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {folder}
                </div>
              ))}
            </div>
            
            <div className="mt-6 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tags</span>
              <button className="p-1 hover:bg-slate-200 rounded text-slate-400"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-0.5">
              {['Recap', 'Gap Down Day', 'Gap Up', 'TEST'].map((tag) => (
                <div key={tag} className="px-2.5 py-1.5 rounded-lg text-[13px] font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer flex justify-between items-center group">
                  {tag}
                  <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded group-hover:bg-white">{Math.floor(Math.random() * 10)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <button className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
          <span className="text-[13px] font-semibold">Recently Deleted</span>
        </button>
      </div>

      {/* Center Panel: Notes List */}
      <div className="w-64 flex flex-col bg-white border border-[#ECECEC] rounded-xl shadow-sm overflow-hidden">
        <div className="p-3 border-b border-[#ECECEC] flex items-center justify-between bg-slate-50/30">
          <Button 
            onClick={onOpenJournal}
            variant="outline" 
            className="h-7 gap-1.5 text-[11px] font-bold uppercase tracking-tight border-[#ECECEC] rounded-lg hover:bg-white hover:text-[#6C4CF1] transition-all"
          >
            <Plus className="w-3 h-3" /> Log day
          </Button>
          <Filter className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <ScrollArea className="flex-1">
          <div className="p-1.5 space-y-0.5">
            {['Thu, Aug 03, 2023', 'Wed, Aug 02, 2023', 'Tue, Aug 01, 2023', 'Thu, Jul 27, 2023'].map((date, i) => (
              <div key={date} className={`p-3 rounded-lg cursor-pointer transition-all ${i === 1 ? 'bg-[#F2EFFF] ring-1 ring-indigo-100' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-bold text-slate-800">{date}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium italic">08/02/2023</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel: Active Note Editor */}
      <div className="flex-1 bg-white border border-[#ECECEC] rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#ECECEC]">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-800">Wed Aug 02, 2023</h2>
                  <Badge variant="outline" className="text-[9px] font-bold text-indigo-500 bg-indigo-50 border-indigo-100 gap-1 rounded px-1.5 h-4">
                    <div className="w-1 h-1 bg-indigo-500 rounded-full" /> Saved
                  </Badge>
                </div>
                <span className="text-[11px] font-medium text-slate-400">Created: Aug 02, 2023 09:21AM | Updated: Aug 03, 2023 10:45AM</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem className="gap-2 text-xs"><Share2 className="w-3.5 h-3.5" /> Share</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs text-rose-500"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-emerald-500 tracking-tight">$42,050.44</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Net P&L</span>
            </div>
            <div className="w-px h-6 bg-slate-100" />
            <div className="grid grid-cols-4 gap-x-6 gap-y-2 flex-1">
              {[
                { label: 'Total Trades', value: '7' },
                { label: 'Winners', value: '3' },
                { label: 'Gross P&L', value: '$44,213' },
                { label: 'Commissions', value: '$2,162' },
                { label: 'Winrate', value: '42.8%' },
                { label: 'Losers', value: '4' },
                { label: 'Volume', value: '2600' },
                { label: 'Profit Factor', value: '7.4' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-700">{m.value}</span>
                  <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tight">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Templates</span>
                <Badge variant="outline" className="rounded-full bg-slate-50 border-slate-200 text-slate-500 font-bold text-[9px] px-2 py-0.5 cursor-pointer hover:bg-slate-100">Existing Template 1</Badge>
                <Badge variant="outline" className="rounded-full bg-slate-50 border-slate-200 text-slate-500 font-bold text-[9px] px-2 py-0.5 cursor-pointer hover:bg-slate-100">Daily Game Plan</Badge>
                <Button variant="ghost" size="sm" className="h-6 gap-1 text-[9px] font-bold text-slate-400 uppercase">
                  <Plus className="w-2.5 h-2.5" /> Add Template
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                 <button className="flex items-center space-x-1.5 px-2 py-0.5 bg-slate-50 border border-[#ECECEC] rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-colors">
                    <Plus className="w-2.5 h-2.5" /> Add tag
                 </button>
              </div>
            </div>

            {/* Editor toolbar mockup */}
            <div className="flex items-center space-x-0.5 p-0.5 bg-slate-50/50 rounded-lg border border-[#ECECEC]">
              {['B', 'I', 'U', 'A', '|', 'Left', 'Center', 'List', 'Quote', '|', 'Link', 'Image', 'Code'].map((t, i) => (
                <button key={i} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-slate-600 transition-all">
                  <span className="text-[11px] font-bold">{t === '|' ? '' : t}</span>
                  {t === '|' && <div className="w-px h-3 bg-slate-200 mx-1" />}
                </button>
              ))}
            </div>

            <div className="prose prose-sm prose-slate max-w-none">
              <h3 className="text-base font-bold flex items-center gap-2">🤠 Pre Market game Plan</h3>
              <p className="text-slate-600 leading-relaxed mt-2 text-[13px]">
                Pre Market:
                <br />- Gap Down Day Incoming
                <br />- Seeing a Massive Sell off in Pre market
                <br />- 4580 Massive Reject into 4570 zone
              </p>
              <ol className="list-decimal list-inside text-slate-600 space-y-1 mt-2 text-[13px]">
                <li>Market over reacted and on open we reclaim 4580 = LONG</li>
                <li>Market Sells off hard on open = Not a fan</li>
                <li>Market Pauses before next leg down (possibility)</li>
              </ol>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
