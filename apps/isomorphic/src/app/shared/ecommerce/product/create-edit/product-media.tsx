import { useFormContext } from 'react-hook-form';
import UploadZone from '@core/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';
import { Input } from 'rizzui';

interface ProductMediaProps {
  className?: string;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  // const { getValues, setValue } = useFormContext();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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
      <Input
        label="Image"
        placeholder="Google drive image link"
        {...register('images.main')}
        error={errors.title?.message as string}
      />
    </FormGroup>
  );
}
