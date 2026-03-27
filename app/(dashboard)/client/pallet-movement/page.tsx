"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  History, 
  ArrowRightLeft, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MovementRecord {
  id: string;
  confirmDate: string;
  status: "In Store" | "Out";
  palletNumber: string;
  quantity: number;
  documentNumber: string;
  type: "Inbound" | "Outbound";
}

const mockMovements: MovementRecord[] = [
  {
    id: "M1",
    confirmDate: "2024-03-12 14:30",
    status: "Out",
    palletNumber: "PAL-12626",
    quantity: 132,
    documentNumber: "WDR-2024-001",
    type: "Outbound",
  },
  {
    id: "M2",
    confirmDate: "2024-03-11 09:15",
    status: "In Store",
    palletNumber: "PAL-12626",
    quantity: 132,
    documentNumber: "IB-88219",
    type: "Inbound",
  },
  {
    id: "M3",
    confirmDate: "2024-03-10 16:45",
    status: "Out",
    palletNumber: "PAL-10029",
    quantity: 60,
    documentNumber: "WDR-2024-002",
    type: "Outbound",
  },
  {
    id: "M4",
    confirmDate: "2024-03-08 11:20",
    status: "In Store",
    palletNumber: "PAL-10029",
    quantity: 132,
    documentNumber: "IB-88110",
    type: "Inbound",
  },
];

export default function PalletMovementPage() {
  const columns: ColumnDef<MovementRecord>[] = [
    {
      accessorKey: "confirmDate",
      header: "Confirm Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs font-medium">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            {row.getValue("confirmDate")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isIn = status === "In Store";
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center",
                isIn ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
            )}>
                {isIn ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
            </div>
            <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isIn ? "text-emerald-700" : "text-amber-700"
            )}>
                {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "palletNumber",
      header: "Pallet Number",
      cell: ({ row }) => <span className="font-sans font-bold text-primary">{row.getValue("palletNumber")}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <span className="font-bold">{row.getValue("quantity")}</span>,
    },
    {
      accessorKey: "documentNumber",
      header: "Document Number",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
            <ClipboardList className="h-3.5 w-3.5" />
            <span className="text-xs">{row.getValue("documentNumber")}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight">Pallet Movement</h2>
          <p className="text-muted-foreground text-sm">
            Complete historical ledger of all stock inbound and outbound transactions.
          </p>
        </div>
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <History size={18} className="sm:h-6 sm:w-6" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <SummaryCard 
            label="Total Inbound (MTD)" 
            value="1,240" 
            sub="Pallets received this month" 
            icon={ArrowDownLeft}
            color="text-emerald-600"
        />
        <SummaryCard 
            label="Total Outbound (MTD)" 
            value="892" 
            sub="Pallets withdrawn this month" 
            icon={ArrowUpRight}
            color="text-amber-600"
        />
        <div className="col-span-2 md:col-span-1">
          <SummaryCard 
              label="Net Change" 
              value="+348" 
              sub="Inventory growth trend" 
              icon={ArrowRightLeft}
              color="text-primary"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Transaction Ledger
        </div>
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={mockMovements} 
                searchKey="palletNumber" 
            />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, sub, icon: Icon, color }: any) {
    return (
    <div className="p-3 sm:p-4 bg-card border border-border rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{label}</p>
        <Icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", color)} />
            </div>
      <p className={cn("text-xl sm:text-2xl font-black mb-1 leading-none", color)}>{value}</p>
      <p className="text-[9px] sm:text-[10px] text-muted-foreground italic">{sub}</p>
        </div>
    );
}
