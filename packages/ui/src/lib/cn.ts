import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with clsx and resolve Tailwind conflicts with tailwind-merge.
 * The single class-composition helper used by every @mxv/ui component.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
