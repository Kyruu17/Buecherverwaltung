import { getBookById } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const book = await getBookById(params.id);

  if (!book) throw error(404, 'Buch nicht gefunden');

  return { book };
};

