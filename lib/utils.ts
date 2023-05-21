import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { siteConfig } from '@/config/site';
import type { UseFormSetValue, FieldValues, Path } from 'react-hook-form';

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

type CustomValueOptions = {
  shouldValidate: boolean;
  shouldTouch: boolean;
  shouldDirty: boolean;
};

export const setCustomValue = <
  FormData extends FieldValues,
  K extends Path<FormData>
>(
  field: K,
  value: FormData[K],
  setValue: UseFormSetValue<FormData>,
  options: CustomValueOptions = {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }
) => {
  setValue(field, value, options);
};
