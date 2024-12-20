'use client';

import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Button, ActionIcon } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { useCallback } from 'react';
import {
  variantOption,
  // productVariants,
  roomVariants,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import TrashIcon from '@core/components/icons/trash';
import SelectLoader from '@core/components/loader/select-loader';
import { PiPlusBold } from 'react-icons/pi';
import ProductAvailability from './product-availability';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductVariants({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'room',
  });

  const addVariant = useCallback(() => append([...roomVariants]), [append]);

  console.log('fields', fields);

  return (
    <FormGroup
      title="Rooms"
      description="Add your room variants here"
      className={`${cn(className)} `}
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="col-span-full flex flex-col gap-4 xl:gap-7"
        >
          {/* <Controller
            name={`room.${index}.name`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                options={variantOption}
                value={value}
                onChange={onChange}
                label="Package"
                className="w-full @2xl:w-auto @2xl:flex-grow"
                getOptionValue={(option) => option.value}
              />
            )}
          /> */}
          <Input
            type="text"
            label="Name"
            placeholder="Room Name"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.name`)}
          />
          <Input
            type="number"
            label="Price"
            placeholder="150.00"
            className="flex-grow"
            prefix={'$'}
            {...register(`room.${index}.price`)}
          />
          <Input
            type="text"
            label="Image"
            placeholder="2"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.image`)}
          />
          <Input
            type="number"
            label="People"
            placeholder="2"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.people`)}
          />
          <Input
            type="number"
            label="Beds"
            placeholder="2"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.beds`)}
          />
          <Input
            type="number"
            label="Bathrooms"
            placeholder="2"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.bathroom`)}
          />
          <Input
            type="number"
            label="Size"
            placeholder="50 sqft"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.size`)}
          />
          <Input
            type="text"
            label="Package"
            placeholder="Economy"
            className="flex-grow"
            prefix={''}
            {...register(`room.${index}.package`)}
          />
          {/* <FormGroup
            title="Availability"
            description="Add your product inventory info here"
            className={cn(className)}
          >
            <ProductAvailability />
          </FormGroup> */}
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addVariant}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" /> Add Room
      </Button>
    </FormGroup>
  );
}
