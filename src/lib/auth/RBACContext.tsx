"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/types/rbac";

interface AuthContextType {
  currentUser: User | null;
  login: (role: Role) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for an existing session on mount
    const storedUser = localStorage.getItem("homeliocare_mock_user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role) => {
    let mockUser: User;
    if (role === "CAREGIVER") {
      mockUser = {
        id: "cg-101",
        name: "Maria Santos, CNA",
        email: "maria.santos@homeliocare.com",
        role: "CAREGIVER",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      };
    } else if (role === "SCHEDULER") {
      mockUser = {
        id: "sched-201",
        name: "Alex Rivera",
        email: "alex.rivera@homeliocare.com",
        role: "SCHEDULER",
        avatarUrl: "",
      };
    } else if (role === "HR") {
      mockUser = {
        id: "hr-301",
        name: "Sarah Jenkins",
        email: "sarah.jenkins@homelio.com",
        role: "HR",
        avatarUrl: "",
      };
    } else if (role === "ADMIN") {
      mockUser = {
        id: "admin-[#1]",
        name: "Eleanor Vance, Executive Director",
        email: "admin@homeliocare.com",
        role: "ADMIN",
        avatarUrl: "",
      };
    } else {
      mockUser = {
        id: `mock-${role.toLowerCase()}-123`,
        name: `Mock ${role.charAt(0) + role.slice(1).toLowerCase()} User`,
        email: `${role.toLowerCase()}@homeliocare.com`,
        role: role,
      };
    }
    setCurrentUser(mockUser);
    localStorage.setItem("homeliocare_mock_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("homeliocare_mock_user");
  };

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
