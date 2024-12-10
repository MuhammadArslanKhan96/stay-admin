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
    NextResponse.json(error.message);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const client = await clientPromise;
    // const db: any = client.db('stay');
    const reqData: any = await req.json();
    console.log('req: ', reqData);
    // const name = data.name;
    // console.log(name);
    const newHotel = await prisma.hotel.create({
      data: {
        name: reqData.name,
        city: reqData.city,
        image: reqData.image,
        contact: {
          create: {
            number: reqData.contact.number,
            email: reqData.contact.email,
          },
        },
        room: {
          create: reqData.rooms.map((room: any) => ({
            name: room.name,
            people: parseInt(room.people, 10),
            size: parseInt(room.size, 10),
            beds: parseInt(room.beds, 10),
            bathroom: parseInt(room.bathrooms, 10),
            image: room.image,
            available: room.available ? Boolean(room.available) : false,
            price: parseInt(room.price, 10),
          })),
        },
      },
      include: {
        contact: true,
        room: true,
      },
    });
    // const newHot = await db.collection('hotels').insertOne({
    //   name: data.name,
    //   city: data.city,
    //   images: {
    //     main: data.images.main,
    //     supporting: data.images.supporting,
    //   },
    //   contact: {
    //     number: data.contact.number,
    //     email: data.contact.email,
    //   },
    //   rooms: data.rooms,
    // });
    return NextResponse.json(newHotel);
  } catch (error: any) {
    console.log('error creating hotel: ' + error.message);
    NextResponse.json({
      error: error.message,
    });
  }
}
