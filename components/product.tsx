import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/components/icons';
import { Button } from './ui/button';

interface ProductProps {}

export const Product: React.FC<ProductProps> = () => {
  return (
    <Card className="grid max-h-32 grid-cols-7 justify-between gap-3 px-2 py-2">
      {/* Image */}
      <div className="col-span-1 flex items-center justify-center">
        <AspectRatio ratio={1 / 1} className="overflow-hidden">
          <Image
            src="/images/jacket.jpg"
            alt="Jacket"
            className="rounded-md object-cover"
            fill
          />
        </AspectRatio>
      </div>
      {/* Title and Description */}
      <div className="col-span-2 flex flex-col space-y-1 py-1">
        <Link href="/" className="truncate text-lg font-medium">
          The Northface Jacket
        </Link>
        <p className="text-xs text-foreground/70 line-clamp-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus eum
          ut provident consequuntur a eligendi quia dolor quisquam quaerat,
          expedita distinctio laudantium ratione molestias sequi doloremque?
          Quas sapiente dolorem architecto.
        </p>
      </div>
      {/* Product price */}
      <div className="py-1.5">
        <p className="font-medium text-red-500">300,00€</p>
      </div>
      {/* Views and Stars */}
      <div className="flex items-start space-x-3 py-1.5">
        <div className="flex items-center space-x-0.5">
          <Icons.eye size={18} />
          <span className="text-foreground/75">0</span>
        </div>
        <div className="flex items-center space-x-0.5">
          <Icons.star size={18} />
          <span className="text-foreground/75">0</span>
        </div>
      </div>
      {/* Listing Date and Location */}
      <div className="flex flex-col py-1.5 text-sm">
        <p>3 hours ago</p>
        <p className="text-foreground/80">Belgrade</p>
      </div>
      {/* Listing Date and Location */}
      <div className="flex flex-col space-y-2 py-1.5 text-sm">
        <Button variant="outline" size="sm" className="space-x-1 text-xs">
          <Icons.star size={16} />
          <span>Follow</span>
        </Button>
        <Button variant="secondary" size="sm" className="space-x-1 text-xs">
          <Icons.message size={16} />
          <span>Message</span>
        </Button>
      </div>
    </Card>
  );
};
