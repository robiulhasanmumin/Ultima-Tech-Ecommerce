import { NextResponse } from 'next/server'
import { getProducts, addProduct } from '@/lib/products'

export async function GET() {
  const products = getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = addProduct({
      title: body.title,
      bio: body.bio,
      description: body.description,
      price: Number(body.price),
      image: body.image || '/images/product-headphones.jpg',
      category: body.category || 'Computing',
      inStock: true,
    })
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 400 })
  }
}
