
import { getBooks } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  
  const books = await getBooks();  
  const tag = params.tag;
  const filtered = books.filter(
    (book) => Array.isArray(book.tags) && book.tags.includes(tag)
  );

  return { books: filtered, tag };
};

