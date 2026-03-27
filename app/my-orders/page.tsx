import { Footer } from '@/components/footer'
import MyOrder from '@/components/my-order/MyOrder'
import { Navbar } from '@/components/navbar'
import React from 'react'

const MyOrderPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <MyOrder />
      </div>
      <Footer />
    </div>
  )
}

export default MyOrderPage