import { json } from '@sveltejs/kit';
import { getBooks } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const books = await getBooks();

    return json(books);
  } catch (err) {
    
    console.error('❌ Fehler in /api/books:', err);

    return json({ error: 'Fehler beim Laden der Bücher' }, { status: 500 });
  }
};
