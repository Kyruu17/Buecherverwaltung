import { ObjectId, MongoClient } from 'mongodb';
import type { RequestHandler } from './$types';

const uri = 'mongodb://127.0.0.1:27017';
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

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, author, status, tagIds } = await request.json();
    if (!title || !author || !status) {
      return new Response('Fehlende Felder', { status: 400 }); 
    }
    const db = await connectDb();

    await db.collection('books').insertOne({
      title,
      author,
      status,
      tagIds: (tagIds || []).map((id: string) => new ObjectId(id)),
      createdAt: new Date() 
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    
    console.error('❌ Fehler beim Speichern des Buches:', err);
    return new Response('Serverfehler beim Speichern', { status: 500 });
  }
};

