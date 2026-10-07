import { betterAuth, string } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db("bangla-news-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  }, 
  trustedOrigins: [
  "http://localhost:3000",
  "http://192.168.0.104:3000",
],
});