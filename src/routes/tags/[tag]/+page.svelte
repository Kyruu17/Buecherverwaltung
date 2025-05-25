<script lang="ts">
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';
  const data = derived(page, ($p) => $p.data);
</script>

<h1>📚 Bücher mit Tag: <em>{$data.tag}</em></h1>

{#if $data.books.length > 0}
  <ul>
    {#each $data.books as book}
      <li>
        <a href={`/books/${book._id}`}>{book.title}</a> von {book.author}
      </li>
    {/each}
  </ul>
{:else}
  <p>❌ Keine Bücher mit diesem Tag gefunden.</p>
{/if}

<style>
  a {
    color: #1e3a8a;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  em {
    font-weight: bold;
  }
</style>

