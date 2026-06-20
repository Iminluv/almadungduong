"use client";

import { useEffect, useState } from "react";

export function useContentProtection() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. DevTools detection via window size differences
    const checkDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      const isDevToolsOpened = widthDiff > threshold || heightDiff > threshold;
      
      // Secondary check: if developers inspect element, console might have specific properties
      // or zoom level is very high/low. But widthDiff/heightDiff is the standard modern layout delta.
      setIsDevToolsOpen(isDevToolsOpened);
    };

    // Initial check and resize listener
    checkDevTools();
    window.addEventListener("resize", checkDevTools);

    // 2. Right-click (context menu) blocker with footer exemption
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        // Exempt footer and its descendants
        if (target.closest("footer")) {
          return;
        }
        // Exempt input/textarea fields
        const tagName = target.tagName.toLowerCase();
        if (tagName === "input" || tagName === "textarea") {
          return;
        }
      }
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // 3. Keyboard shortcut blocker
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName.toLowerCase() === "input" || target.tagName.toLowerCase() === "textarea");
      const isFooter = target && target.closest("footer");

      const isMetaOrCtrl = e.metaKey || e.ctrlKey;

      if (isMetaOrCtrl) {
        const key = e.key.toLowerCase();

        // Prevent Save page (Ctrl+S / Cmd+S)
        if (key === "s") {
          e.preventDefault();
          return;
        }

        // Prevent View Source (Ctrl+U / Cmd+U)
        if (key === "u") {
          e.preventDefault();
          return;
        }

        // Prevent Select All (Ctrl+A / Cmd+A) except inside input fields or footer
        if (key === "a" && !isInput && !isFooter) {
          e.preventDefault();
          return;
        }

        // Prevent Copy (Ctrl+C / Cmd+C) except inside inputs
        if (key === "c" && !isInput) {
          e.preventDefault();
          return;
        }
      }

      // Block F12 key (commonly opens DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 4. Dragstart blocker (prevents dragging images or texts)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        // Exempt inputs and footer
        if (target.closest("footer") || target.tagName.toLowerCase() === "input" || target.tagName.toLowerCase() === "textarea") {
          return;
        }
      }
      e.preventDefault();
    };
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      window.removeEventListener("resize", checkDevTools);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return { isDevToolsOpen };
}
