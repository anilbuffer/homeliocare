"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, UserCircle, HeartHandshake, KeyRound, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/rbac";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<Role>("ADMIN");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay for premium feel
    setTimeout(() => {
      login(selectedRole);
      setIsLoading(false);
      
      // Route based on role
      if (selectedRole === "ADMIN") {
        router.push("/dashboard");
      } else if (selectedRole === "CLIENT") {
        router.push("/portal");
      } else if (selectedRole === "CAREGIVER") {
        router.push("/caregiver");
      } else {
        router.push("/dashboard");
      }
    }, 800);
  };

  const roleOptions: { role: Role; icon: React.ReactNode; label: string; desc: string }[] = [
    { role: "ADMIN", icon: <ShieldCheck className="w-5 h-5" />, label: "Admin", desc: "Access agency dashboard & staff tools" },
    { role: "CAREGIVER", icon: <HeartHandshake className="w-5 h-5" />, label: "Caregiver (Field Staff)", desc: "Access visit EVV, schedule & tasks" },
    { role: "CLIENT", icon: <UserCircle className="w-5 h-5" />, label: "Family / Client", desc: "Access the family portal" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sidebar-bg/10 blur-[100px]" />
        <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-teal/10 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-surface rounded-2xl shadow-xl border border-border-subtle overflow-hidden">
          <div className="p-8 text-center bg-gradient-to-b from-brand-teal/5 to-transparent">
            <div className="w-16 h-16 bg-brand-teal rounded-xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-brand-teal/30">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">Welcome Back</h1>
            <p className="text-text-secondary text-sm">Sign in to continue to Homeliocare</p>
          </div>

          <div className="p-8 pt-0">
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-primary block">
                  Select your role to continue
                </label>
                <div className="grid gap-3">
                  {roleOptions.map((option) => (
                    <button
                      key={option.role}
                      type="button"
                      onClick={() => setSelectedRole(option.role)}
                      className={`flex items-start p-4 border rounded-xl transition-all duration-200 text-left ${
                        selectedRole === option.role 
                          ? "border-brand-teal bg-brand-teal/5 ring-1 ring-brand-teal" 
                          : "border-border-subtle hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`mt-0.5 shrink-0 ${selectedRole === option.role ? "text-brand-teal" : "text-gray-400"}`}>
                        {option.icon}
                      </div>
                      <div className="ml-3">
                        <div className={`font-medium text-sm ${selectedRole === option.role ? "text-text-primary" : "text-text-secondary"}`}>
                          {option.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${selectedRole === option.role ? "text-brand-teal/80" : "text-gray-400"}`}>
                          {option.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Inputs to make it look real */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <div>
                  <input 
                    type="email" 
                    placeholder="Email address (mock)" 
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-border-subtle rounded-lg text-sm text-text-secondary cursor-not-allowed focus:outline-none"
                    defaultValue="demo@homeliocare.com"
                  />
                </div>
                <div>
                  <input 
                    type="password" 
                    placeholder="Password (mock)" 
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-border-subtle rounded-lg text-sm text-text-secondary cursor-not-allowed focus:outline-none"
                    defaultValue="********"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm shadow-brand-teal/20"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-text-secondary mt-6">
          &copy; {new Date().getFullYear()} Homeliocare. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
