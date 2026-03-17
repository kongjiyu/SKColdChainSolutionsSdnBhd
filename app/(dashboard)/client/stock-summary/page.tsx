"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Box, 
  ThermometerSnowflake, 
  Sun,
  AlertTriangle,
  ArrowRight,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

const mockData: StockSummary[] = [
  {
    storer: "ST001 - Nestle",
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
    storer: "ST001 - Nestle",
    itemNumber: "ITEM-4421",
    description: "Nestle Maggi Curry 5pk (Ambient)",
    pallet: 12,
    quantity: 1440,
    warehouse: "2 (Ambient)",
    containerNumber: "CNTR-22910",
    inboundDetails: "IB-88220",
    expiryDate: "2025-08-20",
  },
  {
    storer: "ST001 - Nestle",
    itemNumber: "ITEM-1102",
    description: "Kit Kat 2-Finger 12pk",
    pallet: 8,
    quantity: 960,
    warehouse: "1 (Cold)",
    containerNumber: "CNTR-99102",
    inboundDetails: "IB-88225",
    expiryDate: "2026-03-10",
  },
  {
    storer: "ST001 - Nestle",
    itemNumber: "ITEM-5562",
    description: "Nescafe Classic 200g",
    pallet: 20,
    quantity: 2400,
    warehouse: "2 (Ambient)",
    containerNumber: "CNTR-33812",
    inboundDetails: "IB-88230",
    expiryDate: "2027-01-05",
  },
  {
    storer: "ST001 - Nestle",
    itemNumber: "ITEM-7712",
    description: "Nestle Omega Plus 1kg",
    pallet: 15,
    quantity: 1800,
    warehouse: "1 (Cold)",
    containerNumber: "CNTR-44219",
    inboundDetails: "IB-88235",
    expiryDate: "2026-06-30",
  },
];

export default function StockSummaryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const columns: ColumnDef<StockSummary>[] = [
    {
      accessorKey: "storer",
      header: "Storer",
      cell: ({ row }) => (
        <div className="flex flex-col py-1">
          <span className="font-bold text-slate-900 leading-none">{row.getValue("storer")}</span>
          <span className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-tight">{row.original.itemNumber}</span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[320px] group cursor-pointer">
          <div className="font-black text-slate-900 truncate tracking-tight text-[13px] group-hover:text-primary transition-colors" title={row.getValue("description")}>
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
      header: () => <div className="text-right px-2">Pallets</div>,
      cell: ({ row }) => (
        <div className="text-right px-2">
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-50 font-black text-slate-900 tabular-nums text-[13px] border border-slate-100/50">
                {row.getValue("pallet")}
            </span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-right px-2">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-right px-2 font-black text-slate-900 tabular-nums text-[13px] tracking-tight">
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
                "font-mono text-[12px] font-black tracking-tighter leading-none",
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

  const filters = [
    { name: "All", count: 142 },
    { name: "Cold Storage", count: 86 },
    { name: "Ambient", count: 56 },
    { name: "Near Expiry", count: 12 },
    { name: "Low Stock", count: 8 },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 pb-12"
    >
      {/* Editorial Hero Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none"></div>
        
        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-5 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <LayoutDashboard size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Strategic Overview</span>
                </div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-[0.85]">STOCK <span className="text-slate-300">SUMMARY</span></h2>
                <p className="text-slate-500 text-[13px] font-bold tracking-tight mt-4 leading-relaxed max-w-sm">
                    Your real-time inventory performance and risk analysis for <span className="text-slate-900 font-black">Nestle Malaysia</span>.
                </p>
                <div className="flex items-center gap-6 mt-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Status</span>
                        <div className="flex items-center gap-2 mt-1">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[12px] font-black text-slate-900 uppercase">Secure • SAP Sync</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-100"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Active Alerts</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Zap size={14} className="text-amber-500" />
                            <span className="text-[12px] font-black text-slate-900 uppercase">12 Needs Action</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
                <KPICard icon={Box} label="TOTAL PALLETS" value="100" trend="+6" color="slate" />
                <KPICard icon={TrendingUp} label="UNIT QUANTITY" value="12,040" trend="+12%" color="primary" />
                <KPICard icon={ThermometerSnowflake} label="COLD STORAGE" value="68" subtitle="Units" color="blue" />
                <HUDIndicator label="RISK INDEX" value="Low" color="emerald" />
            </div>
        </div>
      </section>

      {/* Modern Filter Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-slate-200/50">
            {filters.map((f) => (
                <button
                    key={f.name}
                    onClick={() => setActiveFilter(f.name)}
                    className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-black transition-all duration-300 flex items-center gap-2 group relative",
                        activeFilter === f.name 
                            ? "bg-white text-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.06)] scale-100" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    )}
                >
                    <span className="relative z-10">{f.name}</span>
                    <span className={cn(
                        "px-1.5 py-0.5 rounded-md text-[8px] font-black transition-colors relative z-10",
                        activeFilter === f.name ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400 group-hover:bg-slate-300 group-hover:text-slate-600"
                    )}>{f.count}</span>
                </button>
            ))}
        </div>

        <div className="flex items-center gap-3">
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

      {/* Elegant Table Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
        <div className="px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-white gap-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                    <Box size={18} className="text-slate-600" />
                </div>
                <div>
                    <h3 className="font-black text-slate-900 text-[15px] tracking-tight">Inventory Ledger</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live Stock Records</p>
                </div>
            </div>
            <div className="relative w-full sm:w-72 group/search">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/search:text-primary transition-colors" />
                <input 
                    placeholder="Search by description or storer..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all placeholder:text-slate-400 font-bold text-slate-900"
                />
            </div>
        </div>
        <div className="p-2">
            <DataTable columns={columns} data={mockData} searchKey="description" />
        </div>
      </section>

      {/* Insight Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-rose-500" />
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Risk Analysis • High Priority</h4>
                </div>
                <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-tight flex items-center gap-1 group">
                    View Intelligence Hub <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { ...mockData[1], days: 24, risk: "Critical Expiry", color: "rose", storage: "Ambient" },
                    { ...mockData[0], days: 161, risk: "Maintain", color: "emerald", storage: "Cold" },
                ].map((item, idx) => (
                    <motion.div 
                        whileHover={{ y: -5 }}
                        key={idx} 
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                        <div className={cn(
                            "absolute top-0 right-0 w-1.5 h-full",
                            item.color === "rose" ? "bg-rose-500" : "bg-emerald-500"
                        )}></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center border transition-colors",
                                    item.color === "rose" ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-emerald-50 text-emerald-500 border-emerald-100"
                                )}>
                                    <AlertTriangle size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h5 className="text-[15px] font-black text-slate-900 leading-none tracking-tight group-hover:text-primary transition-colors">{item.description}</h5>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{item.storage}</span>
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{item.itemNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-5 border-t border-slate-100 flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Projected Expiry</span>
                                <span className={cn(
                                    "text-2xl font-black tabular-nums tracking-tighter mt-1",
                                    item.color === "rose" ? "text-rose-600" : "text-emerald-600"
                                )}>{item.days} <span className="text-[12px] text-slate-400">DAYS</span></span>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                item.color === "rose" ? "bg-rose-600 text-white border-rose-600" : "bg-white text-emerald-600 border-emerald-200"
                            )}>
                                {item.risk}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-2">Operational Stream</h4>
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="space-y-6 relative z-10">
                    {[
                        { label: "IB-88235", time: "2h ago", type: "inbound", op: "Admin-A" },
                        { label: "WO-11029", time: "5h ago", type: "outbound", op: "Client-B" },
                    ].map((activity, idx) => (
                        <div key={idx} className="flex gap-4 group cursor-pointer">
                            <div className={cn(
                                "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all group-hover:scale-110",
                                activity.type === "inbound" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            )}>
                                <Clock size={16} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[12px] font-black text-white tracking-tight truncate group-hover:text-primary transition-colors">{activity.type.toUpperCase()}: {activity.label}</p>
                                    <span className="text-[9px] font-black text-slate-500 whitespace-nowrap">{activity.time}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold mt-1">
                                    Processed by <span className="text-white underline decoration-slate-700 underline-offset-4">{activity.op}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 text-[10px] font-black text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-white/5 hover:border-white shadow-lg shadow-black/20">
                    VIEW FULL AUDIT LOG
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function KPICard({ 
    icon: Icon, 
    label, 
    value, 
    trend, 
    subtitle,
    color = "primary" 
}: { 
    icon: any, 
    label: string, 
    value: string, 
    trend?: string,
    subtitle?: string,
    color?: "primary" | "slate" | "blue" | "rose" | "emerald"
}) {
    const colorMap = {
        primary: "text-primary bg-primary/10 border-primary/20",
        slate: "text-slate-900 bg-slate-50 border-slate-100",
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        rose: "text-rose-600 bg-rose-50 border-rose-100",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    };

    return (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group min-w-[150px]">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-300 border", colorMap[color])}>
                    <Icon size={18} strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className="flex flex-col items-end">
                        <span className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm",
                            trend.includes("+") ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                            {trend}
                        </span>
                        <span className="text-[7px] font-black text-slate-300 uppercase mt-1 tracking-widest">MTD Change</span>
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
                <div className="flex items-baseline gap-1.5">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{value}</h4>
                    {subtitle && <span className="text-[10px] font-black text-slate-300 uppercase">{subtitle}</span>}
                </div>
            </div>
        </div>
    );
}

function HUDIndicator({ label, value, color = "emerald" }: any) {
    return (
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[140px] group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
            <div className="flex items-center justify-between relative z-10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-pulse"></div>
            </div>
            <div className="relative z-10">
                <h4 className="text-3xl font-black text-white tracking-tighter leading-none">{value}</h4>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "20%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-emerald-500"
                    />
                </div>
                <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Minimal Exposure</p>
            </div>
        </div>
    );
}
