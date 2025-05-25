import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'leseverwaltung';
const client = new MongoClient(uri);
let isConnected = false;

async function getDb() {
  if (!isConnected) {
    await client.connect();      
    isConnected = true;           
  }
  return client.db(dbName);       
}

export type Book = {
  _id: string;         
  title: string;       
  author: string;      
  status: string;      
  createdAt?: string;  
  tagIds?: string[];   
  tags?: string[];     
};

export async function getBooks(): Promise<Book[]> {
  const db = await getDb();
  const books = await db.collection('books').find().toArray();
  const tags = await db.collection('tags').find().toArray();
  
  const tagMap = new Map<string, string>();
  tags.forEach((tag: any) => {
    tagMap.set(tag._id.toString(), tag.name);
  });

  return books.map((book: any) => {
    const tagIds = Array.isArray(book.tagIds)
      ? book.tagIds.map((id: any) => id.toString())  
      : [];

    const tagNames = tagIds.map((id) => tagMap.get(id)).filter(Boolean); 

    return {
      ...book,
      _id: book._id.toString(),  
      tagIds,
      tags: tagNames,            
      status: book.status || 'offen',
      createdAt:
        book.createdAt instanceof Date
          ? book.createdAt.toISOString()
          : undefined
    };
  });
}

export async function getTags(): Promise<{ _id: string; name: string }[]> {
  const db = await getDb();
  const tags = await db.collection('tags').find().toArray();

  return tags.map((tag: any) => ({
    _id: tag._id.toString(),
    name: tag.name
  }));
}

export async function addTag(name: string) {
  const db = await getDb();
  await db.collection('tags').insertOne({ name }); 
}

export async function getBookById(id: string): Promise<Book | null> {
  const db = await getDb();

  if (!ObjectId.isValid(id)) return null;

  const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
  if (!book) return null;

  const tagIds = Array.isArray(book.tagIds)
    ? book.tagIds.map((id: any) => new ObjectId(id))
    : [];

  const tags = await db
    .collection('tags')
    .find({ _id: { $in: tagIds } })
    .toArray();
  
  return {
    ...book,
    _id: book._id.toString(),
    tagIds: tagIds.map((id: ObjectId) => id.toString()),
    tags: tags.map((t: any) => t.name),
    status: book.status || 'offen',
    createdAt:
      book.createdAt instanceof Date
        ? book.createdAt.toISOString()
        : undefined
  };
}
