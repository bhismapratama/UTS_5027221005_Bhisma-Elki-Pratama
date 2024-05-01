require('dotenv').config();

import { MongoClient, Db, Collection } from 'mongodb';

export const collections: { users?: Collection } = {};

export async function databaseConnection() {
  const mongoURI = process.env.PUBLIC_URI_IS;

  if (!mongoURI) {
    throw new Error('MongoDB URI is not provided in environment variables.');
  }

  const client: MongoClient = new MongoClient(mongoURI);

  try {
    await client.connect();

    const db: Db = client.db("grpc");

    const userCollection: Collection = db.collection('user');
    collections.users = userCollection;

    console.log("Succes connection to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}
