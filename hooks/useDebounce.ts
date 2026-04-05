import { useDebounceType } from "@/types/debounceHook";

export const useDebounce = (fn: Function, delay: number): useDebounceType => {
  let timeout: number | null = null;

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
