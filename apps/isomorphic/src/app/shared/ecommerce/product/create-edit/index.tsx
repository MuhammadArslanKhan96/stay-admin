'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import FormNav, {
  formParts,
} from '@/app/shared/ecommerce/product/create-edit/form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/shared/ecommerce/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/shared/ecommerce/product/create-edit/shipping-info';
import ProductSeo from '@/app/shared/ecommerce/product/create-edit/product-seo';
import DeliveryEvent from '@/app/shared/ecommerce/product/create-edit/delivery-event';
import ProductVariants from '@/app/shared/ecommerce/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create-edit/product-tags';
import FormFooter from '@core/components/form-footer';
// import {
//   CreateProductInput,
//   productFormSchema,
// } from '@/validators/create-product.schema';
import {
  CreateHotelInput,
  hotelFormSchema,
} from '@/validators/create-hotel.schema';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { CreateProductInput } from '@/validators/create-product.schema';
// import { CreateHotelInput } from '@/validators/create-hotel.schema';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  // [formParts.pricingInventory]: PricingInventory,
  // [formParts.productIdentifiers]: ProductIdentifiers,
  // [formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  [formParts.variantOptions]: ProductVariants,
  // [formParts.tagsAndCategory]: ProductTaxonomies,
};

function getDownloadableLink(googleDriveLink: string): string {
  const regex = /\/file\/d\/([^/]+)\//;
  const match = googleDriveLink.match(regex);

  if (!match || match.length < 2) {
    throw new Error('Invalid Google Drive link');
  }

  const fileId = match[1];
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateHotelInput | CreateProductInput;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateHotelInput>({
    // resolver: zodResolver(hotelFormSchema),
    // defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateHotelInput> = async (data) => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('product_data', data);
    //   toast.success(
    //     <Text as="b">Hotel successfully {slug ? 'updated' : 'created'}</Text>
    //   );
    //   methods.reset();
    // }, 600);
    try {
      const res = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          city: data.city,
          // description: data.description,
          // images: {
          //   main: data.images.main,
          //   supporting: [data.images.main, data.images.main],
          // },
          image: data.images.main,
          contact: {
            number: data.contact.number,
            email: data.contact.email,
          },
          room: data.rooms,
          available: true,
        }),
      });
      toast.success(
        <Text as="b">Hotel successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
      setLoading(false);
    } catch (error: any) {
      console.log(error?.message);
      toast.error(
        <Text as="b">Failed to {slug ? 'update' : 'create'} hotel</Text>
      );
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Hotel' : 'Create Hotel'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
