import { NextResponse } from 'next/server'
import { dbConnect, collections } from '@/lib/dbConnect'
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const productsCollection = await dbConnect(collections.PRODUCTS)
    const products = await productsCollection.find({}).toArray()
    
     const formattedProducts = products.map(p => ({
      ...p,
      id: p._id.toString(),
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}


 
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, price, image, category, bio, description, inStock } = body

    // Validation
    if (!title || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const productsCollection = await dbConnect(collections.PRODUCTS)
    
    const newProduct = {
      title,
      price: Number(price),
      image: image || '/images/placeholder.jpg',
      category,
      bio,
      description,
      inStock: inStock ?? true,
      createdAt: new Date(),
    }

    const result = await productsCollection.insertOne(newProduct)

    return NextResponse.json({ message: 'Product added successfully', id: result.insertedId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}


