"use client";

import { useEffect, useRef, RefObject } from "react";

interface ModalAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Custom hook for modal accessibility features.
 * Handles ESC key, focus trapping, and body scroll lock.
 *
 * Issue #6, #14: Consolidates modal useEffects from DeepDiveModal.tsx
 */
export function useModalAccessibility<T extends HTMLElement>({
  isOpen,
  onClose,
}: ModalAccessibilityOptions): RefObject<T | null> {
  const modalRef = useRef<T>(null);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap + focus restore
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Remember what was focused before the modal opened, so we can restore it on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(e: KeyboardEvent): void {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleTab);
      // Restore focus to the trigger element rather than dropping it to <body>.
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return modalRef;
}
