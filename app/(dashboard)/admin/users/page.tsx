"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { 
  Plus, 
  UserPlus, 
  Key, 
  Settings2, 
  MoreVertical,
  ShieldCheck,
  Building2,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface UserAccount {
  id: string;
  customerCode: string;
  customerName: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

const mockUsers: UserAccount[] = [
  {
    id: "1",
    customerCode: "ST001",
    customerName: "Nestle Malaysia Sdn Bhd",
    email: "logistics@nestle.com",
    phone: "+603-7965 6000",
    status: "Active",
  },
  {
    id: "2",
    customerCode: "ST002",
    customerName: "Unilever (M) Holdings",
    email: "supplychain@unilever.com",
    phone: "+603-2246 2188",
    status: "Active",
  },
  {
    id: "3",
    customerCode: "ST005",
    customerName: "F&N Dairies",
    email: "warehouse@fn.com.my",
    phone: "+603-9235 2288",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  const columns: ColumnDef<UserAccount>[] = [
    {
      accessorKey: "customerCode",
      header: "Account Code",
      cell: ({ row }) => <span className="font-sans font-bold text-primary">{row.getValue("customerCode")}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.getValue("customerName")}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contact",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
          row.getValue("status") === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
        )}>
          {row.getValue("status")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-primary hover:text-primary hover:bg-primary/10"
            onClick={() => {
              setSelectedUser(row.original);
              setIsResetOpen(true);
            }}
          >
            <Key size={14} /> Reset PWD
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground text-sm">
            Manage customer accounts and access credentials.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus size={16} /> Create New Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Customer Account</DialogTitle>
              <DialogDescription>
                Add a new 3PL customer to the portal.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Code</Label>
                  <Input placeholder="e.g. ST001" />
                </div>
                <div className="space-y-2">
                  <Label>Initial Password</Label>
                  <Input type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input placeholder="Full company name" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="logistics@company.com" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <StatsCard icon={Building2} label="Total Accounts" value="128" />
        <StatsCard icon={ShieldCheck} label="Active Sessions" value="24" />
        <div className="col-span-2 md:col-span-1">
          <StatsCard icon={Key} label="Password Resets (24h)" value="5" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
          <DataTable 
            columns={columns} 
            data={mockUsers} 
            searchKey="customerName" 
          />
        </div>
      </div>

      {/* Reset Password Dialog */}
      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Assign a new temporary password for <span className="font-bold text-foreground">{selectedUser?.customerName}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Min 8 characters" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" />
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700">
                User will be prompted to change their password on the next login.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setIsResetOpen(false)}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="p-3 sm:p-4 bg-card border border-border rounded-xl shadow-sm flex items-center gap-3 sm:gap-4">
      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={16} className="sm:h-5 sm:w-5" />
      </div>
      <div>
        <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{label}</p>
        <p className="text-lg sm:text-xl font-bold leading-none">{value}</p>
      </div>
    </div>
  );
}
