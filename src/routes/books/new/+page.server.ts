import type { PageServerLoad } from './$types';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://buivas01:asdf1234@cluster.ftud5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
const client = new MongoClient(uri);
const dbName = 'leseverwaltung';
let isConnected = false;

async function connectDb() {
  if (!isConnected) {
    await client.connect(); 
    isConnected = true;     
  }
  return client.db(dbName); 
}

export const load: PageServerLoad = async () => {
  const db = await connectDb(); 
  const rawTags = await db.collection('tags').find().toArray();
  const tags = rawTags.map((tag) => ({
    ...tag,
    _id: tag._id.toString()
  }));

  console.log('📦 Tags (serialisiert):', tags);
 
  return { tags };
};

export const prerender = false;
