import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { dbConnect, collections } from '@/lib/dbConnect'  

export async function Trending() {
  let trendingProducts = [];

  try {
    const productsCollection = await dbConnect(collections.PRODUCTS);
    
     const data = await productsCollection
      .find({})
      .sort({ price: -1 }) 
      .limit(4)
      .toArray();

     trendingProducts = data.map(product => ({
      ...product,
      id: product._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch trending products:", error);
  }

   if (trendingProducts.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Popular</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Trending Products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map((product: any) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <Image
                  src={product.image || '/images/placeholder.jpg'}  
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Link
                  href={`/shop/${product.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                >
                  <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                    <Eye className="h-4 w-4" />
                    Quick View
                  </span>
                </Link>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start gap-2">
                   <div>
                      <h3 className="text-sm font-semibold text-card-foreground">{product.title}</h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                   </div>
                   <p className="text-lg font-bold text-primary">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}