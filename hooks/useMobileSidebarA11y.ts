"use client";

import { useEffect, useRef, type RefObject } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

interface MobileSidebarA11yOptions {
  isOpen: boolean;
  close: () => void;
  drawerRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Gives the mobile navigation drawer the same lifecycle guarantees as a modal:
 * accessible dialog semantics, initial focus, Tab containment, Escape,
 * scroll lock, and focus return. Desktop sidebars remain non-modal.
 */
export function useMobileSidebarA11y({
  isOpen,
  close,
  drawerRef,
  triggerRef,
}: MobileSidebarA11yOptions) {
  const openedOnMobile = useRef(false);
  const closeRef = useRef(close);

  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  useEffect(() => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;

    if (isOpen && isMobile) {
      openedOnMobile.current = true;
      const drawer = drawerRef.current;
      const previousOverflow = document.body.style.overflow;
      const previousRole = drawer?.getAttribute("role");
      const previousAriaModal = drawer?.getAttribute("aria-modal");
      document.body.style.overflow = "hidden";
      drawer?.setAttribute("role", "dialog");
      drawer?.setAttribute("aria-modal", "true");

      const getFocusableElements = () =>
        Array.from(
          drawer?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter(
          (element) =>
            !element.hasAttribute("hidden") &&
            !element.closest('[aria-hidden="true"]'),
        );

      const frame = window.requestAnimationFrame(() => {
        const initialFocus =
          drawer?.querySelector<HTMLElement>("[data-sidebar-initial-focus]") ??
          getFocusableElements()[0] ??
          drawer;
        initialFocus?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeRef.current();
          return;
        }
        if (event.key !== "Tab" || !drawer) return;

        const focusable = getFocusableElements();
        const first = focusable[0] ?? drawer;
        const last = focusable[focusable.length - 1] ?? drawer;
        const active = document.activeElement;
        if (!drawer.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
        if (previousRole == null) drawer?.removeAttribute("role");
        else drawer?.setAttribute("role", previousRole);
        if (previousAriaModal == null)
          drawer?.removeAttribute("aria-modal");
        else drawer?.setAttribute("aria-modal", previousAriaModal);
      };
    }

    if (!isOpen && openedOnMobile.current) {
      openedOnMobile.current = false;
      triggerRef.current?.focus();
    }
  }, [drawerRef, isOpen, triggerRef]);
}
