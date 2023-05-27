'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import type { ListingImage } from '@prisma/client';

interface ShowcaseProps {
  activeImage: number;
  images: ListingImage[];
  onChangeImage: React.Dispatch<React.SetStateAction<number>>;
  onCloseShowcase: React.Dispatch<React.SetStateAction<boolean>>;
}

const Showcase = ({
  activeImage,
  images,
  onChangeImage,
  onCloseShowcase,
}: ShowcaseProps) => {
  useLockBodyScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEventInit) => {
      if (e.key === 'ArrowLeft') {
        if (activeImage <= 0) {
          onChangeImage(images.length - 1);
        } else {
          onChangeImage(activeImage - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (activeImage >= images.length - 1) {
          onChangeImage(0);
        } else {
          onChangeImage(activeImage + 1);
        }
      } else if (e.key === 'Escape') {
        onCloseShowcase(false);
      } else return;
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      onClick={() => onCloseShowcase(false)}
      className="fixed -top-5 left-0 z-50 h-full w-full bg-background/75 sm:-top-3"
    >
      <Card
        onClick={e => e.stopPropagation()}
        className="absolute inset-0 h-full w-full rounded-none sm:left-1/2 sm:top-1/2 sm:h-2/3 sm:w-2/3 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md"
      >
        <Image
          src={images[activeImage].imageUrl}
          alt="Pic"
          fill
          className="object-contain"
        />
        <div
          onClick={() => onCloseShowcase(false)}
          className="absolute right-3 top-3 cursor-pointer rounded-full bg-foreground p-2 text-background"
        >
          <Icons.close size={32} />
        </div>
        {/* <div className="absolute -bottom-24 left-1/2 flex -translate-x-1/2 items-center">
          {images.map(item => (
            <div key={item.id} className="relative h-16 w-24">
              <Image
                src={item.imageUrl}
                alt="Pic"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div> */}
      </Card>
    </div>
  );
};

interface ListingImagesProps {
  images: ListingImage[];
}

const imageWidthPX = 192;

export const ListingImages: React.FC<ListingImagesProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [displayShowcase, setDisplayShowcase] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  const calculatePixelsFromString = (str: string) => {
    return +str
      .split('')
      .filter(char => !isNaN(+char))
      .join('');
  };

  const handleScrollLeft = () => {
    if (!containerRef.current || !containerWrapperRef.current) {
      return null;
    }

    const currentTranslateX = containerRef.current.style.transform;
    const currentValue = calculatePixelsFromString(currentTranslateX);

    if (currentValue > imageWidthPX) {
      containerRef.current.style.transform = `translateX(-${
        currentValue - imageWidthPX
      }px)`;
    } else {
      containerRef.current.style.transform = `translateX(0px)`;
    }
  };

  const handleScrollRight = () => {
    if (!containerRef.current || !containerWrapperRef.current) {
      return null;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerWrapperWidth = containerWrapperRef.current.offsetWidth;
    const currentTranslateX = containerRef.current.style.transform;
    const currentValue = calculatePixelsFromString(currentTranslateX);

    if (containerWrapperWidth + currentValue + imageWidthPX < containerWidth) {
      containerRef.current.style.transform = `translateX(-${
        currentValue + imageWidthPX
      }px)`;
    } else {
      containerRef.current.style.transform = `translateX(-${
        containerWidth - containerWrapperWidth
      }px)`;
    }
  };

  const handleOpenShowcase = (index: number) => {
    setDisplayShowcase(true);
    setActiveImage(index);
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
            {images?.map((item, i) => (
              <div
                onClick={() => handleOpenShowcase(i)}
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
      {displayShowcase && (
        <Showcase
          activeImage={activeImage}
          onChangeImage={setActiveImage}
          onCloseShowcase={setDisplayShowcase}
          images={images}
        />
      )}
    </>
  );
};
