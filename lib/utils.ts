import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TEST_TOKEN_CONTRACT = "CDDKJMTAENCOVJPUWTISOQ23JYSMCLEOKXT7VEVZJWLYZ3PKLNRBXJ5C";

