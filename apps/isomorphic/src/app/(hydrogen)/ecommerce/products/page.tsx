'use client';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/ecommerce/product/product-list/table';
// import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import clientPromise from '../../../api/hotels/lib';
import { useEffect, useState } from 'react';

// export const metadata = {
//   ...metaObject('Products'),
// };

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.products,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  const [hotelData, setHotelData] = useState<any>();
  useEffect(() => {
    async function getHotelData() {
      const data: any = await fetch('/api/hotels', {
        method: 'GET',
      });
      const hotels = await data.json();
      setHotelData(hotels);
    }
    getHotelData();
  }, []);

  const displayTable = () => {
    return hotelData ? (
      <ProductsTable pageSize={10} hotelData={hotelData} isLoading={false} />
    ) : (
      <ProductsTable pageSize={10} hotelData={hotelData} isLoading={true} />
    );
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={hotelData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>
      {/* <ProductsTable pageSize={10} hotelData={hotelData} /> */}
      {displayTable()}
    </>
  );
}

// type Hotels
//   name: string;
//   stargazers_count: number;
// };

// export const getServerSideProps = (async () => {
//   const client = await clientPromise;
//   const db = client.db('staychain');
//   const hotels: any = await db.collection('hotels').find({}).toArray();
//   return { props: { hotels } };
// }) satisfies GetServerSideProps<{ hotels: any }>;
