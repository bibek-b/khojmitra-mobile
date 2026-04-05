import { useDebounceType } from "@/types/debounceHook";
import { useRef } from "react";

export const useDebounce = (fn: Function, delay: number): useDebounceType => {
  let timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
