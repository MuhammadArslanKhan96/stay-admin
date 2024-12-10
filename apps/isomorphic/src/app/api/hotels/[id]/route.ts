// import { NextResponse } from 'next/server';
import clientPromise from '../lib';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const client = await clientPromise;
    const db: any = client.db('staychain');
    const data: any = await req.json();
    console.log(data.name);
    const updatedHotel = await db
      .collection('hotels')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );
    return NextResponse.json(updatedHotel);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const client = await clientPromise;
  const db: any = client.db('staychain');
  try {
    const existingHotel = await db
      .collection('hotels')
      .findOne({ _id: new ObjectId(id) });
    console.log('hotel found');
  } catch (error) {
    NextResponse.json('no hotel found');
  }
  try {
    const deletedHotel = await db
      .collection('hotels')
      .findOneAndDelete({ _id: new ObjectId(id) });
    console.log(deletedHotel);
    return NextResponse.json(deletedHotel);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const client = await clientPromise;
    const db = client.db('staychain');
    const hotels = await db
      .collection('hotels')
      .findOne({ _id: new ObjectId(id) });
    return NextResponse.json(hotels);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}
