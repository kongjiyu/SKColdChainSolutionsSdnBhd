"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  UserCircle, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Key, 
  Save, 
  CheckCircle2,
  AlertTriangle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  invoiceDetails: z.string().min(1, "Invoice details are required"),
  phone: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  officeAddress: z.string().min(1, "Office address is required"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      invoiceDetails: "Nestle Malaysia Sdn Bhd (HQ)",
      phone: "+603-7965 6000",
      email: "logistics@nestle.com.my",
      officeAddress: "Levels 10 - 15, Menara Surian, No. 1, Jalan PJU 7/3, Mutiara Damansara, 47810 Petaling Jaya, Selangor",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile Data:", data);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log("Password Data:", data);
    alert("Password updated successfully!");
    passwordForm.reset();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Account Profile</h2>
          <p className="text-muted-foreground text-sm">
            Manage your company information and security settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold">Nestle Malaysia</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Account ID: ST001</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Company Information
              </CardTitle>
              <CardDescription>
                These details will appear on your inbound and outbound documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceDetails">Invoice Billing Details</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea 
                      id="invoiceDetails" 
                      className="w-full min-h-[100px] pl-10 pr-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      {...profileForm.register("invoiceDetails")}
                    />
                  </div>
                  {profileForm.formState.errors.invoiceDetails && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.invoiceDetails.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Contact Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="phone" className="pl-10" {...profileForm.register("phone")} />
                        </div>
                        {profileForm.formState.errors.phone && (
                            <p className="text-xs text-destructive">{profileForm.formState.errors.phone.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="email" type="email" className="pl-10" {...profileForm.register("email")} />
                        </div>
                        {profileForm.formState.errors.email && (
                            <p className="text-xs text-destructive">{profileForm.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeAddress">Office Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea 
                      id="officeAddress" 
                      className="w-full min-h-[80px] pl-10 pr-3 py-2 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      {...profileForm.register("officeAddress")}
                    />
                  </div>
                  {profileForm.formState.errors.officeAddress && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.officeAddress.message}</p>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="bg-secondary/20 flex items-center justify-between py-4">
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-emerald-600 text-sm font-bold"
                        >
                            <CheckCircle2 size={16} />
                            Changes saved successfully!
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button type="submit" form="profile-form" className="gap-2 ml-auto">
                    <Save size={16} /> Save Changes
                </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Security Section */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-destructive/5 border-b border-destructive/10">
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <Key className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Update your account password regularly.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" {...passwordForm.register("currentPassword")} />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-xs text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" {...passwordForm.register("confirmPassword")} />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button type="submit" variant="destructive" className="w-full gap-2 mt-4">
                    Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-800">Critical Note</p>
                  <p className="text-[10px] leading-relaxed text-amber-700">
                    If you change your email address, you will need to re-verify your account to access 3PL documents and SAP notifications.
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
