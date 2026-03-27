"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2, Edit3, Package, Truck, Clock, MapPin, Hash } from 'lucide-react';
import Swal from 'sweetalert2';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/my-orders');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

 
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: "Are you sure you want to remove this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/my-orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchOrders();
        Swal.fire('Deleted!', 'Order has been removed.', 'success');
      } else {
        Swal.fire('Error!', 'Could not delete order.', 'error');
      }
    }
  };

const handleEdit = async (order: any) => {
    const { value: formValues } = await Swal.fire({
      title: '<span style="color: #f8fafc; font-size: 24px; font-weight: 800;">Update Order</span>',
      background: '#0f172a',  
      html: `
        <div style="text-align: left; padding: 10px 5px;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">Quantity</label>
            <input id="swal-input1" type="number" 
              style="width: 100%; padding: 12px; background: #1e293b; border: 1px solid #334155; border-radius: 12px; color: white; font-size: 16px; outline: none; transition: border-color 0.2s;" 
              value="${order.quantity}" min="1" 
              onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#334155'">
          </div>
          
          <div>
            <label style="display: block; color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">Shipping Address</label>
            <textarea id="swal-input2" 
              style="width: 100%; padding: 12px; background: #1e293b; border: 1px solid #334155; border-radius: 12px; color: white; font-size: 15px; outline: none; min-height: 100px; resize: none; line-height: 1.5; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#334155'">${order.address}</textarea>
          </div>
          
          <div style="margin-top: 15px; padding: 12px; background: #1e293b/50; border-radius: 10px; border: 1px dashed #334155;">
             <p style="margin: 0; color: #64748b; font-size: 12px;">Note: Changing quantity will automatically recalculate your total bill.</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#1e293b',
      customClass: {
        popup: 'rounded-[24px] border border-slate-800',
        confirmButton: 'px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm',
        cancelButton: 'px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm border border-slate-700'
      },
      focusConfirm: false,
      preConfirm: () => {
        const q = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const a = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;
        if (!q || q < "1") {
          Swal.showValidationMessage('Please enter a valid quantity');
          return false;
        }
        if (!a || a.length < 5) {
          Swal.showValidationMessage('Please enter a detailed address');
          return false;
        }
        return { quantity: q, address: a }
      }
    });

    if (formValues) {
       const unitPrice = (order.totalPrice - order.shippingFee) / order.quantity;
      
      Swal.fire({
        title: 'Updating...',
        didOpen: () => { Swal.showLoading(); },
        background: '#0f172a',
        color: '#fff'
      });

      const res = await fetch(`/api/my-orders/${order._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: formValues.quantity,
          address: formValues.address,
          productPrice: unitPrice,
          shippingFee: order.shippingFee
        }),
      });

      if (res.ok) {
        fetchOrders();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Order updated successfully.',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#4f46e5',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong.',
          background: '#0f172a',
          color: '#fff'
        });
      }
    }
  };



  if (loading) return <div className="text-center py-40 text-4xl animate-pulse text-muted-foreground">Loading orders...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-32 px-4 mb-20">
       <div className="flex items-center gap-3 mb-10 border-b border-border pb-5">
        <Package className="text-primary h-9 w-9" />
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          My <span className='text-primary'>Orders</span>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-3xl border border-border">
          <Clock className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-stretch gap-6">
               <div className="p-7 flex-1 flex flex-col md:flex-row items-center gap-6">
                <div className="relative h-28 w-28 rounded-2xl overflow-hidden bg-secondary border border-border flex-shrink-0">
                  <Image 
                    src={order.image || '/placeholder-product.png'} 
                    alt={order.productTitle} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    ORDER #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <h3 className="font-bold text-xl text-foreground line-clamp-2">{order.productTitle}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Hash className="h-4 w-4" /> Quantity: <b>{order.quantity}</b></span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {order.address}, {order.city}</span>
                  </div>
                </div>
              </div>

               <div className="bg-secondary/30 p-7 md:w-80 flex-shrink-0 border-t md:border-t-0 md:border-l border-border space-y-5 flex flex-col justify-between">
                {/* <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                    order.status === 'Pending' ? 'bg-amber-950/50 text-amber-300 border border-amber-800/50' : 'bg-green-950/50 text-green-300 border border-green-800/50'
                  }`}>
                    {order.status}
                  </span>
                </div> */}

                <div className="space-y-2.5 bg-card p-4 rounded-xl border border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Item Price</span>
                    <span>${(order.totalPrice - order.shippingFee) / order.quantity} x {order.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                    <span>Shipping</span>
                    <span>${order.shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-1.5 border-t border-border">
                    <span>Total</span>
                    <span className='text-primary'>${order.totalPrice}</span>
                  </div>
                </div>

                 <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(order)}
                    className="flex-1 text-center py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Edit3 className="h-4 w-4" /> Update
                  </button>
                  <button 
                    onClick={() => handleDelete(order._id)}
                    className="flex-1 text-center py-2.5 bg-background text-red-400 rounded-lg hover:bg-red-950/30 transition-colors border border-red-900/50 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;