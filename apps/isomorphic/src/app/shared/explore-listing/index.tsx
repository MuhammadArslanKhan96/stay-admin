'use client';

import { useEffect, useState } from 'react';
import { Button } from 'rizzui';
import ListingCard from '@core/components/cards/listing-card';
import hasSearchedParams from '@core/utils/has-searched-params';
import { filterProductsData } from '@/data/filter-products-data';
// Note: using shuffle to simulate the filter effect
import shuffle from 'lodash/shuffle';
import Link from 'next/link';

let countPerPage = 12;

export default function ProductsGrid() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);
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

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  const filteredData = hasSearchedParams()
    ? shuffle(filterProductsData)
    : filterProductsData;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {hotelData?.slice(0, nextPage)?.map((hotel: any, index: number) => (
          <Link href={`/ecommerce/products/${hotel.id}/edit`} key={index}>
            <ListingCard key={`filterProduct-${index}`} hotel={hotel} />
          </Link>
        ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
