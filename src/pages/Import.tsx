import React from 'react';
import { 
  Upload, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  ChevronRight,
  Monitor,
  Globe,
  Settings,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/lib/store';

const brokers = [
  { id: 'thinkorswim', name: 'Thinkorswim', logo: 'T' },
  { id: 'ibkr', name: 'Interactive Brokers', logo: 'I' },
  { id: 'tradovate', name: 'Tradovate', logo: 'T' },
  { id: 'ninja', name: 'NinjaTrader', logo: 'N' },
];

export function ImportPage() {
  const { selectedAccount } = useAppStore();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm font-medium text-slate-400">
        <span>Add Trade</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-800">File Upload</span>
      </div>

      <Tabs defaultValue="file" className="w-full">
        <TabsList className="bg-white p-1 rounded-xl h-11 border border-[#ECECEC]">
          <TabsTrigger value="file" className="rounded-lg px-6 text-[13px] font-bold uppercase tracking-tight">File Upload</TabsTrigger>
          <TabsTrigger value="sync" className="rounded-lg px-6 text-[13px] font-bold uppercase tracking-tight">Broker Sync</TabsTrigger>
          <TabsTrigger value="manual" className="rounded-lg px-6 text-[13px] font-bold uppercase tracking-tight">Manual</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Card className="border-[#ECECEC] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload your CSV</h2>
            <p className="text-sm text-slate-400 font-medium mb-8">When importing you must select account you'll like to import your CSV to</p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account <span className="text-rose-500">*</span></label>
                  <Select defaultValue={selectedAccount}>
                    <SelectTrigger className="bg-slate-50 border-[#ECECEC] h-11 rounded-xl">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={selectedAccount}>{selectedAccount}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Broker</label>
                  <Select defaultValue="thinkorswim">
                    <SelectTrigger className="bg-slate-50 border-[#ECECEC] h-11 rounded-xl">
                      <SelectValue placeholder="Select broker" />
                    </SelectTrigger>
                    <SelectContent>
                      {brokers.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Timezone</label>
                <Select defaultValue="est">
                  <SelectTrigger className="bg-slate-50 border-[#ECECEC] h-11 rounded-xl">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">(GMT-04:00) US/Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 hover:border-indigo-300 hover:bg-slate-50/50 transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-600">Drag and drop file and upload from your computer</p>
                  <button className="text-sm font-bold text-indigo-500 mt-2 hover:underline">+ Upload file</button>
                </div>
              </div>

              {/* Preview image mockup */}
              <div className="rounded-2xl overflow-hidden border border-[#ECECEC]">
                <img 
                  src="https://images.unsplash.com/photo-1611974717482-9993309a4d8c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Import Preview" 
                  className="w-full h-48 object-cover opacity-80"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#ECECEC] shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50/50 border-b border-[#ECECEC] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">T</div>
                <h3 className="font-bold text-slate-800">thinkorswim</h3>
              </div>
              <HelpCircle className="w-5 h-5 text-slate-400" />
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Supported Asset Types:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Stocks', 'Futures', 'Options', 'Forex', 'Crypto', 'Cfd'].map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500">{t}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">How to Import Trades from Thinkorswim</h4>
                  <button className="text-indigo-600 text-xs font-bold hover:underline">Help Me Import</button>
                </div>
                <div className="space-y-3">
                  {[
                    'Open the Thinkorswim desktop application.',
                    'Click the "Monitor" tab',
                    'Click "Account Statement" from the submenu',
                    'Select the date range you wish to import.',
                    'From the right of "Cash & Sweep Vehicle" click on "Transactions"',
                    'From the transactions menu, click the Reset button.',
                    'Click the actions button which appears at top right of the screen.',
                    'From the drop-down menu, select "Export to file...".',
                    'Save the CSV file to your desktop.'
                  ].map((step, i) => (
                    <div key={i} className="flex space-x-3">
                      <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[13px] text-slate-600 leading-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-800 uppercase">Note</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  If a message is shown that there are missing headers, after step 6 do the following...
                  <br />a) Right click one of the headers under the "Trade History" section.
                  <br />b) Click customize: A "Customize Trade History" menu will appear.
                  <br />c) Click on "Load Defaults".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
