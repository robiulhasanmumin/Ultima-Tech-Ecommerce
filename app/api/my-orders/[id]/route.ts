import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { collections, dbConnect } from '@/lib/dbConnect';

 export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; 
    const ordersCollection = await dbConnect(collections.MYORDERS);
    
    const result = await ordersCollection.deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order cancelled" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

 export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;  
    const { quantity, address, productPrice, shippingFee } = await req.json();
    
    const newTotal = (Number(productPrice) * Number(quantity)) + Number(shippingFee);

    const ordersCollection = await dbConnect(collections.MYORDERS);
    
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          quantity: Number(quantity), 
          address: address,
          totalPrice: newTotal 
        } 
      }
    );

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}  