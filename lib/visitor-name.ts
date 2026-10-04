import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mango-visitor-name";
const CHANGE_EVENT = "visitor-name-change";
/** Dispatch this on window to reopen the welcome modal (e.g. to change the name). */
export const OPEN_WELCOME_EVENT = "open-welcome";

// Fallback for browsers that block localStorage: the name lasts until the page reloads
let memoryName: string | null = null;

export function getVisitorName(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryName;
  } catch {
    return memoryName;
  }
}

export function setVisitorName(name: string) {
  memoryName = name;
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // Storage unavailable; memoryName still works for this visit
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** The visitor's saved name, or null. Always null during server rendering. */
export function useVisitorName() {
  return useSyncExternalStore(subscribe, getVisitorName, () => null);
}
