<script lang="ts">
  import { derived } from 'svelte/store';
  import { page } from '$app/stores';

  const data = derived(page, ($p) => $p.data);
</script>


<h1>📌 Tags</h1>

{#if $data.tags.length > 0}
  <ul>
    {#each $data.tags as tag}
      <li>
        <a href={`/tags/${tag.name}`}>{tag.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>❌ Keine Tags gefunden.</p>
{/if}


<style>
  ul {
    padding-left: 1rem;
  }

  a {
    text-decoration: none;
    color: #1e3a8a;
  }

  a:hover {
    text-decoration: underline;
  }
</style>

