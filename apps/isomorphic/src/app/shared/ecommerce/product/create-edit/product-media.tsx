import { useFieldArray, useFormContext } from 'react-hook-form';
import UploadZone from '@core/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';
import { ActionIcon, Button, Input } from 'rizzui';
import TrashIcon from '@core/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';
import { imageVariants } from './form-utils';
import { useCallback } from 'react';

interface ProductMediaProps {
  className?: string;
}

function getImageId(googleDriveLink: string): string {
  const regex = /\/file\/d\/([^/]+)\//;
  const match = googleDriveLink.match(regex);
  if (!match || match.length < 2) {
    throw new Error('Invalid Google Drive link');
  }
  const fileId = match[1];
  return fileId;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  // const { getValues, setValue } = useFormContext();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'image',
  });
  const addVariant = useCallback(() => append([imageVariants]), [append]);
  return (
    <FormGroup
      title="Upload new product images"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      {/* <UploadZone
        className="col-span-full"
        name="productImages"
        getValues={getValues}
        setValue={setValue}
      /> */}
      <div className="sapce-y-4 flex flex-col">
        {fields.map((field, index) => {
          return (
            <div className="flex justify-between" key={field.id}>
              <Input
                label="Image"
                placeholder="Google drive image link"
                {...register(`image.${index}`)}
                error={errors.title?.message as string}
              />
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
          );
        })}
      </div>
      {/* <Input
        label="Image"
        placeholder="Google drive image link"
        {...register('images.main')}
        error={errors.title?.message as string}
      /> */}
      <Button
        onClick={addVariant}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" /> Add Image
      </Button>
    </FormGroup>
  );
}
