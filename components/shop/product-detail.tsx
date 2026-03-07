'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'  
import useSWR from 'swr'
import Swal from 'sweetalert2' 
import { ArrowLeft, CheckCircle, XCircle, Tag } from 'lucide-react'
import type { Product } from '@/lib/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ProductDetail({ id }: { id: string }) {
  const router = useRouter() // Router instance
  const { data: product, error, isLoading } = useSWR<Product>(`/api/products/${id}`, fetcher)

   const handleAddToCart = () => {
    Swal.fire({
      title: 'Success!',
      text: `${product?.title} has been added to your cart.`,
      icon: 'success',
      confirmButtonColor: '#3b82f6',  
      timer: 2000,
      showConfirmButton: false,
     })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error || !product || product.title === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
        <p className="mt-2 text-muted-foreground">The product you are looking for does not exist.</p>
        <button
          onClick={() => router.back()}  
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card"
              >
                <Image
                  src={product.image}
                  alt={`${product.title} view ${i}`}
                  fill
                  className="object-cover opacity-60"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {product.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{product.bio}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">In Stock</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">Out of Stock</span>
              </>
            )}
          </div>

          <div className="h-px bg-border" />

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleAddToCart} // Click handler
              className="flex-1 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-border px-8 py-3.5 text-center text-sm font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-secondary flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}