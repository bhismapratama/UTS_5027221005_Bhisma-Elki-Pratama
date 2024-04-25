require('dotenv').config();

import * as mongo from 'mongodb'

export const collections: { users? : mongo.Collection} = {}

export async function databaseConnection () {
  const mongoURI = process.env.PUBLIC_URI_IS

  if (!mongoURI) {
    throw new Error('MongoDB URI is not provided in environment variables.');
  }

  const client : mongo.MongoClient = new mongo.MongoClient(mongoURI)

  const db : mongo.Db = client.db("grpc")

  const userCollection : mongo.Collection = db.collection('user')  
  collections.users = userCollection

  console.log("Succes connection to database")
}
