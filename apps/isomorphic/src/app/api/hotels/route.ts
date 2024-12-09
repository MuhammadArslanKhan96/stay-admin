import DnDTablePage from '@/app/(hydrogen)/tables/dnd/page';
import clientPromise from './lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('staychain');
    const hotels = await db.collection('hotels').find({}).toArray();
    return NextResponse.json(hotels);
  } catch (error: any) {
    console.log(error.message);
    NextResponse.json(error.message);
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db: any = client.db('staychain');
    const data: any = await req.json();
    console.log(data);
    const name = data.name;
    console.log(name);
    const newHotel = await db.collection('hotels').insertOne({
      name: data.name,
      city: data.city,
      images: {
        main: data.images.main,
        supporting: data.images.supporting,
      },
      contact: {
        number: data.contact.number,
        email: data.contact.email,
      },
      rooms: data.rooms,
    });
    return NextResponse.json(newHotel);
  } catch (error: any) {
    console.log('error: ' + error.message);
    NextResponse.json(error.message);
  }
}
