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
    Globe,
    AlertTriangle,
    ChevronRight,
    Box,
    Zap
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
          <span className="font-medium text-slate-900 leading-none">{row.getValue("storer")}</span>
          <span className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-tight">{row.original.itemNumber}</span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[320px] cursor-pointer">
          <div className="font-medium text-slate-900 truncate tracking-tight text-[13px] hover:text-primary transition-colors" title={row.getValue("description")}>
            {row.getValue("description")}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
             <span className="text-[8px] bg-slate-50 text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">
                {row.original.containerNumber}
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
             <span className="text-[8px] text-slate-300 font-bold uppercase">{row.original.inboundDetails}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "pallet",
      header: "Pallets",
      cell: ({ row }) => (
        <div className="text-left font-medium text-[#475569] tabular-nums text-[13px]">
            {row.getValue("pallet")}
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="text-left font-medium text-[#475569] tabular-nums text-[13px] tracking-tight">
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
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
            isCold 
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" 
                : "bg-white text-slate-600 border-slate-200"
          )}>
            {isCold ? <ThermometerSnowflake size={10} strokeWidth={3} /> : <Sun size={10} strokeWidth={3} />}
            {isCold ? "Cold" : "Ambient"}
          </div>
        );
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: ({ row }) => {
        const dateStr = row.getValue("expiryDate") as string;
        const date = new Date(dateStr);
        const today = new Date();
        const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const isExpiringSoon = diffDays < 90;
        const isCritical = diffDays < 30;

        return (
          <div className="flex flex-col">
            <div className={cn(
                "font-sans text-[12px] font-medium tracking-tighter leading-none",
                isCritical ? "text-rose-600 underline decoration-rose-200 underline-offset-4" : isExpiringSoon ? "text-amber-600" : "text-slate-500"
            )}>
                {dateStr}
            </div>
            {isExpiringSoon && (
                <div className="flex items-center gap-1 mt-1.5">
                    <AlertTriangle size={8} className={isCritical ? "text-rose-500" : "text-amber-500"} />
                    <span className={cn(
                        "text-[8px] font-black uppercase tracking-widest leading-none",
                        isCritical ? "text-rose-500" : "text-amber-500"
                    )}>
                        {isCritical ? "Critical" : "Warning"}
                    </span>
                </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center justify-end">
            <button className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white text-slate-300 transition-all border border-slate-100 hover:border-slate-900">
                <ChevronRight size={14} />
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
      {/* HUD-Style Hero Section (Light Theme) */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none"></div>
        
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">System Online • Global Inventory</span>
                </div>
                
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-[0.9]">MASTER STOCK <span className="text-primary italic">LEDGER</span></h2>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Network-wide Visibility</p>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-slate-200"></div>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Verified Data Source</p>
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

      <div className="flex flex-wrap items-center justify-end gap-4 px-1">
        <div className="flex items-center gap-3">
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="h-10 px-5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 group shadow-sm w-[200px]">
                    <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                    {[
                        { id: "all", label: "All Partner Accounts" },
                        { id: "Nestle", label: "Nestle Malaysia" },
                        { id: "Unilever", label: "Unilever Holdings" },
                        { id: "F&N", label: "F&N Dairies" },
                    ].map((item) => (
                        <SelectItem key={item.id} value={item.id} className="text-[11px] font-medium cursor-pointer">
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <button className="h-10 px-5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 group shadow-sm">
                <Filter size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                ADVANCED FILTERS
            </button>
            <button className="h-10 px-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10 active:scale-95">
                <Download size={14} strokeWidth={3} />
                EXPORT LEDGER
            </button>
        </div>
      </div>

      <div className="space-y-4">
      {/* Elegant Table Section (Updated to match Client style) */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
        <div className="px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-white gap-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                    <Box size={18} className="text-slate-600" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 text-[15px] tracking-tight">Current Inventory Status</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live Stock Records</p>
                </div>
                <span className="ml-auto px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-[8px] font-black uppercase tracking-widest">{filteredData.length} Records</span>
            </div>
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 transition-colors" />
                <input 
                    placeholder="Search items, storer..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all placeholder:text-slate-400 font-bold text-slate-900"
                />
            </div>
        </div>
        <div className="p-2">
            <DataTable columns={columns} data={filteredData} searchKey="description" />
        </div>
      </section>
      </div>
    </motion.div>
  );
}

function HUDCard({ 
    icon: Icon, 
    label, 
    value, 
    trend,
    color = "slate" 
}: { 
    icon: any, 
    label: string, 
    value: string, 
    trend?: string,
    color?: "slate" | "primary"
}) {
    return (
        <div className="relative group p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-12 h-12 bg-slate-50 rounded-full -mr-6 -mt-6 blur-xl group-hover:bg-primary/5 transition-all duration-500"></div>
            <div className="flex flex-col h-full justify-between gap-3 relative z-10">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "h-6 w-6 rounded-lg flex items-center justify-center border transition-all duration-300",
                        color === "primary" ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-600"
                    )}>
                        <Icon size={12} strokeWidth={3} />
                    </div>
                    {trend && (
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                            {trend}
                        </span>
                    )}
                </div>
                <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
                    <h4 className={cn(
                        "text-xl font-black tracking-tighter leading-none",
                        color === "primary" ? "text-primary" : "text-slate-900"
                    )}>{value}</h4>
                </div>
            </div>
        </div>
    );
}
