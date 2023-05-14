'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { createListingSchema } from '@/lib/validations/create-listing';
import { siteConfig } from '@/config/site';
import { ImageUpload } from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '@/components/icons';
import type { User } from 'next-auth';

export type FormData = z.infer<typeof createListingSchema>;

interface CreateListingFormProps {
  currentUser: Pick<User, 'name' | 'email' | 'image'>;
}

export const CreateListingForm: React.FC<CreateListingFormProps> = ({
  currentUser,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(createListingSchema),
  });

  const imagesArray = watch('images');

  const setCustomValue = <K extends keyof FormData>(
    field: keyof FormData,
    value: FormData[K]
  ) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const handleImageUpload = (value: string) => {
    if (imagesArray?.length > 0) {
      setCustomValue('images', [...imagesArray, value]);
    } else {
      setCustomValue('images', [value]);
    }
  };

  const handleDeleteImage = (image: string) => {
    const filteredArr = imagesArray.filter(item => item !== image);
    setValue('images', filteredArr);
  };

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form
      className="flex flex-col space-y-6 rounded-lg border bg-card px-4 py-4 text-card-foreground shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Images */}
      <div className="flex items-center space-x-3">
        {(imagesArray?.length || 0) < siteConfig.maxImagesUpload && (
          <ImageUpload
            uploadedImages={imagesArray?.length || 0}
            onChange={handleImageUpload}
          />
        )}
        {imagesArray &&
          imagesArray.map(item => (
            <div
              key={item}
              className="group relative h-32 w-32 cursor-pointer overflow-hidden rounded-md border border-border"
            >
              <Image
                src={item}
                alt="Uploaded image"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div
                onClick={() => handleDeleteImage(item)}
                className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <Icons.close size={14} color="white" />
              </div>
            </div>
          ))}
      </div>

      {/* Title */}
      <div className="flex w-2/3 flex-col space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="eg. iPhone 12 Pro Max 256GB"
          className="placeholder:text-foreground/50"
          {...register('title')}
        />
        {errors?.title?.message && (
          <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm">Category</label>
        <Select onValueChange={value => setCustomValue('category', value)}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Choose one" />
          </SelectTrigger>
          <SelectContent>
            {siteConfig.categories.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.category?.message && (
          <p className="px-1 text-xs text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex w-1/4 flex-col space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="0"
          className="placeholder:text-foreground/50"
          step=".01"
          {...register('price', { valueAsNumber: true })}
        />
        {errors?.price?.message && (
          <p className="px-1 text-xs text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* isFixedPrice & isTradeable */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isFixedPrice"
            onCheckedChange={value =>
              setValue(
                'isFixedPrice',
                typeof value === 'boolean' ? value : false
              )
            }
          />
          <label
            htmlFor="isFixedPrice"
            className="text-sm font-medium leading-none"
          >
            Price is fixed
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isTradeable"
            onCheckedChange={value =>
              setValue(
                'isTradeable',
                typeof value === 'boolean' ? value : false
              )
            }
          />
          <label
            htmlFor="isTradeable"
            className="text-sm font-medium leading-none"
          >
            Item is tradeable
          </label>
        </div>
      </div>

      {/* Condition */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm">Condition</label>
        <RadioGroup
          onValueChange={value => setCustomValue('condition', value)}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new">
              <Label
                htmlFor="new"
                className="flex cursor-pointer flex-col space-y-1"
              >
                <span className="text-sm">New</span>
                <span className="text-xs text-foreground/75">
                  Vacuum sealed
                </span>
              </Label>
            </RadioGroupItem>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="like-new" id="like-new">
              <Label
                htmlFor="like-new"
                className="flex cursor-pointer flex-col space-y-1"
              >
                <span className="text-sm">Like new</span>
                <span className="text-xs text-foreground/75">Unused</span>
              </Label>
            </RadioGroupItem>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="used" id="used">
              <Label
                htmlFor="used"
                className="flex cursor-pointer flex-col space-y-1"
              >
                <span className="text-sm">Used</span>
                <span className="text-xs text-foreground/75">
                  Good condition
                </span>
              </Label>
            </RadioGroupItem>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="damaged" id="damaged">
              <Label
                htmlFor="damaged"
                className="flex cursor-pointer flex-col space-y-1"
              >
                <span className="text-sm">Damaged</span>
                <span className="text-xs text-foreground/75">Not working</span>
              </Label>
            </RadioGroupItem>
          </div>
        </RadioGroup>
        {errors?.condition?.message && (
          <p className="px-1 text-xs text-red-600">
            {errors.condition.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2 pb-4">
        <Label htmlFor="description">Listing description</Label>
        <Textarea
          placeholder="Write your description here."
          id="description"
          {...register('description')}
        />
      </div>
      <hr />

      {/* Personal data */}
      <div className="flex flex-col space-y-4">
        <p className="mb-4">Personal data</p>
        <div className="flex w-1/3 flex-col space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            defaultValue={currentUser.name || ''}
            className="placeholder:text-foreground/50"
            {...register('username')}
          />
          {errors?.username?.message && (
            <p className="px-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex w-1/3 flex-col space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            className="placeholder:text-foreground/50"
            {...register('location')}
          />
          {errors?.location?.message && (
            <p className="px-1 text-xs text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
        <div className="flex w-1/3 flex-col space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            type="text"
            id="phone"
            className="placeholder:text-foreground/50"
            {...register('phone')}
          />
          {errors?.phone?.message && (
            <p className="px-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Publish btn */}
      <Button type="submit" className="w-fit">
        Publish
      </Button>
    </form>
  );
};
