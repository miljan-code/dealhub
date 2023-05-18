import Link from 'next/link';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { siteConfig } from '@/config/site';

export const Categories = () => {
  return (
    <Command className="border-foreground/15 border">
      <CommandInput placeholder="Search for a category" className="text-xs" />
      <CommandList>
        <CommandGroup>
          {siteConfig.categories.map(item => (
            <Link key={item.href} href={item.href}>
              <CommandItem className="space-x-2 text-xs">
                <item.icon size={16} />
                <span>{item.label}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
