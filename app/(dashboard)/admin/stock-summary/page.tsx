"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
    Building2,
    Database,
    Layers,
    Warehouse,
    Search,
    TrendingUp,
    ThermometerSnowflake,
    Sun,
    Download,
    Filter,
    Users,
    MoreHorizontal,
    Activity,
    ShieldCheck,
    Globe
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StockSummary {
  storer: string;
  itemNumber: string;
  description: string;
  pallet: number;
  quantity: number;
  warehouse: string;
  containerNumber: string;
  inboundDetails: string;
  expiryDate: string;
}

const mockAllData: StockSummary[] = [
  {
    storer: "ST001 - Nestle Malaysia",
    itemNumber: "ITEM-9921",
    description: "Nestle Milo 1kg (Cold Storage)",
    pallet: 45,
    quantity: 5400,
    warehouse: "1 (Cold)",
    containerNumber: "CNTR-10293",
    inboundDetails: "IB-88219",
    expiryDate: "2026-12-15",
  },
  {
    storer: "ST002 - Unilever Holdings",
    itemNumber: "ITEM-4401",
    description: "Lipton Yellow Label 100s",
    pallet: 28,
    quantity: 3360,
    warehouse: "2 (Ambient)",
    containerNumber: "CNTR-99102",
    inboundDetails: "IB-88220",
    expiryDate: "2025-08-20",
  },
  {
    storer: "ST005 - F&N Dairies",
    itemNumber: "ITEM-1102",
    description: "F&N Condensed Milk 390g",
    pallet: 60,
    quantity: 7200,
    warehouse: "2 (Ambient)",
    containerNumber: "CNTR-33812",
    inboundDetails: "IB-88225",
    expiryDate: "2026-03-10",
  },
];

export default function AdminStockSummaryPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");

  const filteredData = selectedCustomer === "all" 
    ? mockAllData 
    : mockAllData.filter(item => item.storer.includes(selectedCustomer));

  const columns: ColumnDef<StockSummary>[] = [
    {
      accessorKey: "storer",
      header: "Customer Account",
      cell: ({ row }) => (
        <div className="flex flex-col py-1">
            <span className="font-black text-slate-900 text-[13px] uppercase tracking-tight leading-none">{row.getValue("storer")}</span>
            <div className="flex items-center gap-1.5 mt-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Active Partner</span>
            </div>
        </div>
      ),
    },
    {
      accessorKey: "itemNumber",
      header: "Item #",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-slate-100 rounded-full"></div>
            <span className="font-mono text-[11px] font-black text-slate-500 leading-none">{row.getValue("itemNumber")}</span>
        </div>
      )
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[280px] truncate font-black text-slate-900 text-[13px] tracking-tight leading-none group-hover:text-primary transition-colors" title={row.getValue("description")}>
            {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "pallet",
      header: () => <div className="text-right">Pallets</div>,
      cell: ({ row }) => (
        <div className="text-right font-black text-slate-900 pr-1 tabular-nums text-sm leading-none bg-slate-50/50 py-1 rounded">
            {row.getValue("pallet")}
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-right">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-right font-black text-slate-900 pr-1 tabular-nums text-sm leading-none">
            {Number(row.getValue("quantity")).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "warehouse",
      header: "Storage",
      cell: ({ row }) => {
        const wh = row.getValue("warehouse") as string;
        const isCold = wh.includes("1");
        return (
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border transition-all",
            isCold 
                ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)]" 
                : "bg-white text-amber-600 border-amber-200"
          )}>
            {isCold ? <ThermometerSnowflake size={10} strokeWidth={3} /> : <Sun size={10} strokeWidth={3} />}
            {isCold ? "Cold" : "Ambient"}
          </div>
        );
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) => (
        <div className="flex flex-col items-start gap-1">
            <div className="font-mono text-[11px] font-black text-slate-500 tracking-tight leading-none">{row.getValue("expiryDate")}</div>
            <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[80%]"></div>
            </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center justify-end">
            <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-slate-900 hover:text-white text-slate-300 transition-all border border-transparent hover:border-slate-800">
                <MoreHorizontal size={14} />
            </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-12"
    >
      {/* HUD-Style Hero Section */}
      <section className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none group-hover:bg-primary/30 transition-all duration-1000"></div>
        
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">System Online • Global Inventory</span>
                </div>
                
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-white leading-[0.9]">MASTER STOCK <span className="text-primary italic">LEDGER</span></h2>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-500" />
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Network-wide Visibility</p>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-slate-700"></div>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Verified Data Source</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-fit lg:pb-1">
                <HUDCard icon={Building2} label="ACCOUNTS" value="12" />
                <HUDCard icon={Warehouse} label="LOAD" value="84%" trend="+2.4%" />
                <HUDCard icon={Layers} label="PALLETS" value="2,840" />
                <HUDCard icon={Database} label="ITEMS" value="142k" color="primary" />
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
                <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                        Account Filters
                        <Filter size={10} />
                    </h4>
                    <div className="space-y-1">
                        {[
                            { id: "all", label: "All Partner Accounts" },
                            { id: "Nestle", label: "Nestle Malaysia" },
                            { id: "Unilever", label: "Unilever Holdings" },
                            { id: "F&N", label: "F&N Dairies" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedCustomer(item.id)}
                                className={cn(
                                    "w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-black transition-all group relative overflow-hidden",
                                    selectedCustomer === item.id 
                                        ? "bg-slate-900 text-white shadow-lg" 
                                        : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                                )}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {selectedCustomer === item.id && (
                                    <motion.div 
                                        layoutId="active-bg"
                                        className="absolute inset-0 bg-slate-900 z-0"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                        <Download size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                        GENERATE REPORT
                    </button>
                </div>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/10 p-5 overflow-hidden relative group cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                    <Activity size={20} className="text-primary mb-3" />
                    <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">System Health</h5>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 leading-relaxed">
                        Last SAP synchronization was successful at 14:30 GMT+8.
                    </p>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <h3 className="font-black text-slate-900 text-[14px] uppercase tracking-tight">Current Inventory Status</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-[8px] font-black uppercase tracking-widest">{filteredData.length} Records</span>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input 
                        placeholder="Search items, storer..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400 font-bold text-slate-900"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                <div className="relative overflow-x-auto">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <DataTable columns={columns} data={filteredData} searchKey="description" />
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function HUDCard({ 
    icon: Icon, 
    label, 
    value, 
    trend,
    color = "white" 
}: { 
    icon: any, 
    label: string, 
    value: string, 
    trend?: string,
    color?: "white" | "primary"
}) {
    return (
        <div className="relative group p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-full -mr-6 -mt-6 blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="flex flex-col h-full justify-between gap-3 relative z-10">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "h-6 w-6 rounded-lg flex items-center justify-center border transition-all duration-300",
                        color === "primary" ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-white/5 border-white/10 text-slate-400"
                    )}>
                        <Icon size={12} strokeWidth={3} />
                    </div>
                    {trend && (
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {trend}
                        </span>
                    )}
                </div>
                <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</p>
                    <h4 className={cn(
                        "text-xl font-black tracking-tighter leading-none",
                        color === "primary" ? "text-primary" : "text-white"
                    )}>{value}</h4>
                </div>
            </div>
            {/* Corner Mark */}
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-lg"></div>
        </div>
    );
}
