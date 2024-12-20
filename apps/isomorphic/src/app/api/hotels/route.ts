import DnDTablePage from '@/app/(hydrogen)/tables/dnd/page';
import clientPromise from './lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';
import { COLORS } from '@/app/shared/financial/dashboard/investment/investment-utils';
import { Turret_Road } from 'next/font/google';
export async function GET(req: NextRequest) {
  // try {
  //   const client = await clientPromise;
  //   const db = client.db('stay');
  //   const hotels = await db.collection('hotels').find({}).toArray();
  //   return NextResponse.json(hotels);
  // } catch (error: any) {
  //   console.log(error.message);
  //   NextResponse.json(error.message);
  // }
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        contact: true, // Include the related contact
        room: true, // Include all related rooms
      },
    });
    console.log(hotels);
    return NextResponse.json(hotels);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const client = await clientPromise;
    // const db: any = client.db('stay');
    const reqData: any = await req.json();
    console.log('req: ', reqData);
    // const name = data.name;
    console.log(reqData.rating);
    const newHotel = await prisma.hotel.create({
      data: {
        name: reqData.name,
        city: reqData.city,
        image: reqData.image,
        // rating: parseFloat(reqData.rating),
        rating: 5.0,
        // rating_count: reqData.ratingCount,
        rating_count: 0,
        packages: reqData.packages,
        description: reqData.description,
        contact: {
          create: {
            number: reqData.contact.number,
            email: reqData.contact.email,
          },
        },
        room: {
          create: reqData.room.map((room: any) => ({
            name: room.name,
            people: parseInt(room.people, 10),
            size: parseInt(room.size, 10),
            beds: parseInt(room.beds, 10),
            bathroom: parseInt(room.bathroom, 10),
            image: room.image,
            available: room.available ? Boolean(room.available) : false,
            price: parseInt(room.price, 10),
            // rating: parseFloat(room.rating),
            rating: 5.0,
            // rating_count: parseInt(room.ratingCount),
            rating_count: 0,
            package: room.package,
          })),
        },
      },
      include: {
        contact: true,
        room: true,
      },
    });
    if (!newHotel) {
      return NextResponse.json(
        { error: 'Error creating hotel' },
        { status: 500 }
      );
      // throw new Error
    }
    return NextResponse.json(newHotel, { status: 200 });
  } catch (error: any) {
    console.log('error creating hotel: ' + error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
