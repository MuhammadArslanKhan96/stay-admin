import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import { productData } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import { redirect } from 'next/navigation';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return metaObject(`Edit ${slug}`);
}

const pageHeader = {
  title: 'Edit Hotel',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.eCommerce.products,
      name: 'Hotels',
    },
    {
      name: 'Edit',
    },
  ],
};

async function getHotel(id: string) {
  console.log(id);
  const url: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/${id}`;
  // console.log(url);
  const data = await fetch(url, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  // console.log(data);
  if (data.status == 404) {
    redirect('/not-found');
  }
  const hotel = await data.json();
  // console.log(hotel);
  return hotel;
}

export default async function EditProductPage({
  params,
}: {
  params: { slug: string; hotel: any };
}) {
  const hotel: any = await getHotel(params.slug);
  console.log(hotel);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Hotel
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProduct slug={params.slug} hotel={hotel} />
    </>
  );
}
