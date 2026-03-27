// app/order/[id]/page.tsx
import { Footer } from '@/components/footer'
import Order from '@/components/my-order/Order'
import { Navbar } from '@/components/navbar'
import React from 'react'

 const page = async ({ params }) => {
   const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh]">
         <Order id={id} />
      </div>
      <Footer />
    </div>
  )
}

export default page;