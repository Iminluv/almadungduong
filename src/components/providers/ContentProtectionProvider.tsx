"use client";

import React from "react";
import { useContentProtection } from "@/lib/use-content-protection";
import { DevToolsOverlay } from "@/components/ui/DevToolsOverlay";

interface ContentProtectionProviderProps {
  children: React.ReactNode;
}

export function ContentProtectionProvider({ children }: ContentProtectionProviderProps) {
  const { isDevToolsOpen } = useContentProtection();

  return (
    <>
      {children}
      {isDevToolsOpen && <DevToolsOverlay />}
    </>
  );
}
