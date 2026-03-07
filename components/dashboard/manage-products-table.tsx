'use client'

import { useState, useEffect } from 'react'  
import Link from 'next/link'
import { LayoutDashboard, Eye, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
 
export function ManageProductsTable() {
   const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

   const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Fetching error:', error)
    } finally {
      setIsLoading(false)
    }
  }

   useEffect(() => {
    fetchProducts()
  }, [])

   const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${title}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff'
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/products/${id}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Product has been removed.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          })
           setProducts(prev => prev.filter(item => item.id !== id))
        } else {
          Swal.fire('Error', 'Failed to delete product.', 'error')
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong.', 'error')
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <LayoutDashboard className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Products</h1>
        <p className="mt-2 text-muted-foreground">
          View, inspect, and manage all products in your catalog.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Table Header */}
          <div className="hidden border-b border-border bg-secondary/50 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
            <span className="col-span-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Product Name
            </span>
            <span className="col-span-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </span>
            <span className="col-span-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Price
            </span>
            <span className="col-span-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Actions
            </span>
          </div>

          {/* Table Rows */}
          {products.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-muted-foreground">No products found. Add your first product!</p>
              <Link
                href="/add-product"
                className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
              >
                Add Product
              </Link>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 gap-2 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/30 md:grid-cols-12 md:items-center md:gap-4"
              >
                <div className="col-span-5">
                  <p className="font-medium text-card-foreground">{product.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground md:hidden">{product.category}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {product.category}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-semibold text-card-foreground">${product.price}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <Link
                    href={`/shop/${product.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-destructive transition-all duration-300 hover:border-destructive/50 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}