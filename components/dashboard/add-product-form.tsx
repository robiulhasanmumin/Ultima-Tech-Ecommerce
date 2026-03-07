'use client'

import { useState } from 'react'
import { PlusCircle, Type, FileText, DollarSign, ImageIcon, AlignLeft, Tag, CheckCircle2 } from 'lucide-react'
import Swal from 'sweetalert2' 
import { useRouter } from 'next/navigation'
 

export function AddProductForm() {
  const router = useRouter()  
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    bio: '',
    description: '',
    price: '',
    image: '',
    category: 'Audio',
    inStock: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: e.target.checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const submissionData = {
      ...form,
      price: parseInt(form.price)
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })

      if (res.ok) {
         Swal.fire({
          title: 'Success!',
          text: 'Product added successfully!',
          icon: 'success',
          confirmButtonColor: '#4f46e5',  
        }).then((result)=>{
          if(result.isConfirmed || result.isDismissed){
            router.push("/manage-products")
          }
        })

        setForm({ 
          title: '', 
          bio: '', 
          description: '', 
          price: '', 
          image: '', 
          category: 'Audio', 
          inStock: true 
        })
        router.refresh()  
      } else {
        const errorData = await res.json()
        // ৩. এরর এলার্ট
        Swal.fire({
          title: 'Error!',
          text: errorData.error || 'Failed to add product.',
          icon: 'error',
          confirmButtonColor: '#ef4444',
        })
      }
    } catch {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please check your connection.',
        icon: 'warning',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl">
        <div className="bg-[radial-gradient(ellipse_at_top,_#4f46e520_0%,_transparent_70%)] p-8">
          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <PlusCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">Add New Product</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the details below to add a new product to the store.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-card-foreground">Product Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="title" name="title" value={form.title} onChange={handleChange}
                  placeholder="e.g. Nova Pro Headphones"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Category & Price Row */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-medium text-card-foreground">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="category" name="category" value={form.category} onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Computing">Computing</option>
                    <option value="Wearables">Wearables</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-sm font-medium text-card-foreground">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange}
                    placeholder="299"
                    className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="bio" className="text-sm font-medium text-card-foreground">Short Bio</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="bio" name="bio" value={form.bio} onChange={handleChange}
                  placeholder="A brief one-liner about the product"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-card-foreground">Full Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <textarea
                  id="description" name="description" value={form.description} onChange={handleChange}
                  placeholder="Detailed product description..." rows={3}
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Image URL & Stock Status */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-sm font-medium text-card-foreground">Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="image" name="image" value={form.image} onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-card-foreground">Availability</label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3 transition-colors hover:border-primary/50">
                  <input
                    type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
                  />
                  <span className="flex items-center gap-2 text-sm text-secondary-foreground font-medium">
                    <CheckCircle2 className={`h-4 w-4 ${form.inStock ? 'text-primary' : 'text-muted-foreground'}`} />
                    In Stock
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit" disabled={loading} 
              className="mt-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}