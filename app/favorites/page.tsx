import { Footer } from '@/components/footer'
import MyFavourite from '@/components/my-order/MyFavourite'
import { Navbar } from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <div>
      <MyFavourite />
      </div>
      <Footer />
    </div>
  )
}

export default page