"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Minus, Plus, Truck, ShieldCheck, ArrowLeft } from 'lucide-react'
import Swal from 'sweetalert2'
import type { Product } from '@/lib/products'

const Order = ({ id }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [orderLoading, setOrderLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
   const [shipping, setShipping] = useState(50) 
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: ''
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) throw new Error('Product not found')
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

   const subtotal = product ? product.price * quantity : 0
  const total = subtotal + shipping

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(prev => prev + 1)
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1)
  }

   const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "Inside Dhaka (50৳)") {
      setShipping(50);
    } else {
      setShipping(120);
    }
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setOrderLoading(true)

    const orderDetails = {
      customerName: session?.user?.name,
      email: session?.user?.email,
      productId: product?._id,
      productTitle: product?.title,
      image: product?.image,
      quantity,
      shippingFee: shipping,  
      totalPrice: total,
      address: formData.address,
      phone: formData.phone,
      city: formData.city,
      status: 'Pending',
      date: new Date()
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
      })

      if (res.ok) {
        Swal.fire({
          title: 'Order Placed!',
          text: 'Your order has been received successfully.',
          icon: 'success',
          confirmButtonColor: '#4f46e5'
        })
        router.push('/my-orders')
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'error')
    } finally {
      setOrderLoading(false)
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )

  if (!product) return <div className="text-center py-20 font-bold">Product not found!</div>

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl mt-20">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Product
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/20">
                  <Image src={product?.image || ''} alt="product" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-sm leading-tight line-clamp-2">{product?.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">${product?.price}</p>
                  
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => handleQuantity('dec')} className="rounded-md border p-1 hover:bg-secondary transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                    <button onClick={() => handleQuantity('inc')} className="rounded-md border p-1 hover:bg-secondary transition-colors"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping Fee</span>
                   <span className="font-semibold text-foreground">${shipping}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                  <span>Total Payable</span>
                  <span className="text-primary">${total}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Fast Delivery within 2-3 days</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Secure Payment & Data Protection</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <form onSubmit={handleOrder} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/70">Full Name</label>
                    <input type="text" value={session?.user?.name || ''} disabled className="w-full rounded-xl border border-border bg-secondary/30 p-3 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/70">Email Address</label>
                    <input type="email" value={session?.user?.email || ''} disabled className="w-full rounded-xl border border-border bg-secondary/30 p-3 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Phone Number</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="017XXXXXXXX"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">City</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Dhaka"
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Delivery Area</label>
                     <select 
                      onChange={handleShippingChange}
                      className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none"
                    >
                      <option value="Inside Dhaka (50৳)">Inside Dhaka (50৳)</option>
                      <option value="Outside Dhaka (120৳)">Outside Dhaka (120৳)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Address</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="House no, Road no, Area..."
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                  />
                </div>

                <button 
                  disabled={orderLoading}
                  className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {orderLoading ? 'Processing Order...' : 'Confirm Order Now'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Order;