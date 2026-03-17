"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  ArrowLeft, 
  Box, 
  Database, 
  Calendar,
  Layers,
  Archive,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PalletDetail {
  palletNumber: string;
  quantity: number;
  status: string;
  location: string;
}

const mockPalletData: PalletDetail[] = [
  { palletNumber: "PAL-12626", quantity: 132, status: "In Store", location: "A-01-02" },
  { palletNumber: "PAL-12627", quantity: 132, status: "In Store", location: "A-01-03" },
  { palletNumber: "PAL-12628", quantity: 132, status: "In Store", location: "A-01-04" },
  { palletNumber: "PAL-12629", quantity: 68, status: "In Store", location: "A-01-05" },
  { palletNumber: "PAL-12701", quantity: 132, status: "In Store", location: "B-04-01" },
  { palletNumber: "PAL-12702", quantity: 132, status: "In Store", location: "B-04-02" },
];

export default function StockDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const columns: ColumnDef<PalletDetail>[] = [
    {
      accessorKey: "palletNumber",
      header: "Pallet Number",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary/5 flex items-center justify-center">
                <Archive className="h-4 w-4 text-primary" />
            </div>
            <span className="font-mono font-bold">{row.getValue("palletNumber")}</span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity (Cartons)",
      cell: ({ row }) => (
        <div className="text-lg font-black text-primary">
            {row.getValue("quantity")}
        </div>
      ),
    },
    {
        accessorKey: "location",
        header: "Rack Location",
        cell: ({ row }) => <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">{row.getValue("location")}</span>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                {row.getValue("status")}
            </span>
        ),
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Stock Summary
        </button>
        
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Box className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Nestle Milo 1kg (Cold)</h2>
                    <p className="text-muted-foreground text-sm font-mono uppercase tracking-tighter">
                        Item ID: {itemId} • Category: Beverage
                    </p>
                </div>
            </div>
            <Button variant="outline" className="gap-2">
                <Download size={14} /> Export Pallet List
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailCard icon={Layers} label="Total Pallets" value="6" />
        <DetailCard icon={Database} label="Total Quantity" value="728" />
        <DetailCard icon={Calendar} label="Last Movement" value="12 Mar 2024" />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Pallet Breakdown Ledger
        </div>
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={mockPalletData} 
                searchKey="palletNumber" 
            />
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <Icon size={120} />
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className="text-3xl font-black text-foreground">{value}</p>
    </div>
  );
}
