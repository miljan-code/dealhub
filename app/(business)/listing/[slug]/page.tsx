import { Icons } from '@/components/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const ListingPage = () => {
  return (
    <section className="flex flex-col space-y-3">
      <Card>
        {/* Listing header */}
        <div className="flex items-center justify-between px-3 py-2 text-sm">
          <p>
            <Link href="/?category=sports" className="text-indigo-500">
              Sports
            </Link>{' '}
            / Listing ID: 68245532
          </p>
          <p>12 days ago</p>
        </div>
        <hr />
        {/* Listing body */}
        <div className="grid grid-cols-3">
          <div className="col-span-2 grid grid-cols-2 p-4">
            <div className="col-span-1 flex flex-col space-y-3">
              {/* Title & condition */}
              <div className="flex flex-col">
                <h2 className="text-xl">The Northface Jacket</h2>
                <span className="text-xs text-muted-foreground">
                  New &mdash; Vacuum sealed
                </span>
              </div>
              {/* Leading image */}
              <div className="h-44 w-44">
                <AspectRatio ratio={1 / 1} className="overflow-hidden">
                  <Image
                    src="/images/jacket.jpg"
                    alt="Jacket"
                    className="rounded-md object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              {/* Price */}
              <div className="flex flex-col">
                <p className="font-medium text-red-500">Price: 300,00 €</p>
                <span className="text-xs text-muted-foreground">
                  Fixed price
                </span>
              </div>
              {/* Seens & Stars */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Icons.eye size={16} />
                  <span className="text-xs">Seen 10 times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.star size={16} />
                  <span className="text-xs">Favorited by 10 users</span>
                </div>
              </div>
              {/* Share button */}
              <Button className="w-fit space-x-2" size="sm" variant="outline">
                <Icons.share size={16} />
                <span>Share</span>
              </Button>
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-3 border-l border-border p-4">
            {/* Send message btn */}
            <Button className="space-x-1">
              <Icons.message size={20} />
              <span>Send a message</span>
            </Button>
            {/* Listing author */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.user size={18} />
              <span>Foo Bar</span>
            </div>
            {/* Author location */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.globe size={18} />
              <span>Belgrade, Serbia</span>
            </div>
            {/* Author ratings */}
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1">
                <Icons.thumbUp size={18} className="text-green-600" />
                <span>0</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.thumbDown size={18} className="text-red-500" />
                <span>0</span>
              </div>
            </div>
            {/* Author listings */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.list size={18} />
              <span>All listings</span>
            </div>
            {/* Authors phone number */}
            <div className="flex items-center space-x-1 text-sm">
              <Icons.phone size={18} />
              <span>+38162557842</span>
            </div>
          </div>
        </div>
        <hr />
        {/* Listing description */}
        <div className="p-4">
          <p className="text-sm">Description</p>
        </div>
      </Card>
    </section>
  );
};

export default ListingPage;
