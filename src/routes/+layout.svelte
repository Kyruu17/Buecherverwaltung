<script lang="ts">
  import '../app.css';
</script>


<div class="background">
  <header class="full-header">
    <div class="nav-bar">
      <h1 class="logo">📚 Leseverwaltung</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/books">Bücher</a>
        <a href="/books/new">Neues Buch</a>
        <a href="/tags">Tags</a>
        <a href="/about">Über</a>
      </nav>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Leseverwaltung. Alle Rechte vorbehalten.</p>
    </div>
  </footer>
</div>


<style>
  :global(body) {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #333;
}


 .background {
  min-height: 100vh;
  background-image: url('/Background1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.92);
  background-blend-mode: lighten;
}


  .full-header {
  background-color: #1e3a8a;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #e0e7ff;
  font-weight: bold;
}

nav a:hover {
  color: #fff;
}


 .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

main {
  padding: 2rem 0;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #e5e7eb;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.875rem;
  color: #555;
  margin-top: 2rem;
}
</style>

