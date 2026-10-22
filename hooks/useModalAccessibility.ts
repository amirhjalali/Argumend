"use client";

import { useEffect, useRef, type RefObject } from "react";

interface ModalAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
}

let scrollLockCount = 0;
let restorePageScroll: (() => void) | null = null;
const activeModals: HTMLElement[] = [];

function updateModalOwners() {
  const top = activeModals.at(-1);
  for (const modal of activeModals) {
    modal.setAttribute("aria-modal", String(modal === top));
  }
}

/**
 * Stop the page behind a modal from scrolling; returns the undo.
 *
 * The window is the page's scroller, and `overflow: hidden` on <body> alone
 * does not reach it: globals.css gives <html> `overflow-x: clip`, which stops
 * body's overflow from propagating to the viewport. So <html> is locked too.
 * Where the page shows a classic (space-taking) scrollbar, its gutter is kept
 * so the layout does not jump sideways while the modal is open. The final
 * lock restores the original inline values, regardless of teardown order.
 */
export function lockPageScroll(): () => void {
  if (scrollLockCount === 0) {
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
    restorePageScroll = () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.scrollbarGutter = previous.htmlGutter;
      body.style.overflow = previous.bodyOverflow;
    };
  }
  scrollLockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    scrollLockCount -= 1;
    if (scrollLockCount === 0) {
      restorePageScroll?.();
      restorePageScroll = null;
    }
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
  const returnFocusRef = useRef<HTMLElement | null>(null);

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
    const focusedBeforeOpen = document.activeElement as HTMLElement | null;
    // A rapid reopen can still have focus inside the exiting dialog. Keep
    // its original trigger so the eventual close returns outside the dialog.
    const previouslyFocused = modal.contains(focusedBeforeOpen) ? returnFocusRef.current : focusedBeforeOpen;
    returnFocusRef.current = previouslyFocused;
    const unlockScroll = lockPageScroll();
    activeModals.push(modal);
    // Setup also restores semantics when AnimatePresence reuses a dialog
    // that reopened before its exit animation removed the DOM node.
    updateModalOwners();

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
      if (activeModals.at(-1) !== modal) return;
      if (event.isComposing || event.keyCode === 229) return;
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
      if (activeModals.at(-1) !== modal) return;
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
      const index = activeModals.indexOf(modal);
      if (index !== -1) activeModals.splice(index, 1);
      // AnimatePresence may keep this subtree mounted after `isOpen` becomes
      // false. Retire its modal semantics immediately so it no longer blocks
      // focus restoration or remains exposed as an active modal during exit.
      modal.removeAttribute("aria-modal");
      updateModalOwners();
      // A dialog opened over another returns to its trigger inside that
      // dialog. Closing a lower layer must not steal the upper layer's focus.
      const restoreFocus = () => {
        if (!previouslyFocused?.isConnected) return;
        const activeModal = activeModals.at(-1);
        if (!activeModal || activeModal.contains(previouslyFocused)) {
          previouslyFocused.focus();
        }
      };
      requestAnimationFrame(() => restoreFocus());
    };
  }, [isOpen]);

  return modalRef;
}
