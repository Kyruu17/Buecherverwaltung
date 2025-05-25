import { getBooks } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

function isValidDate(value: unknown): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}


export const load: PageServerLoad = async () => {
  try {
    const books = await getBooks();


    const gelesen = books.filter((b) => b.status === 'gelesen').length;
    const amLesen = books.filter((b) => b.status === 'am_lesen').length;
    const offen = books.filter((b) => !b.status || b.status === 'offen').length;


    const recent = [...books]
      .filter((b) => b.createdAt && isValidDate(new Date(b.createdAt)))
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() -
          new Date(a.createdAt!).getTime()
      )
      .slice(0, 3); 

      const random = books.length > 0
      ? books[Math.floor(Math.random() * books.length)]
      : null;

        return {
      stats: {
        total: books.length,  
        gelesen,                
        amLesen,               
        offen                  
      },
      tipp: random,             
      recent                    
    };

   } catch (err) {
    console.error('❌ Fehler beim Laden der Bücher in +page.server.ts:', err);
    throw error(500, 'Interner Serverfehler beim Laden der Bücher');
  }
};


