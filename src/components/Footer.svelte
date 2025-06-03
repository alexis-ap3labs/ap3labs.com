<script lang="ts">
  // Pas besoin de socialLinks pour le moment
</script>

<style>
  footer {
    position: relative;
    background: transparent;
  }

  .logo {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .logo:hover {
    opacity: 1;
  }

  .tagline {
    color: var(--color-light);
    opacity: 0.5;
    font-size: 0.75rem;
  }

  .copyright {
    color: var(--color-light);
    opacity: 0.4;
    font-size: 0.75rem;
  }
</style>

<footer class="py-8">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="flex flex-col items-center gap-6">
      <!-- Logo -->
      <a href="/" class="logo">
        <img 
          src="/ap3labs_logo.webp" 
          alt="AP3 Labs Logo" 
          class="h-8 w-auto object-contain" 
          loading="eager"
        />
      </a>

      <!-- Tagline & Copyright -->
      <div class="text-center">
        <p class="tagline">Crafting secure and efficient DeFi solutions</p>
        <p class="copyright mt-1">© 2025 AP3 Labs. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer> 