import Image from "next/image";
import { Title, Text } from "rizzui";
import cn from "../../utils/class-names";
import Link from "next/link";
import { PiStarFill } from "react-icons/pi";
import WishlistButton from "../wishlist-button";

const getImageLink = (googleDriveLink: string) => {
  const regex = /\/file\/d\/([^/]+)\//;
  try {
    const match = googleDriveLink.match(regex);

    if (!match || match.length < 2) {
      throw new Error("Invalid Google Drive link");
    }

    const fileId = match[1];
    //   return `https://drive.google.com/uc?export=view&id=${fileId}`;
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  } catch (error: any) {
    console.log(error.message);
    return "/assets/imgs/page/homepage1/journey2.png";
  }
};

export function RatingsCount({
  rating,
  totalRatings,
}: {
  rating: number;
  totalRatings?: number;
}) {
  return (
    <Text
      as="span"
      className="inline-flex w-[100px] flex-shrink-0 items-center justify-end gap-1 text-sm text-gray-900"
    >
      <PiStarFill className="h-3.5 w-3.5 text-gray-900" />
      {rating}
      {totalRatings && ` (${totalRatings})`}
    </Text>
  );
}

interface Product {
  city: string;
  country: string;
  thumbnail: string;
  rating: number;
  ratingCount: number;
  hostname: string;
  features: string[];
  price: {
    original: string;
    sale: string;
  };
  tag: string;
}

// interface Hotel {
//   id: string;
//   city: string;
//   name: string;
//   image: string;
//   rating: number;
//   ratingCount: number;
//   price: number;
// }
interface Hotel {
  id: string;
  name: string;
  city: string;
  image: string[];
  rating: number;
  ratingCount: number;
  packages: string[];
  description: string;
  contact: {
    number: string;
    email: string;
  };
  room: [
    {
      name: string;
      people: string;
      size: string;
      beds: string;
      bathroom: string;
      price: string;
      rating: number;
      ratingCount: number;
      package: string;
      image: string;
      available: boolean;
    },
  ];
}

type ListingCardProps = {
  // product: Product;
  hotel: Hotel;
  className?: string;
  title?: React.ReactNode;
};
// ${product.country}
export default function ListingCard({
  // product,
  hotel,
  className,
  title = `${hotel.name}, ${hotel.city}`,
}: ListingCardProps) {
  // const { image, tag, rating, ratingCount, hostname, features, price } = hotel;

  const { id, city, name, image, rating, room, packages, ratingCount } = hotel;

  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-[91/75] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={getImageLink(image[0])}
            alt={title as string}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* {tag && (
          <Text
            as="span"
            className="absolute start-5 top-5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold dark:bg-gray-200"
          >
            {tag}
          </Text>
        )} */}
        <WishlistButton className="absolute end-3 top-3" />
      </div>
      <div className="pt-3">
        <div className="mb-1 flex items-center justify-between">
          <Link
            href={`/ecommerce/products/${id}/edit`}
            className="max-w-[calc(100%-120px)] flex-grow"
          >
            <Title
              as="h6"
              className="truncate font-semibold transition-colors hover:text-primary"
            >
              {title}
            </Title>
          </Link>
          <RatingsCount rating={rating} totalRatings={ratingCount} />
        </div>

        {/* <Text as="p" className="mb-1 truncate">
          Stay with {hostname}
        </Text> */}

        <div className="flex items-center">
          {packages.map((item: string) => (
            <Text
              as="span"
              key={`${title}-${item}`}
              className="relative -inset-y-1/2 inline-block px-2 after:absolute after:-end-[1px] after:top-1/2 after:h-1 after:w-1 after:rounded-full after:bg-gray-500 first:ps-0 last:pe-0 last:after:hidden"
            >
              {item}
            </Text>
          ))}
        </div>

        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {/* <del className="pe-1.5 text-[13px] font-normal text-gray-500">
            {price.original}
          </del> */}
          ${room[0].price} night
        </div>
      </div>
    </div>
  );
}
