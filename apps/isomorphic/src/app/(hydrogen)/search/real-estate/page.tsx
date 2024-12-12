import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductsGrid from '@/app/shared/explore-listing';
import ListingFilters from '@/app/shared/explore-listing/listing-filters';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';

export const metadata = {
  ...metaObject('Real State'),
};

const pageHeader = {
  title: 'Hotels',
  breadcrumb: [
    {
      name: 'Dashboard',
    },
    {
      href: routes.searchAndFilter.realEstate,
      name: 'Manage Hotels',
    },
    {
      name: 'List Hotels',
    },
  ],
};

export default function RealEstatePage() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {/* <ListingFilters className="mb-6" /> */}
      {/* w-full @lg:w-auto */}
      <Link
        href={routes.eCommerce.createProduct}
        className="mb-6 flex justify-end"
      >
        <Button as="span" className="w-full @lg:w-auto">
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Add Hotel
        </Button>
      </Link>
      <ProductsGrid />
    </div>
  );
}
