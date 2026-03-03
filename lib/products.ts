export interface Product {
  id: string
  title: string
  bio: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

const defaultProducts: Product[] = [
  {
    id: '1',
    title: 'Nova Pro Headphones',
    bio: 'Immersive sound with active noise cancellation',
    description:
      'Experience audio like never before with the Nova Pro Headphones. Featuring 40mm custom drivers, adaptive noise cancellation, and 30-hour battery life. Built with premium materials including memory foam ear cushions and an aerospace-grade aluminum headband for all-day comfort.',
    price: 349,
    image: '/images/product-headphones.jpg',
    category: 'Audio',
    inStock: true,
  },
  {
    id: '2',
    title: 'Zenith UltraBook',
    bio: 'Razor-thin performance powerhouse',
    description:
      'The Zenith UltraBook redefines portable computing. Powered by the latest M-series chip with 16GB unified memory and a stunning 14.2" Liquid Retina XDR display. At just 1.2kg, it delivers desktop-class performance with up to 18 hours of battery life.',
    price: 1999,
    image: '/images/product-laptop.jpg',
    category: 'Computing',
    inStock: true,
  },
  {
    id: '3',
    title: 'Aura Wireless Earbuds',
    bio: 'Crystal-clear audio in a compact design',
    description:
      'The Aura Wireless Earbuds deliver studio-quality sound in an ultra-compact form. With spatial audio, adaptive EQ, and seamless device switching. IPX5 water resistance and 8 hours of listening time make them perfect for any adventure.',
    price: 199,
    image: '/images/product-earbuds.jpg',
    category: 'Audio',
    inStock: true,
  },
  {
    id: '4',
    title: 'Slate Canvas Pro',
    bio: 'Create without boundaries on a stunning display',
    description:
      'The Slate Canvas Pro is a creative professional powerhouse. Featuring a 12.9" OLED display with ProMotion technology, Apple Pencil 2 support, and the M2 chip. Perfect for illustrators, designers, and anyone who demands the best in portable creativity.',
    price: 1299,
    image: '/images/product-tablet.jpg',
    category: 'Computing',
    inStock: false,
  },
  {
    id: '5',
    title: 'Echo Sphere Speaker',
    bio: 'Room-filling 360-degree spatial audio',
    description:
      'The Echo Sphere Speaker delivers a breathtaking 360-degree audio experience. With seven tweeters and a custom woofer, it adapts its sound to your room in real-time. Smart home integration, voice control, and a minimalist design make it the centerpiece of any space.',
    price: 449,
    image: '/images/product-speaker.jpg',
    category: 'Audio',
    inStock: true,
  },
  {
    id: '6',
    title: 'Pulse Fit Watch',
    bio: 'Advanced health tracking meets stunning design',
    description:
      'The Pulse Fit Watch is your ultimate health and fitness companion. Featuring an always-on AMOLED display, ECG monitoring, blood oxygen tracking, and GPS. With 7 days of battery life and 100+ workout modes, it keeps up with your active lifestyle.',
    price: 599,
    image: '/images/product-watch.jpg',
    category: 'Wearables',
    inStock: true,
  },
]

let products: Product[] = [...defaultProducts]

export function getProducts(): Product[] {
  return [...products]
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  }
  products = [newProduct, ...products]
  return newProduct
}

export function deleteProduct(id: string): boolean {
  const initialLength = products.length
  products = products.filter((p) => p.id !== id)
  return products.length < initialLength
}
