"use client";

import { useEffect, useRef, type RefObject } from "react";

interface ModalAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Stop the page behind a modal from scrolling; returns the undo.
 *
 * The window is the page's scroller, and `overflow: hidden` on <body> alone
 * does not reach it: globals.css gives <html> `overflow-x: clip`, which stops
 * body's overflow from propagating to the viewport. So <html> is locked too.
 * Where the page shows a classic (space-taking) scrollbar, its gutter is kept
 * so the layout does not jump sideways while the modal is open. Each lock
 * restores the inline values it found, so nested modals unwind in order.
 */
export function lockPageScroll(): () => void {
  const html = document.documentElement;
  const body = document.body;
  const previous = {
    htmlOverflow: html.style.overflow,
    htmlGutter: html.style.scrollbarGutter,
    bodyOverflow: body.style.overflow,
  };
  const hasClassicScrollbar = window.innerWidth > html.clientWidth;
  if (hasClassicScrollbar) html.style.scrollbarGutter = "stable";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  return () => {
    html.style.overflow = previous.htmlOverflow;
    html.style.scrollbarGutter = previous.htmlGutter;
    body.style.overflow = previous.bodyOverflow;
  };
}

/**
 * Custom hook for modal accessibility features.
 * Handles ESC key, focus trapping, and the page scroll lock.
 *
 * Issue #6, #14: Consolidates modal useEffects from DeepDiveModal.tsx
 */
export function useModalAccessibility<T extends HTMLElement>({
  isOpen,
  onClose,
}: ModalAccessibilityOptions): RefObject<T | null> {
  const modalRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  // Consumers often pass an inline callback. Keep the current callback in a
  // ref so callback identity changes cannot tear down an otherwise-open modal.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Initial focus, Escape, focus containment/restoration, and scroll locking
  // belong to one lifecycle so they cannot drift apart during modal teardown.
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const unlockScroll = lockPageScroll();

    const getFocusableElements = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (element) =>
          !element.hasAttribute("hidden") &&
          !element.closest('[aria-hidden="true"]')
      );

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0] ?? modal;
      const lastElement = focusableElements[focusableElements.length - 1] ?? modal;
      const activeElement = document.activeElement;

      if (!modal.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const frame = requestAnimationFrame(() => {
      const initialFocus =
        modal.querySelector<HTMLElement>("[data-modal-initial-focus]") ??
        getFocusableElements()[0] ??
        modal;
      initialFocus.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
      // AnimatePresence may keep this subtree mounted after `isOpen` becomes
      // false. Retire its modal semantics immediately so it no longer blocks
      // focus restoration or remains exposed as an active modal during exit.
      modal.removeAttribute("aria-modal");
      // Exit animations can leave the modal subtree mounted for a few frames.
      // Wait only for any *other* active modal, then focus outside this exiting
      // subtree so its later removal cannot drop focus back to <body>.
      const restoreFocus = (attempt = 0) => {
        if (!previouslyFocused?.isConnected) return;
        if (!document.querySelector('[aria-modal="true"]')) {
          previouslyFocused.focus();
          return;
        }
        if (attempt < 30) {
          requestAnimationFrame(() => restoreFocus(attempt + 1));
        }
      };
      requestAnimationFrame(() => restoreFocus());
    };
  }, [isOpen]);

  return modalRef;
}
