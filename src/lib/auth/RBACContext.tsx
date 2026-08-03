"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/types/rbac";
import { useRBAC } from "@/lib/rbac/rbacStore";
import { SEED_USERS } from "@/lib/rbac/seedData";

interface AuthContextType {
  currentUser: User | null;
  login: (role: Role) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { users } = useRBAC();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for an existing session on mount
    const storedUserId = localStorage.getItem("homeliocare_mock_user_id");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role) => {
    let targetRoleId = "super_admin";
    if (role === "SCHEDULER") targetRoleId = "scheduler_dispatcher";
    else if (role === "HR") targetRoleId = "hr_mgr_recruiter";
    else if (role === "CAREGIVER") targetRoleId = "caregiver_field";
    else if (role === "CLIENT") targetRoleId = "portal_client";
    else if (role === "FAMILY") targetRoleId = "portal_client"; // Same backend mock user for now, but UI will diverge
    else if (role === "INTAKE_COORDINATOR") targetRoleId = "care_intake_coord";
    else if (role === "BILLING_FINANCE_STAFF") targetRoleId = "billing_finance_staff";
    else if (role === "CLINICAL_SUPERVISOR_RN") targetRoleId = "clinical_supervisor_rn";
    else if (role === "QA_COMPLIANCE_OFFICER") targetRoleId = "qa_compliance_officer";
    else if (role === "PARTNER") targetRoleId = "portal_client"; // Temporarily use portal_client or similar for mock user

    let matchingUser = users.find(u => u.role_id === targetRoleId);
    if (!matchingUser) {
      matchingUser = SEED_USERS.find(u => u.role_id === targetRoleId);
    }
    
    if (matchingUser) {
      setCurrentUserId(matchingUser.id);
      localStorage.setItem("homeliocare_mock_user_id", matchingUser.id);
      localStorage.setItem("homeliocare_mock_user_role", role);
    }
  };

  const logout = () => {
    setCurrentUserId(null);
    localStorage.removeItem("homeliocare_mock_user_id");
    localStorage.removeItem("homeliocare_mock_user_role");
  };

  let matchedUser = users.find(u => u.id === currentUserId);
  if (!matchedUser && currentUserId) {
    matchedUser = SEED_USERS.find(u => u.id === currentUserId);
  }
  const roleFromStorage = (typeof window !== 'undefined' ? localStorage.getItem("homeliocare_mock_user_role") : "ADMIN") as Role || "ADMIN";
  
  const currentUser: User | null = matchedUser ? {
    id: matchedUser.id,
    name: matchedUser.name,
    email: matchedUser.email,
    role: roleFromStorage,
    role_id: matchedUser.role_id,
    avatarUrl: ""
  } : null;

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
