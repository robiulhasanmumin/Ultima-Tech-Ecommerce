import { dbConnect, collections } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
     const body = await req.json();
    const { name, email, password } = body;

     if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, Email and Password are required" },
        { status: 400 }
      );
    }

     const usersCollection = await dbConnect(collections.USERS);

     const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists with this email!" },
        { status: 400 }
      );
    }

    // ৪. পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৫. নতুন ইউজার অবজেক্ট তৈরি
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

     const result = await usersCollection.insertOne(newUser);

     return NextResponse.json(
      { 
        message: "Registration successful", 
        id: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error: any) {
     console.error("Registration Error:", error);

    return NextResponse.json(
      { 
        message: error.message || "Internal Server Error" 
      },
      { status: 500 }
    );
  }
}