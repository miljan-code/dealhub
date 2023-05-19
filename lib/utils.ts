import { siteConfig } from '@/config/site';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getConditionLabel(str: string) {
  const condition = siteConfig.productCondition.find(
    item => item.value === str
  );

  if (!condition) return `Used — Good condition`;

  return `${condition.label} — ${condition.sublabel}`;
}
