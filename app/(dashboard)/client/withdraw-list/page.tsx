"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  FileText, 
  ExternalLink, 
  Eye, 
  Download,
  Calendar,
  Truck,
  ArrowUpDown,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WithdrawOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  vehicleNumber: string;
  totalItems: number;
  totalQuantity: number;
  status: "Pending" | "Ready" | "Close" | "Cancel";
}

const mockOrders: WithdrawOrder[] = [
  {
    id: "1",
    orderNumber: "WDR-2024-001",
    orderDate: "2024-03-10",
    deliveryDate: "2024-03-12",
    vehicleNumber: "WEE 1234",
    totalItems: 3,
    totalQuantity: 450,
    status: "Close",
  },
  {
    id: "2",
    orderNumber: "WDR-2024-002",
    orderDate: "2024-03-11",
    deliveryDate: "2024-03-13",
    vehicleNumber: "VAB 5562",
    totalItems: 1,
    totalQuantity: 1200,
    status: "Ready",
  },
  {
    id: "3",
    orderNumber: "WDR-2024-003",
    orderDate: "2024-03-12",
    deliveryDate: "2024-03-15",
    vehicleNumber: "PKR 8821",
    totalItems: 2,
    totalQuantity: 300,
    status: "Pending",
  },
  {
    id: "4",
    orderNumber: "WDR-2024-004",
    orderDate: "2024-03-12",
    deliveryDate: "2024-03-16",
    vehicleNumber: "BMS 1029",
    totalItems: 1,
    totalQuantity: 60,
    status: "Cancel",
  },
  {
    id: "5",
    orderNumber: "WDR-2024-005",
    orderDate: "2024-03-13",
    deliveryDate: "2024-03-18",
    vehicleNumber: "JQL 7721",
    totalItems: 4,
    totalQuantity: 980,
    status: "Ready",
  },
  {
    id: "6",
    orderNumber: "WDR-2024-006",
    orderDate: "2024-03-14",
    deliveryDate: "2024-03-19",
    vehicleNumber: "NCE 4108",
    totalItems: 2,
    totalQuantity: 240,
    status: "Pending",
  },
];

export default function WithdrawListPage() {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const handleExport = (format: "excel" | "pdf") => {
    console.log("Exporting client withdraw history as", format);
    setIsExportDialogOpen(false);
  };
  const columns: ColumnDef<WithdrawOrder>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order Details",
      cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="font-sans font-bold text-primary tracking-tighter">
                {row.getValue("orderNumber")}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
                {row.original.totalItems} Items • {row.original.totalQuantity} Cartons
            </span>
        </div>
      ),
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ORDER DATE
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => <div className="text-muted-foreground text-[13px]">{row.getValue("orderDate")}</div>,
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {row.getValue("deliveryDate")}
        </div>
      ),
    },
    {
      accessorKey: "vehicleNumber",
      header: "Vehicle #",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-sans text-[13px]">
            <Truck className="h-3.5 w-3.5 text-muted-foreground" />
            {row.getValue("vehicleNumber")}
        </div>
      ),
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
          <motion.span
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
              colors[status as keyof typeof colors]
            )}
          >
            {status}
          </motion.span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                <FileText size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                <Download size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10 transition-colors">
                <Eye size={16} />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Withdraw History</h2>
          <p className="text-muted-foreground text-sm">
            Review and track all your warehouse withdrawal requests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                  <Download size={14} /> Export Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Export withdraw history</DialogTitle>
                <DialogDescription>
                  Choose a format to download your withdraw history.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  onClick={() => handleExport("excel")}
                  className="w-full justify-between h-10 text-[11px] font-black"
                >
                  <span>Export as Excel (.xlsx)</span>
                  <Download size={14} className="opacity-80" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport("pdf")}
                  className="w-full justify-between h-10 text-[11px] font-black"
                >
                  <span>Export as PDF (.pdf)</span>
                  <Download size={14} className="text-slate-400" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <OrderStats label="Total Requests" value="128" color="bg-primary/10 text-primary" />
        <OrderStats label="Pending Processing" value="12" color="bg-amber-100 text-amber-600" />
        <OrderStats label="Ready for Collection" value="5" color="bg-blue-100 text-blue-600" />
        <OrderStats label="Completed Orders" value="111" color="bg-emerald-100 text-emerald-600" />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={mockOrders} 
                searchKey="orderNumber" 
            />
        </div>
      </div>
    </div>
  );
}

function OrderStats({ label, value, color }: { label: string, value: string, color: string }) {
  return (
  <div className="p-3 sm:p-4 bg-card border border-border rounded-xl shadow-sm">
    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{label}</p>
    <div className="flex items-center gap-2 sm:gap-3">
      <p className="text-xl sm:text-2xl font-black text-foreground leading-none">{value}</p>
      <div className={cn("px-1 py-0.5 sm:px-1.5 rounded text-[7px] sm:text-[8px] font-bold uppercase tracking-tighter", color)}>
                Stats Live
            </div>
        </div>
    </div>
  );
}
