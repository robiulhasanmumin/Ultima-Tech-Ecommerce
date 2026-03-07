'use client'

import { useState, useEffect } from 'react'
import { Search, ArrowRight, Tag, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'  

export default function ShopContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
   const categoryFromUrl = searchParams.get('category') || 'All'

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)  

  const categories = ['All', 'Audio', 'Wearables', 'Computing']

   const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    if (cat === 'All') {
      router.push('/shop')  
    } else {
      router.push(`?category=${cat}`)
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">The Shop</p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Explore Innovation
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Browse our curated collection of premium tech gadgets.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm text-card-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}  
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div
            key={product.id || product._id}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
              <Image
                src={product.image || '/images/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{product.title}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" /> {product.category}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  ${product.price}
                </span>
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {product.bio}
              </p>
              <Link
                href={`/shop/${product.id || product._id}`}
                className="group/btn mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:gap-3"
              >
                View Details
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  )
}