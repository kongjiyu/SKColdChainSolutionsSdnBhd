"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ThermometerSnowflake, 
  Sun,
  Package, 
  Activity,
  AlertTriangle,
  Clock,
  Box
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function ClientDashboard() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header section with a brutalist/industrial vibe */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">ST001 - Nestle</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
            COMMAND <span className="text-primary">CENTER</span>
          </h1>
        </div>
        <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-md border border-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">System Optimal</span>
            </div>
        </div>
      </motion.div>

      {/* Main Grid - Asymmetric Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Metric 1 - Cold Storage */}
        <motion.div variants={item} className="md:col-span-4 h-full">
            <div className="h-full relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-background p-6 flex flex-col justify-between group">
                <div className="absolute -right-6 -top-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <ThermometerSnowflake size={160} className="text-blue-500" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <ThermometerSnowflake className="text-blue-500 h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-blue-500">Cold Storage</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="text-6xl font-black tracking-tighter text-foreground">842</p>
                        <p className="text-sm font-mono text-muted-foreground">Active Pallets • -18°C</p>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-blue-500/20 flex justify-between items-center relative z-10">
                    <span className="text-xs font-bold text-blue-500/80">92% CAPACITY</span>
                    <span className="text-xs font-mono text-muted-foreground">+12 this week</span>
                </div>
            </div>
        </motion.div>

        {/* Large Metric 2 - Ambient Storage */}
        <motion.div variants={item} className="md:col-span-4 h-full">
            <div className="h-full relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-background p-6 flex flex-col justify-between group">
                <div className="absolute -right-6 -top-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Sun size={160} className="text-orange-500" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <Sun className="text-orange-500 h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-orange-500">Ambient Storage</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="text-6xl font-black tracking-tighter text-foreground">320</p>
                        <p className="text-sm font-mono text-muted-foreground">Active Pallets • 24°C</p>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-orange-500/20 flex justify-between items-center relative z-10">
                    <span className="text-xs font-bold text-orange-500/80">45% CAPACITY</span>
                    <span className="text-xs font-mono text-muted-foreground">-5 this week</span>
                </div>
            </div>
        </motion.div>

        {/* Quick Stats Stack */}
        <motion.div variants={item} className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border border-border bg-card p-5 flex items-center justify-between group hover:border-primary/50 transition-colors">
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Inbound Today</p>
                    <p className="text-3xl font-black text-foreground">24</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <ArrowDownRight size={24} />
                </div>
            </div>
            <div className="flex-1 rounded-2xl border border-border bg-card p-5 flex items-center justify-between group hover:border-primary/50 transition-colors">
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Outbound Today</p>
                    <p className="text-3xl font-black text-foreground">18</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={24} />
                </div>
            </div>
            <div className="flex-1 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 flex items-center justify-between group">
                <div>
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-1">Pending Alerts</p>
                    <p className="text-3xl font-black text-destructive">2</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive group-hover:rotate-12 transition-transform">
                    <AlertTriangle size={24} />
                </div>
            </div>
        </motion.div>

        {/* Recent Activity / Ledger */}
        <motion.div variants={item} className="md:col-span-8">
            <Card className="h-full border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/20 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            Recent Operations Ledger
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 text-xs font-mono">View All</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {[
                            { id: "WR-9921", type: "Withdrawal", items: 4, status: "Processing", time: "2 hrs ago", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500/10" },
                            { id: "IB-8824", type: "Inbound", items: 12, status: "Completed", time: "5 hrs ago", icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                            { id: "WR-9920", type: "Withdrawal", items: 1, status: "Completed", time: "1 day ago", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500/10" },
                            { id: "MV-1029", type: "Relocation", items: 2, status: "Completed", time: "2 days ago", icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
                        ].map((log, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-lg ${log.bg} flex items-center justify-center ${log.color}`}>
                                        <log.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{log.id}</p>
                                        <p className="text-xs text-muted-foreground">{log.type} • {log.items} Pallet{log.items > 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground mb-1">
                                        {log.status === "Processing" ? <Clock className="h-3 w-3" /> : null}
                                        {log.status}
                                    </span>
                                    <p className="text-xs font-mono text-muted-foreground">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>

        {/* Action Center */}
        <motion.div variants={item} className="md:col-span-4">
            <Card className="h-full border-border shadow-sm bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10">
                    <Box size={200} />
                </div>
                <CardHeader className="pb-4 border-b border-primary-foreground/10 relative z-10">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        Quick Directives
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3 relative z-10">
                    <Button variant="secondary" className="w-full justify-between h-12 font-bold hover:translate-x-1 transition-transform">
                        New Withdrawal
                        <ArrowUpRight className="h-4 w-4 opacity-50" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-12 font-bold bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground hover:translate-x-1 transition-transform">
                        Schedule Inbound
                        <ArrowDownRight className="h-4 w-4 opacity-50" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-12 font-bold bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground hover:translate-x-1 transition-transform">
                        View Stock Summary
                        <Box className="h-4 w-4 opacity-50" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}
