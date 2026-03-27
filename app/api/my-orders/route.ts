import { NextResponse } from 'next/server';
import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";  

export async function GET(req) {
  try {
     const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

     const ordersCollection = await dbConnect(collections.MYORDERS);

     const userOrders = await ordersCollection
      .find({ email: session.user.email })
      .sort({ createdAt: -1 }) 
      .toArray();

    return NextResponse.json(userOrders, { status: 200 });

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}