"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Box, 
  ArrowUpRight, 
  History, 
  UserCircle, 
  Users, 
  FileCheck, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Package,
  Truck,
  CreditCard,
  Settings,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 group relative",
          active 
            ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" 
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <Icon className={cn(
          "h-[17px] w-[17px] shrink-0 transition-colors duration-300", 
          active ? "text-primary" : "text-slate-400 group-hover:text-primary"
        )} />
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={cn(
                "text-[13px] whitespace-nowrap transition-all duration-300",
                active ? "font-bold tracking-tight" : "font-semibold"
              )}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        {active && !collapsed && (
          <motion.div 
            layoutId="active-pill"
            className="absolute left-0 w-0.5 h-4 bg-primary rounded-full"
          />
        )}
        {collapsed && (
          <div className="absolute left-14 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 shadow-xl z-50 whitespace-nowrap translate-x-2 group-hover:translate-x-0">
            {label}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const clientLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/client" },
    { icon: Box, label: "Stock Summary", href: "/client/stock-summary" },
    { icon: ArrowUpRight, label: "Withdraw Request", href: "/client/withdraw" },
    { icon: History, label: "Withdraw History", href: "/client/withdraw-list" },
    { icon: History, label: "Pallet Movement", href: "/client/pallet-movement" },
    { icon: UserCircle, label: "Profile", href: "/client/profile" },
  ];

  const adminLinks = [
    { icon: Users, label: "User Management", href: "/admin/users" },
    { icon: Box, label: "Global Stock", href: "/admin/stock-summary" },
    { icon: ArrowUpRight, label: "All Withdrawals", href: "/admin/withdraw-requests" },
    { icon: FileCheck, label: "SO Confirmation", href: "/admin/so-confirmation" },
  ];

  const futureLinks = [
    { icon: Package, label: "Inbound / Packing", href: "#" },
    { icon: Truck, label: "Logistics", href: "#" },
    { icon: CreditCard, label: "Billing", href: "#" },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans antialiased text-slate-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className={cn(
          "relative flex flex-col border-r border-slate-200 bg-white z-40 transition-all duration-500 ease-in-out",
          collapsed ? "items-center" : ""
        )}
      >
        <div className={cn("p-6 flex items-center gap-3", collapsed ? "justify-center px-2" : "")}>
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 transform transition-transform hover:rotate-3 duration-300">
            <Box className="h-5.5 w-5.5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-black text-sm tracking-tight leading-tight text-slate-900">SK COLD CHAIN</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em]">Logistics Solutions</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3.5 space-y-6 py-2 scrollbar-hide">
          <div className="space-y-1">
            <SidebarHeader label="Operations" collapsed={collapsed} />
            {clientLinks.map((link) => (
              <SidebarItem 
                key={link.href} 
                {...link} 
                active={pathname === link.href} 
                collapsed={collapsed} 
              />
            ))}
          </div>

          <div className="space-y-1">
            <SidebarHeader label="Management" collapsed={collapsed} />
            {adminLinks.map((link) => (
              <SidebarItem 
                key={link.href} 
                {...link} 
                active={pathname === link.href} 
                collapsed={collapsed} 
              />
            ))}
          </div>

          <div className="space-y-1">
            <SidebarHeader label="Extensions" collapsed={collapsed} />
            {futureLinks.map((link) => (
              <div key={link.label} className="opacity-40 grayscale pointer-events-none">
                <SidebarItem 
                  {...link} 
                  active={false} 
                  collapsed={collapsed} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
          <SidebarItem icon={LogOut} label="Sign Out" href="/login" collapsed={collapsed} />
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 h-6 w-6 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-all duration-300 shadow-sm z-50 group"
        >
          {collapsed ? <ChevronRight size={12} className="text-slate-400 group-hover:text-primary transition-colors" /> : <ChevronLeft size={12} className="text-slate-400 group-hover:text-primary transition-colors" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Main</span>
              <span className="text-slate-300 font-light">/</span>
              <span className="text-slate-900 font-black">{pathname.split('/').pop()?.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
                <button className="relative h-9 w-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all duration-300 text-slate-500 hover:text-primary group">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>
                <button className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all duration-300 text-slate-500 hover:text-primary">
                    <Settings size={18} />
                </button>
            </div>
            
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            
            <button className="flex items-center gap-3 pl-2 py-1 transition-all duration-300 group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors">John Doe</span>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">ST001 • Nestle</span>
              </div>
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-primary/30 transition-colors">
                <UserCircle className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#F1F5F9] relative">
          <div className="p-6 max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarHeader({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return <div className="h-px bg-slate-100 my-4 mx-3" />;
  return (
    <h3 className="px-3.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 mt-4">
      {label}
    </h3>
  );
}
