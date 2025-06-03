<script lang="ts">
	import '../app.css';
  import '../satoshi.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Loader from '../components/Loader.svelte';
  import { page } from '$app/stores';

  /**
   * State for initial loading screen
   * @type {boolean}
   */
  let isLoading = true;
  
  /**
   * Handles the completion of the loading animation
   * Adds 'loaded' class to body after a delay
   */
  const finishLoading = () => {
    setTimeout(() => {
      isLoading = false;
      document.body.classList.add('loaded');
    }, 500);
  };

  /**
   * Handles initial page load
   * Redirects to home if URL contains hash on initial load
   */
  onMount(() => {
    if (window.location.hash) {
      window.location.href = window.location.pathname;
    }
    // Désactiver le loader pour la page yield-engineering
    if ($page.url.pathname === '/services/yield-engineering' || $page.url.pathname === '/services/unified-front-end-platform') {
      isLoading = false;
      document.body.classList.add('loaded');
    }
  });
</script>

<div class="font-satoshi min-h-screen bg-dark text-white">
  <main class="relative min-h-screen">
    <div class="overflow-x-hidden">
      {#if isLoading && $page.url.pathname !== '/services/yield-engineering'}
        <Loader {finishLoading} />
      {:else}
        <div 
          class="content"
          in:fade={{ duration: 300, delay: 200 }}
        >
          <slot />
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  /* Main container styles */
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  /* Content layout styles */
  .text-content {
    max-width: 800px;
    text-align: center;
  }

  .image-container {
    margin-top: 20px;
  }

  /* Global styles */
  :global(html, body) {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    background-color: var(--color-dark);
    overflow-x: hidden;
  }

  :global(body.loaded) {
    overflow: visible;
  }

  /* Content fade-in animation */
  .content {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
</style>
