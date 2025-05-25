<script lang="ts">
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';
  const data = derived(page, ($p) => $p.data);
</script>

{#if $data.book}
 
  <h1>{ $data.book.title }</h1>

  <p><strong>Autor:</strong> { $data.book.author }</p>

  <p><strong>Status:</strong> { $data.book.status }</p>

  {#if $data.book.tags && $data.book.tags.length > 0}
    <p><strong>Tags:</strong>
      {#each $data.book.tags as tag, i}
       
        <a href={`/tags/${tag}`}>{tag}</a>
        
        {i < $data.book.tags.length - 1 ? ', ' : ''}
      {/each}
    </p>
  {/if}

  <p><strong>Hinzugefügt am:</strong> { new Date($data.book.createdAt).toLocaleDateString() }</p>
{:else}
  
  <p>❌ Buch nicht gefunden.</p>
{/if}

<style>
  
  a {
    color: #1e3a8a;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
