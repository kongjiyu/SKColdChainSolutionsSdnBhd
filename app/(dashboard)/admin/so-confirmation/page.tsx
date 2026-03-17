"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCcw, 
  ExternalLink,
  Lock,
  Users,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PendingOrder {
  id: string;
  withdrawNumber: string;
  customerCode: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  remark: string;
  status: "Pending" | "Processing" | "Close";
}

const mockPendingOrders: PendingOrder[] = [
  {
    id: "WO-1001",
    withdrawNumber: "WDR-2024-001",
    customerCode: "ST001",
    customerName: "Nestle Malaysia Sdn Bhd",
    orderDate: "2024-03-10",
    deliveryDate: "2024-03-12",
    remark: "Fragile items, handle with care",
    status: "Pending",
  },
  {
    id: "WO-1002",
    withdrawNumber: "WDR-2024-002",
    customerCode: "ST002",
    customerName: "Unilever (M) Holdings",
    orderDate: "2024-03-11",
    deliveryDate: "2024-03-13",
    remark: "Urgent shipment",
    status: "Pending",
  },
  {
    id: "WO-1003",
    withdrawNumber: "WDR-2024-003",
    customerCode: "ST005",
    customerName: "F&N Dairies",
    orderDate: "2024-03-11",
    deliveryDate: "2024-03-14",
    remark: "",
    status: "Pending",
  },
];

export default function SOConfirmationPage() {
  const [selectedOrders, setSelectedOrders] = useState<PendingOrder[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMultiAdminAlert, setShowMultiAdminAlert] = useState(true);

  const columns = React.useMemo<ColumnDef<PendingOrder>[]>(() => [
    {
      accessorKey: "withdrawNumber",
      header: "Withdraw #",
      cell: ({ row }) => <span className="font-mono font-bold text-primary">{row.getValue("withdrawNumber")}</span>,
    },
    {
      accessorKey: "customerCode",
      header: "Code",
      cell: ({ row }) => <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">{row.getValue("customerCode")}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => <div className="font-medium max-w-[180px] truncate">{row.getValue("customerName")}</div>,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => <div className="font-semibold text-emerald-600">{row.getValue("deliveryDate")}</div>,
    },
    {
      accessorKey: "remark",
      header: "Remarks",
      cell: ({ row }) => <div className="text-xs text-muted-foreground italic max-w-[150px] truncate">{row.getValue("remark") || "-"}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
            status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
          )}>
            {status}
          </span>
        );
      },
    },
  ], []);

  const handleSelectionChange = React.useCallback((rows: PendingOrder[]) => {
    setSelectedOrders(rows);
  }, []);

  const handlePushToSAP = () => {
    setIsProcessing(true);
    // Simulate SAP Sync
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Successfully pushed ${selectedOrders.length} orders to SAP! Status updated to 'Close'.`);
      setSelectedOrders([]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Multi-Admin Lock Banner */}
      <AnimatePresence>
        {showMultiAdminAlert && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-destructive/10 border border-destructive/20 rounded-xl overflow-hidden"
          >
            <div className="p-4 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-destructive animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-destructive flex items-center gap-2">
                  <Lock size={14} /> MULTI-ADMIN SESSION DETECTED
                </h3>
                <p className="text-xs text-destructive/80 mt-1">
                  Admin <span className="font-bold">Ahmad (ID: AD02)</span> is currently viewing this page. 
                  To prevent data clashes in SAP, please coordinate before pushing orders.
                </p>
              </div>
              <button 
                onClick={() => setShowMultiAdminAlert(false)}
                className="text-destructive/50 hover:text-destructive transition-colors"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SO Confirmation</h2>
          <p className="text-muted-foreground text-sm">
            Review and push withdrawal requests into SAP ERP system.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <AnimatePresence>
                {selectedOrders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <Button 
                            variant="default" 
                            className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                            disabled={isProcessing}
                            onClick={handlePushToSAP}
                        >
                            {isProcessing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            Push to SAP ({selectedOrders.length})
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Button variant="outline" className="gap-2">
                <RefreshCcw size={14} /> Refresh
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Pending Orders" value="42" color="text-amber-600" />
        <StatsCard label="Last SAP Sync" value="2m ago" color="text-primary" />
        <StatsCard label="Active Admins" value="2" color="text-destructive" />
        <StatsCard label="Successful (Today)" value="156" color="text-emerald-600" />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            Live SAP Queue
        </div>
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={mockPendingOrders} 
                searchKey="customerName"
                enableSelection={true}
                onSelectionChange={handleSelectionChange}
            />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className={cn("text-2xl font-black", color)}>{value}</p>
    </div>
  );
}
