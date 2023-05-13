'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Icons } from '@/components/icons';
import type { UploadedImage } from '@/types/image-upload';
import { siteConfig } from '@/config/site';

interface ImageUploadProps {
  uploadedImages: number;
  onChange: (value: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImages,
  onChange,
}) => {
  const handleUpload = (result: UploadedImage) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="kywyzclo"
      options={{ maxFiles: 1, multiple: false }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              if (uploadedImages > siteConfig.maxImagesUpload - 1) return;
              open();
            }}
            className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border border-dashed border-foreground/25 px-3 text-foreground/50 transition duration-300 hover:border-foreground/50 hover:text-foreground/75"
          >
            <Icons.camera size={40} />
            <p className="text-center text-xs font-medium">
              Click here to add up to {siteConfig.maxImagesUpload} images
            </p>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
