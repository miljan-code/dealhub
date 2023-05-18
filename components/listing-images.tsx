'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import type { ListingImage } from '@prisma/client';

interface ListingImagesProps {
  images: ListingImage[];
}

export const ListingImages: React.FC<ListingImagesProps> = ({ images }) => {
  const [showImage, setShowImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (!containerRef.current || !containerWrapperRef.current) {
      return null;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerWrapperWidth = containerWrapperRef.current.offsetWidth;

    if (containerWidth > containerWrapperWidth) {
      containerRef.current.style.transform = `translateX(0px)`;
    }
  };

  const handleScrollRight = () => {
    if (!containerRef.current || !containerWrapperRef.current) {
      return null;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerWrapperWidth = containerWrapperRef.current.offsetWidth;

    if (containerWidth > containerWrapperWidth) {
      containerRef.current.style.transform = `translateX(-${
        containerWidth - containerWrapperWidth
      }px)`;
    }
  };

  return (
    <>
      <Card className="relative flex h-32 items-center justify-between overflow-hidden">
        <div
          onClick={handleScrollLeft}
          className="z-10 flex h-full cursor-pointer items-center justify-center border-r border-border bg-background transition hover:bg-muted"
        >
          <Icons.left />
        </div>
        <div ref={containerWrapperRef} className="relative h-32 w-full">
          <div
            ref={containerRef}
            className="absolute left-0 top-0 flex items-center gap-1 transition duration-300"
          >
            {images.map(item => (
              <div
                onClick={() => setShowImage(item.imageUrl)}
                key={item.id}
                className="relative h-32 w-48"
              >
                <Image
                  src={item.imageUrl}
                  alt="pic"
                  fill
                  className="cursor-pointer rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={handleScrollRight}
          className="z-10 flex h-full cursor-pointer items-center justify-center border-l border-border bg-background transition hover:bg-muted"
        >
          <Icons.right />
        </div>
      </Card>
      {showImage && (
        <div
          onClick={() => setShowImage(null)}
          className="fixed -top-3 left-0 z-50 h-full w-full bg-background/75"
        >
          <Card
            onClick={e => e.stopPropagation()}
            className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={showImage} alt="Pic" fill className="object-contain" />
            <div
              onClick={() => setShowImage(null)}
              className="absolute right-3 top-3 cursor-pointer rounded-full bg-foreground p-2 text-background"
            >
              <Icons.close size={32} />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
