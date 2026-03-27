import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { collections, dbConnect } from '@/lib/dbConnect';
 
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const favCollection = await dbConnect(collections.MYFAVORITES);  
    
    await favCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Removed from favorites" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove" }, { status: 500 });
  }
}