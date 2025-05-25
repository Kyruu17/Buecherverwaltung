<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { page } from '$app/stores';

  const query = writable('');
  const books = writable([]);

  const filtered = derived([books, query], ([booksVal, queryVal]) =>
    queryVal.length > 0
      ? booksVal.filter(
          (b) =>
            b.title.toLowerCase().includes(queryVal.toLowerCase()) ||
            b.author.toLowerCase().includes(queryVal.toLowerCase())
        )
      : []
  );

  onMount(async () => {
    const res = await fetch('/api/books');
    books.set(await res.json());
  });
  const data = derived(page, ($p) => $p.data);
</script>


<h1>Willkommen bei der Leseverwaltung 📚</h1>
<p>Organisiere deine Bücher, verfolge deinen Lesestatus und entdecke neue Klassiker der Literaturwelt.</p>

<input
  placeholder="Suche nach Titel oder Autor..."
  bind:value={$query}
  class="search"
/>

{#if $query && $filtered.length > 0}
  <ul>
    {#each $filtered as book}
      <li>{book.title} von {book.author}</li>
    {/each}
  </ul>
{:else if $query && $filtered.length === 0}
  <p>❌ Keine Treffer für "{$query}"</p>
{:else}
  <h2>📘 Zuletzt hinzugefügt</h2>
  <ul>
    {#each $data.recent as book}
      <li>{book.title} von {book.author}</li>
    {/each}
  </ul>

 {#if $data.tipp}
  <div class="tipp-box">
    <h2>🎲 Buchtipp</h2>
    <p>
      Vielleicht interessiert dich:
      <br />
      <strong><a href={`/books/${$data.tipp._id}`}>{$data.tipp.title}</a></strong>
      <br />
      von {$data.tipp.author}
    </p>
  </div>
{/if}


<style>
  .tipp-box {
    background: #f0f4ff;
    padding: 1rem;
    border-left: 4px solid #1e3a8a;
    margin-top: 2rem;
    border-radius: 0.5rem;
  }
  .tipp-box a {
    color: #1e3a8a;
    text-decoration: none;
  }
  .tipp-box a:hover {
    text-decoration: underline;
  }
</style>


  <h2>📊 Deine Statistik</h2>
  <ul>
    <li>📚 Gesamt: <strong>{$data.stats.total}</strong></li>
    <li>✔️ Gelesen: <strong>{$data.stats.gelesen}</strong></li>
    <li>🟡 Am Lesen: <strong>{$data.stats.amLesen}</strong></li>
    <li>📖 Offen: <strong>{$data.stats.offen}</strong></li>
  </ul>
{/if}

<style>
  .search {
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
</style>

