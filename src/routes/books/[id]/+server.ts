import { json } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'leseverwaltung';

let isConnected = false;

export async function DELETE({ params }) {
  try {
    
    if (!isConnected) {
      await client.connect(); 
      isConnected = true;
    }
    const db = client.db(dbName);
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return json({ error: 'Ungültige ID' }, { status: 400 }); 
    }

    const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return json({ error: 'Buch nicht gefunden' }, { status: 404 }); 
    }
    
    return json({ success: true });
  } catch (err) {
    
    console.error('Fehler beim Löschen:', err);
    return json({ error: 'Serverfehler beim Löschen' }, { status: 500 }); 
  }
}
