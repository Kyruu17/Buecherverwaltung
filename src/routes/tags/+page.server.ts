import { getTags } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const tags = await getTags();

  return { tags };
};
