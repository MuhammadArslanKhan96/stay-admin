import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

export const hotelFormSchema = z.object({
  name: z.string().min(1, { message: messages.productNameIsRequired }),
  city: z.string().min(1, { message: messages.cityIsRequired }),
  contact: z.object({
    id: z.string(),
    number: z.number().min(7, { message: messages.contactNumberRequired }),
    email: z
      .string()
      .min(1, { message: messages.emailIsRequired })
      .email({ message: messages.invalidEmail }),
  }),
  image: z.array(z.string()),
  description: z.string().min(1, messages.descriptionIsRequired),
  packages: z.array(z.string()),
  room: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, { message: messages.nameIsRequired }),
      people: z.number().optional(),
      size: z.number().optional(),
      beds: z.number().optional(),
      bathroom: z.number().optional(),
      image: z.string().min(1, { message: messages.imageIsRequired }),
      available: z.boolean().optional(),
      price: z.number().min(1, { message: messages.priceIsRequired }),
      package: z.string(),
    })
  ),
  //   sku: z.string().optional(),
  //   type: z
  //     .string({ required_error: messages.productTypeIsRequired })
  //     .min(1, { message: messages.productTypeIsRequired }),
  //   categories: z.string().optional(),
  //   description: z.string().optional(),
  //   productImages: z.array(fileSchema).optional(),
  //   price: z.coerce.number().min(1, { message: messages.priceIsRequired }),
  //   costPrice: z.coerce.number().optional(),
  //   retailPrice: z.coerce
  //     .number()
  //     .min(1, { message: messages.retailPriceIsRequired }),
  //   salePrice: z.coerce
  //     .number()
  //     .min(1, { message: messages.salePriceIsRequired }),
  //   inventoryTracking: z.string().optional(),
  //   currentStock: z.number().or(z.string()).optional(),
  //   lowStock: z.number().or(z.string()).optional(),
  //   productAvailability: z.string().optional(),
  //   tradeNumber: z.number().or(z.string()).optional(),
  //   manufacturerNumber: z.number().or(z.string()).optional(),
  //   brand: z.string().optional(),
  //   upcEan: z.number().or(z.string()).optional(),
  //   customFields: z
  //     .array(
  //       z.object({
  //         label: z.string().optional(),
  //         value: z.string().optional(),
  //       })
  //     )
  //     .optional(),

  //   freeShipping: z.boolean().optional(),
  //   shippingPrice: z.coerce
  //     .number()
  //     .min(1, { message: messages.shippingPriceIsRequired }),
  //   locationBasedShipping: z.boolean().optional(),
  //   locationShipping: z
  //     .array(
  //       z.object({
  //         name: z.string().optional(),
  //         shippingCharge: z.number().or(z.string()).optional(),
  //       })
  //     )
  //     .optional(),
  //   pageTitle: z.string().optional(),
  //   metaDescription: z.string().optional(),
  //   metaKeywords: z.string().optional(),
  //   productUrl: z.string().optional(),
  //   isPurchaseSpecifyDate: z.boolean().optional(),
  //   isLimitDate: z.boolean().optional(),
  //   dateFieldName: z.string().optional(),
  //   availableDate: z.date().min(new Date('1900-01-01')).optional(),
  //   endDate: z.date().min(new Date('1900-01-02')).optional(),
  //   productVariants: z
  //     .array(
  //       z.object({
  //         name: z.string().optional(),
  //         value: z.string().optional(),
  //       })
  //     )
  //     .optional(),
  //   tags: z.array(z.string()).optional(),
});

export type CreateHotelInput = z.infer<typeof hotelFormSchema>;
