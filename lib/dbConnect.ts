import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// কানেকশন প্রমিজটি ধরে রাখার জন্য
let clientPromise;

export const dbConnect = async (cname) => {
  // যদি আগে থেকে কানেক্ট না থাকে, তবে কানেক্ট করবে
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName).collection(cname);
};

export const collections = {
  USERS: "users",
  PRODUCTS: "products"
};