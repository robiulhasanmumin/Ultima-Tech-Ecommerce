"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

const MyFavourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/my-fav'); 
      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFavorites(); }, []);

const removeFavorite = async (id: string) => {
     const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from your wishlist?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',  
      cancelButtonColor: '#1e293b',
      confirmButtonText: 'Yes, remove it!',
      background: '#0f172a',
      color: '#fff',
      customClass: {
        popup: 'rounded-3xl border border-slate-800',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold'
      }
    });

     if (result.isConfirmed) {
      const res = await fetch(`/api/my-fav/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFavorites(favorites.filter((item: any) => item._id !== id));
        
         Swal.fire({
            icon: 'success',
          title: 'Removed from favorites',
          showConfirmButton: false,
          timer: 1500,
          background: '#0f172a',
          color: '#fff'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Could not remove the item.',
          icon: 'error',
          background: '#0f172a',
          color: '#fff'
        });
      }
    }
  };



  if (loading) return <div className="text-center text-4xl py-40 mt-40 animate-pulse text-muted-foreground">Loading wishlist...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-32 px-4 mb-20">
      <div className="flex items-center justify-between mb-10 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500 h-8 w-8 fill-red-500" />
          <h1 className="md:text-4xl text-3xl font-extrabold tracking-tight text-foreground">
            My <span className='text-primary'>Wishlist</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-medium">{favorites.length} Items saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-3xl border border-border">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground text-lg mb-6">Your wishlist is empty!</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item: any) => (
            <div key={item._id} className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-300">
              {/* Product Image */}
              <div className="relative h-64 w-full bg-secondary overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <button 
                  onClick={() => removeFavorite(item._id)}
                  className="absolute top-4 right-4 p-2.5 bg-background/80 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-foreground line-clamp-1">{item.title}</h3>
                  <span className="text-primary font-bold text-lg">${item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{item.description}</p>
                
 <Link 
  href={`/shop/${item.productId}`}  
  className="w-full flex items-center justify-center gap-2 py-3.5 bg-secondary text-foreground font-bold rounded-2xl hover:bg-primary hover:text-white transition-all border border-border group-hover:border-primary"
>
  <ShoppingCart size={18} /> View Details
</Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavourite;