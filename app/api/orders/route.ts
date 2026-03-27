import { NextResponse } from 'next/server';
import { dbConnect, collections } from '@/lib/dbConnect';
import nodemailer from 'nodemailer';
 
export async function POST(req: Request) {
  try {
    const orderData = await req.json();

     const ordersCollection = await dbConnect(collections.MYORDERS);
    const result = await ordersCollection.insertOne({
      ...orderData,
      createdAt: new Date(),
    });

     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

     const mailOptions = {
      from: `"Ultima Tech" <${process.env.EMAIL_USER}>`,
      to: orderData.email,  
      subject: `Confirming your order #${result.insertedId.toString().slice(-6)} - Ultima Tech`,
      html: `
        <div style="background-color: #f9fafb; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <div style="background-color: #0f172a; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">
                ULTIMA<span style="color: #4f46e5;">-TECH</span>
              </h1>
              <p style="color: #94a3b8; margin-top: 5px; font-size: 14px;">Premium Tech Gadgets Store</p>
            </div>

            <div style="padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background-color: #ecfdf5; color: #059669; display: inline-block; padding: 8px 16px; border-radius: 99px; font-size: 14px; font-weight: 600;">
                  Order Confirmed
                </div>
                <h2 style="color: #1e293b; margin-top: 15px;">Thank you for your purchase!</h2>
                <p style="color: #64748b;">We've received your order and we'll notify you when it ships.</p>
              </div>

              <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #1e293b; margin-top: 0; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">Product</td>
                    <td style="padding: 10px 0; text-align: right; color: #1e293b; font-weight: 600;">${orderData.productTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">Quantity</td>
                    <td style="padding: 10px 0; text-align: right; color: #1e293b;">x${orderData.quantity}</td>
                  </tr>
<tr>
  <td style="padding: 10px 0; color: #64748b;">Product Price</td>
  <td style="padding: 10px 0; text-align: right; color: #1e293b;">
    ${orderData.totalPrice - orderData.shippingFee}৳
  </td>
</tr>
<tr>
  <td style="padding: 10px 0; color: #64748b;">Shipping Fee</td>
  <td style="padding: 10px 0; text-align: right; color: #1e293b;">
    ${orderData.shippingFee}৳
  </td>
</tr>
                  <tr style="border-top: 2px solid #f1f5f9;">
                    <td style="padding: 15px 0 0 0; color: #1e293b; font-weight: bold; font-size: 18px;">Total Amount</td>
                    <td style="padding: 15px 0 0 0; text-align: right; color: #4f46e5; font-weight: bold; font-size: 20px;">${orderData.totalPrice}৳</td>
                  </tr>
                </table>
              </div>

              <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px;">
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                  <h4 style="color: #1e293b; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Address</h4>
                  <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.5;">
                    <strong>${orderData.customerName}</strong><br>
                    ${orderData.address}<br>
                    ${orderData.city}<br>
                    Phone: ${orderData.phone}
                  </p>
                </div>
              </div>

              <div style="margin-top: 40px; text-align: center; border-top: 1px solid #e2e8f0; pt: 30px;">
                <p style="color: #94a3b8; font-size: 12px;">
                  &copy; 2026 Ultima-Tech. All rights reserved.<br>
                  This is an automated email. Please do not reply directly to this message.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    };


     await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Order placed & invoice sent!", 
      id: result.insertedId 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}