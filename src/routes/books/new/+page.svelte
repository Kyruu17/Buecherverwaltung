<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { derived, writable } from 'svelte/store';

  const data = derived(page, ($p) => $p.data);
  const tags = derived(data, ($d) => $d.tags ?? []);
  const title = writable('');
  const author = writable('');
  const status = writable('offen'); 
  const tagIds = writable<string[]>([]); 
  const submit = async (e: SubmitEvent) => {
    e.preventDefault(); 

   
    const res = await fetch('/books/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: $title,     
        author: $author,
        status: $status,
        tagIds: $tagIds
      })
    });

    if (res.ok) {
      goto('/books'); 
    } else {
      alert('❌ Fehler beim Speichern');
    }
  };
</script>

<h1>➕ Neues Buch hinzufügen</h1>

<form onsubmit={submit}>
  
  <label>
    Titel:
    <input type="text" bind:value={$title} required />
  </label>
  
  <label>
    Autor:
    <input type="text" bind:value={$author} required />
  </label>
 
  <label>
    Status:
    <select bind:value={$status}>
      <option value="offen">📖 Noch offen</option>
      <option value="am_lesen">🟡 Am lesen</option>
      <option value="gelesen">✔️ Gelesen</option>
    </select>
  </label>

  <fieldset>
    <legend>Tags</legend>

    {#if $tags.length > 0}
      {#each $tags as tag}
        <label>
          <input
            type="checkbox"
            value={tag._id}
            onchange={(e) => {
              const target = e.target as HTMLInputElement;
              if (!target) return;
              const value = target.value;

              if (target.checked) {
                tagIds.update((ids) => [...ids, value]);
              } else {
                tagIds.update((ids) => ids.filter((id) => id !== value));
              }
            }}
          />
          {tag.name}
        </label>
      {/each}
    {:else}
      <p>🔄 Tags werden geladen oder keine verfügbar.</p>
    {/if}
  </fieldset>
  <button type="submit">Speichern</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 0.5rem;
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
    background-color: #1e3a8a;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #3b82f6;
  }

  fieldset {
    border: 1px solid #ccc;
    padding: 1rem;
  }

  legend {
    font-weight: bold;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>

