import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getConditionLabel(str: string) {
  switch (str) {
    case 'new':
      return 'New — Vacuum sealed';
    case 'like-new':
      return 'Like new — Unused';
    case 'used':
      return 'Used — Good condition';
    case 'damaged':
      return 'Damaged — Not working';
    default:
      return 'Used — Good condition';
  }
}
