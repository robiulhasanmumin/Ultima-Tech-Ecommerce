import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

// GET Method
export async function GET(request, context) {
  try {
    const { id } = await context.params;
     const productsCollection = await dbConnect(collections.PRODUCTS);

    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      id: product._id.toString()
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE Method
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;  

     const productsCollection = await dbConnect(collections.PRODUCTS);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}