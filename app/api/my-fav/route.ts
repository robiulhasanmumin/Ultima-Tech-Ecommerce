import { NextResponse } from 'next/server';
import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Please login first" }, { status: 401 });
    }

    const body = await req.json();
    const favCollection = await dbConnect(collections.MYFAVORITES);

     const isExist = await favCollection.findOne({ 
      productId: body.productId, 
      email: session.user.email 
    });

    if (isExist) {
      return NextResponse.json({ message: "Already in wishlist" }, { status: 400 });
    }

     await favCollection.insertOne({ 
      ...body, 
      email: session.user.email,
      createdAt: new Date() 
    });

    return NextResponse.json({ message: "Added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

 export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json([]);

    const favCollection = await dbConnect(collections.MYFAVORITES);
    const data = await favCollection.find({ email: session.user.email }).toArray();
    return NextResponse.json(data);
}