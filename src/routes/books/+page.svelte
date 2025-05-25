<script lang="ts">
 
  import { writable, derived } from 'svelte/store'; 
  import { page } from '$app/stores';

  const data = derived(page, ($p) => $p.data);
  const selectedFilter = writable('alle'); 
  const books = writable([]);
  
  data.subscribe(($d) => {
    if ($d.books) books.set($d.books);
  });
  
  const updateStatus = async (id: string, status: string) => {
    await fetch(`/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }) 
    }); 
  };
  
  const deleteBook = async (id: string) => {
    if (!confirm('Möchtest du dieses Buch wirklich löschen?')) return;
    const res = await fetch(`/books/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      books.update((list) => list.filter((book) => book._id !== id));
    } else {
      alert('❌ Fehler beim Löschen');
    }
  };
  
  const filteredBooks = derived([books, selectedFilter], ([$books, $filter]) =>
    $filter === 'alle'
      ? $books
      : $books.filter((book) => book.status === $filter)
  );
</script>

<h1>📚 Deine Bücherliste</h1>

<label for="statusFilter">🔍 Filtern nach Status:</label>
<select id="statusFilter" bind:value={$selectedFilter}>
  <option value="alle">Alle</option>
  <option value="offen">📖 Noch offen</option>
  <option value="am_lesen">🟡 Am lesen</option>
  <option value="gelesen">✔️ Gelesen</option>
</select>

{#if $filteredBooks.length > 0}
  <ul>
    {#each $filteredBooks as book}
      <li>
        <strong>
       
          <a href={`/books/${book._id}`}>{book.title}</a>
        </strong> von {book.author}
      
        <select bind:value={book.status} onchange={(e) => updateStatus(book._id, e.target.value)}>
          <option value="offen">📖 Noch offen</option>
          <option value="am_lesen">🟡 Am lesen</option>
          <option value="gelesen">✔️ Gelesen</option>
        </select>

        <button onclick={() => deleteBook(book._id)}>🗑️ Löschen</button>
      </li>
    {/each}
  </ul>
{:else}
  <p>❌ Keine Bücher gefunden für Filter: <strong>{$selectedFilter}</strong></p>
{/if}

