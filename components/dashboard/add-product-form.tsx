'use client'

import { useState } from 'react'
import { PlusCircle, Type, FileText, DollarSign, ImageIcon, AlignLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export function AddProductForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    bio: '',
    description: '',
    price: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('Product added successfully!')
        setForm({ title: '', bio: '', description: '', price: '', image: '' })
      } else {
        toast.error('Failed to add product.')
      }
    } catch {
      toast.error('Something went wrong.')
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
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-card-foreground">
                Product Title
              </label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Nova Pro Headphones"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="bio" className="text-sm font-medium text-card-foreground">
                Short Bio
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="A brief one-liner about the product"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-card-foreground">
                Full Description
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Detailed product description with features and specs..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-sm font-medium text-card-foreground">
                  Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="299"
                    className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-sm font-medium text-card-foreground">
                  Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://... (optional)"
                    className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
