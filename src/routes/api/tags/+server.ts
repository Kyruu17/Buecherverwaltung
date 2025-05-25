import { json, type RequestHandler } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'leseverwaltung';

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await client.connect();     
    isConnected = true;         
  }
  return client.db(dbName);     
}

export const GET: RequestHandler = async () => {
  try {
    const db = await connectDB();                           
    const tags = await db.collection('tags').find().toArray(); 
    return json(tags);                                      
  } catch (error) {
    console.error('Fehler beim Laden der Tags:', error);    
    return new Response('Fehler beim Laden der Tags', { status: 500 }); 
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const db = await connectDB();                   
    const data = await request.json();              

    if (!data.name || typeof data.name !== 'string') {
      return new Response('Ungültiger Tag-Name', { status: 400 });
    }

    const result = await db.collection('tags').insertOne({
      name: data.name.trim()                        
    });

    return json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Fehler beim Speichern des Tags:', error);
    return new Response('Fehler beim Speichern', { status: 500 }); 
  }
};

