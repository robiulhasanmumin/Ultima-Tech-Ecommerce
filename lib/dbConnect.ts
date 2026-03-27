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

 let clientPromise;

export const dbConnect = async (cname) => {
   if (!clientPromise) {
    clientPromise = client.connect();
  }
  
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName).collection(cname);
};

export const collections = {
  USERS: "users",
  PRODUCTS: "products",
  MYFAVORITES: "myfavorites",
  MYORDERS: "myorders"
};