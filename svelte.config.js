import preprocess from 'svelte-preprocess'; 
import adapter from '@sveltejs/adapter-netlify';
export default {
kit: {
adapter: adapter({
edge: false,
split: false
}),
 prerender: {
      handleHttpError: 'warn' // <--- DAS IST DER FIX
    }
}
};
