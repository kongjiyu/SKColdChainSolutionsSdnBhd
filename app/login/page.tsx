"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Lock, 
  User, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"client" | "admin">("client");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (loginType === "admin") {
      router.push("/admin/users");
    } else {
      router.push("/client/stock-summary");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 relative overflow-hidden">
      {/* Abstract Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 mb-4">
            <Box className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">
            SK Cold Chain
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase">
            Solutions Sdn Bhd
          </p>
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
                <div className="inline-flex p-1 bg-secondary/50 rounded-lg border border-border">
                    <button 
                        onClick={() => setLoginType("client")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                            loginType === "client" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Client Portal
                    </button>
                    <button 
                        onClick={() => setLoginType("admin")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                            loginType === "admin" ? "bg-card text-destructive shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Admin Portal
                    </button>
                </div>
            </div>
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Please enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID / Account Code</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="userId" 
                    placeholder="e.g. ST001" 
                    className={cn("pl-10", errors.userId && "border-destructive")}
                    {...register("userId")}
                  />
                </div>
                {errors.userId && (
                  <p className="text-xs text-destructive font-medium">{errors.userId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className={cn("pl-10", errors.password && "border-destructive")}
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive font-medium">{errors.password.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className={cn(
                    "w-full font-bold h-11 transition-all",
                    loginType === "admin" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                )} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <ShieldCheck className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Authenticating..." : `Login as ${loginType === "admin" ? "Admin" : "Client"}`}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-card px-2 text-muted-foreground">3PL Management System</span>
              </div>
            </div>
            <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
              By logging in, you agree to our Terms of Service and Privacy Policy.<br />
              Connected to SAP ERP Central Component.
            </p>
          </CardFooter>
        </Card>
        
        <p className="mt-8 text-center text-xs text-muted-foreground font-medium">
          Need help? <span className="text-primary hover:underline cursor-pointer">Contact SK Warehouse Support</span>
        </p>
      </motion.div>
    </div>
  );
}
