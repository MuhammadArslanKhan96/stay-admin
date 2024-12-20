import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormGroup
        title="Summary"
        description="Edit your hotels description and necessary information from here"
        className={cn(className)}
      >
        <Input
          label="Hotel Name"
          placeholder="Hotel Name"
          {...register('name')}
          error={errors.title?.message as string}
        />
        <Input
          label="City"
          placeholder="City"
          {...register('city')}
          error={errors.sku?.message as string}
        />

        {/* <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="h-auto"
              options={typeOption}
              value={value}
              onChange={onChange}
              label="Product Type"
              error={errors?.type?.message as string}
              getOptionValue={(option) => option.value}
            />
          )}
        /> */}

        {/* <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={categoryOption}
              value={value}
              onChange={onChange}
              label="Categories"
              error={errors?.categories?.message as string}
              getOptionValue={(option) => option.value}
              dropdownClassName="h-auto"
            />
          )}
        /> */}

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <QuillEditor
              value={value}
              onChange={onChange}
              label="Description"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          )}
        />
      </FormGroup>
      <FormGroup
        title="Contact"
        description="Edit your hotels contact information from here"
        className={cn(className)}
      >
        <Input
          label="Phone"
          placeholder="Phone Number"
          {...register('contact.number')}
          error={errors.title?.message as string}
        />
        <Input
          label="Email"
          placeholder="user@example.com"
          {...register('contact.email')}
          error={errors.sku?.message as string}
        />

        {/* <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Product Type"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      /> */}
      </FormGroup>
    </>
  );
}
