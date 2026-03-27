"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Package, 
  Info,
  ChevronDown,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const withdrawSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  remarks: z.string().optional(),
  unifiedDeliveryDate: z.boolean().default(false),
  globalDeliveryDate: z.string().optional(),
  items: z.array(z.object({
    itemId: z.string().min(1, "Item is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    deliveryDate: z.string().min(1, "Delivery date is required"),
    // Read-only metadata
    containerNo: z.string(),
    expiryDate: z.string(),
    inboundDoc: z.string(),
  })).min(1, "At least one item is required"),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export default function WithdrawRequestPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      vehicleNumber: "",
      remarks: "",
      unifiedDeliveryDate: false,
      items: [
        { 
          itemId: "", 
          quantity: 0, 
          deliveryDate: "", 
          containerNo: "CNTR-10293", 
          expiryDate: "2026-12-15", 
          inboundDoc: "IB-88219" 
        }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const isUnified = watch("unifiedDeliveryDate");
  const globalDate = watch("globalDeliveryDate");

  const onSubmit = (data: WithdrawFormValues) => {
    console.log("Withdraw Request Data:", data);
    alert("Request submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Withdraw Request</h2>
        <p className="text-muted-foreground text-sm">
          Create a new request to withdraw stock from the warehouse.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card border border-border rounded-xl shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Number (Car Plate)</Label>
            <Input 
              id="vehicleNumber" 
              placeholder="e.g. ABC 1234" 
              {...register("vehicleNumber")}
              className={errors.vehicleNumber ? "border-destructive" : ""}
            />
            {errors.vehicleNumber && (
              <p className="text-xs text-destructive">{errors.vehicleNumber.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input id="remarks" placeholder="Optional" {...register("remarks")} />
          </div>
        </div>

        {/* Unified Date Selection */}
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Unified Delivery Date</p>
                <p className="text-xs text-muted-foreground">Apply one date to all items in this request.</p>
              </div>
            </div>
            <label htmlFor="unifiedDeliveryDate" className="flex items-center gap-2 shrink-0 cursor-pointer">
              <input
                type="checkbox"
                id="unifiedDeliveryDate"
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("unifiedDeliveryDate")}
              />
            </label>
          </div>

          {isUnified && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="pl-0 sm:pl-13"
            >
              <Input
                type="date"
                className="w-full sm:w-52"
                {...register("globalDeliveryDate")}
                onChange={(e) => {
                  const date = e.target.value;
                  setValue("globalDeliveryDate", date);
                  fields.forEach((_, index) => setValue(`items.${index}.deliveryDate`, date));
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Items to Withdraw</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => append({ 
                itemId: "", 
                quantity: 1, 
                deliveryDate: globalDate || "", 
                containerNo: "CNTR-MOCK", 
                expiryDate: "N/A", 
                inboundDoc: "N/A" 
              })}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {fields.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">No Items Added</h4>
                    <p className="text-xs text-slate-500 max-w-sm mb-4">
                        You have not added any items to this withdrawal request yet. Click the "Add Item" button above to get started.
                    </p>
                    <Button 
                      type="button" 
                      onClick={() => append({ 
                        itemId: "", 
                        quantity: 1, 
                        deliveryDate: globalDate || "", 
                        containerNo: "CNTR-MOCK", 
                        expiryDate: "N/A", 
                        inboundDoc: "N/A" 
                      })}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add First Item
                    </Button>
                </div>
            ) : (
                fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group p-6 bg-card border border-border rounded-xl shadow-sm hover:border-primary/20 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Item / Batch Selection</Label>
                        <Controller
                          control={control}
                          name={`items.${index}.itemId` as const}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="h-10 px-4 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm w-full">
                                <SelectValue placeholder="Select Item..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ITEM-9921" className="text-sm font-medium cursor-pointer">
                                  Nestle Milo 1kg (Batch A)
                                </SelectItem>
                                <SelectItem value="ITEM-4421" className="text-sm font-medium cursor-pointer">
                                  Maggi Curry (Batch B)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.items?.[index]?.itemId && (
                          <p className="text-xs text-destructive">{errors.items[index]?.itemId?.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Delivery Date</Label>
                        <Input 
                          type="date" 
                          disabled={isUnified}
                          {...register(`items.${index}.deliveryDate` as const)}
                        />
                      </div>
                    </div>

                    {/* Read-only Metadata Grid */}
                    <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Container Number</span>
                        <span className="text-sm font-medium">{watch(`items.${index}.containerNo`)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Inbound Doc #</span>
                        <span className="text-sm font-medium">{watch(`items.${index}.inboundDoc`)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Expiry Date</span>
                        <span className={cn(
                          "text-sm font-bold",
                          watch(`items.${index}.expiryDate`).includes("2025") ? "text-destructive" : "text-emerald-600"
                        )}>
                          {watch(`items.${index}.expiryDate`)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 pt-4 border-t border-border">
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="submit" className="gap-2 px-8">
            Submit Request <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
