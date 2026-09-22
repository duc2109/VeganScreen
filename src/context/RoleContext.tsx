"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "Guest" | "Member" | "Admin";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  ready: boolean;
  isGuest: boolean;
  isMember: boolean;
  isAdmin: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("Guest");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem("vh-role") as UserRole | null;
        if (stored && (stored === "Guest" || stored === "Member" || stored === "Admin")) {
          setRoleState(stored);
        }
      } catch {
        // ignore localStorage errors
      }
      setReady(true);
    });
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem("vh-role", newRole);
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        ready,
        isGuest: role === "Guest",
        isMember: role === "Member",
        isAdmin: role === "Admin",
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
