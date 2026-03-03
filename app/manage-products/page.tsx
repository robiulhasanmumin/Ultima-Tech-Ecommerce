import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ManageProductsTable } from '@/components/dashboard/manage-products-table'

export const metadata = {
  title: 'Manage Products | Ultima-Tech',
  description: 'Manage your Ultima-Tech product catalog.',
}

export default function ManageProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <ManageProductsTable />
      </main>
      <Footer />
    </>
  )
}
