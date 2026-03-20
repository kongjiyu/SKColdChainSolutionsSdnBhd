"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  ClipboardList, 
  ExternalLink, 
  Eye, 
  Download,
  Calendar,
  Building2,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AdminWithdrawOrder {
  id: string;
  withdrawNumber: string;
  customerCode: string;
  customerName: string;
  orderDate: string;
  remark: string;
  status: "Pending" | "Ready" | "Close" | "Cancel";
}

const mockGlobalOrders: AdminWithdrawOrder[] = [
  {
    id: "1",
    withdrawNumber: "WDR-2024-001",
    customerCode: "ST001",
    customerName: "Nestle Malaysia Sdn Bhd",
    orderDate: "2024-03-10",
    remark: "Deliver to North Hub",
    status: "Close",
  },
  {
    id: "2",
    withdrawNumber: "WDR-2024-002",
    customerCode: "ST002",
    customerName: "Unilever (M) Holdings",
    orderDate: "2024-03-11",
    remark: "Urgent: Stock replenishment",
    status: "Ready",
  },
  {
    id: "3",
    withdrawNumber: "WDR-2024-005",
    customerCode: "ST005",
    customerName: "F&N Dairies",
    orderDate: "2024-03-12",
    remark: "",
    status: "Pending",
  },
];

export default function AdminWithdrawListPage() {
  const columns: ColumnDef<AdminWithdrawOrder>[] = [
    {
      accessorKey: "withdrawNumber",
      header: "Withdraw #",
      cell: ({ row }) => <span className="font-sans font-bold text-primary">{row.getValue("withdrawNumber")}</span>,
    },
    {
      accessorKey: "customerCode",
      header: "Code",
      cell: ({ row }) => <span className="text-xs font-bold bg-secondary px-2 py-0.5 rounded">{row.getValue("customerCode")}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      cell: ({ row }) => <div className="font-medium max-w-[200px] truncate">{row.getValue("customerName")}</div>,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
    },
    {
      accessorKey: "remark",
      header: "Remarks",
      cell: ({ row }) => <div className="text-xs text-muted-foreground italic truncate max-w-[150px]">{row.getValue("remark") || "-"}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const colors = {
          Pending: "bg-amber-100 text-amber-700 border-amber-200",
          Ready: "bg-blue-100 text-blue-700 border-blue-200",
          Close: "bg-emerald-100 text-emerald-700 border-emerald-200",
          Cancel: "bg-rose-100 text-rose-700 border-rose-200",
        };
        return (
          <span className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            colors[status as keyof typeof colors]
          )}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10 transition-colors">
                <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary transition-colors">
                <ExternalLink size={16} />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Global Withdraw Requests</h2>
          <p className="text-muted-foreground text-sm">
            Overview of all incoming withdrawal orders from all clients.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
                <Download size={14} /> Global Export
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard icon={Clock} label="Pending Sync" value="14" color="text-amber-600" />
        <StatusCard icon={CheckCircle2} label="Ready to Collect" value="28" color="text-blue-600" />
        <StatusCard icon={ClipboardList} label="Closed (Today)" value="156" color="text-emerald-600" />
        <StatusCard icon={AlertCircle} label="Cancellations" value="2" color="text-rose-600" />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            All Orders Ledger
        </div>
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={mockGlobalOrders} 
                searchKey="customerName" 
            />
        </div>
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-1">
            <div className={cn("p-1.5 rounded-lg bg-secondary/50", color)}>
                <Icon size={14} />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{label}</p>
        </div>
        <p className={cn("text-2xl font-black", color)}>{value}</p>
    </div>
  );
}
