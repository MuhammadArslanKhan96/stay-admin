// import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';
import clientPromise from '../lib';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reqData: any = await req.json();
  const hotelId = params.id.toString();
  let hotel: any;
  try {
    hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        contact: true,
        room: true,
      },
    });
    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel does note exist' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Hotel does note exist' },
      { status: 404 }
    );
  }
  // rating: parseFloat(reqData.rating),
  // rating_count: reqData.ratingCount,
  try {
    console.log('contact: ', hotel.contact.id);
    const updatedHotel = await prisma.hotel.upsert({
      where: { id: hotelId },
      create: {
        name: reqData.name,
        city: reqData.city,
        image: reqData.image,
        rating: 5.0,
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
            // rating_count: parseInt(room.ratingCount),
            rating: 5.0,
            rating_count: 0,
            package: room.package,
          })),
        },
      },
      update: {
        name: reqData.name,
        city: reqData.city,
        image: reqData.image,
        packages: reqData.packages,
        description: reqData.description,
        contact: {
          update: {
            where: {
              id: hotel.contact.id,
            },
            data: {
              number: reqData.contact.number,
              email: reqData.contact.email,
            },
          },
        },
        room: {
          upsert: reqData.room.map((room: any, index: number) => ({
            where: {
              id: hotel.room[index]?.id ? hotel.room[index]?.id : '',
            },
            create: {
              name: room.name,
              people: parseInt(room.people, 10),
              size: parseInt(room.size, 10),
              beds: parseInt(room.beds, 10),
              bathroom: parseInt(room.bathroom, 10),
              image: room.image,
              available: room.available ? Boolean(room.available) : false,
              price: parseInt(room.price, 10),
              rating: 5.0,
              rating_count: 0,
              package: room.package,
            },
            update: {
              name: room.name,
              people: parseInt(room.people, 10),
              size: parseInt(room.size, 10),
              beds: parseInt(room.beds, 10),
              bathroom: parseInt(room.bathroom, 10),
              image: room.image,
              available: room.available ? Boolean(room.available) : false,
              price: parseInt(room.price, 10),
              package: room.package,
            },
          })),
        },
      },
      include: {
        contact: true,
        room: true,
      },
    });
    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}
// rating: parseFloat(room.rating),
// rating_count: parseInt(room.ratingCount),

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const hotelId = params.id;
  console.log(hotelId);
  let hotel: any;
  try {
    hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        contact: true,
        room: true,
      },
    });
    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel does not exist' },
        { status: 404 }
      );
    } else {
      console.log('hotel found. deleteing...');
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Hotel does not exist' + error.message },
      { status: 404 }
    );
  }
  try {
    hotel = await prisma.hotel.delete({
      where: {
        id: hotelId,
      },
    });
    console.log(hotel);
    return NextResponse.json(hotel, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Could not delete the hotel: ' + error.message },
      { status: 500 }
    );
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //   console.log(req.body);
  const hotelId = params.id;
  console.log(hotelId);
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        contact: true,
        room: true,
      },
    });
    if (!hotel || hotel == undefined || hotel == null) {
      return NextResponse.json(
        { error: 'requested hotel does not exist' },
        { status: 404 }
      );
    } else {
      console.log(hotel);
      return NextResponse.json(hotel, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'An error occoured: ' + error.message },
      { status: 500 }
    );
  }
}
