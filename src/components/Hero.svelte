<script lang="ts">
  import { onMount } from 'svelte';
  import ContactModal from './ContactModal.svelte';
  import { fade, fly } from 'svelte/transition';

  let container: HTMLElement;
  let isModalOpen = false;
  let mounted = false;
  export let ref: HTMLElement | null = null;
  
  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
  
  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      
      const { clientX, clientY } = e;
      const { left, top } = container.getBoundingClientRect();
      
      const x = clientX - left;
      const y = clientY - top;
      
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    mounted = true;
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<style>
  section {
    position: relative;
    overflow: visible;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    z-index: 0;
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
  }

  :global(.hero-button) {
    color: var(--color-orange);
    border-color: var(--color-orange);
    position: relative;
    overflow: hidden;
    background-color: var(--color-dark);
    cursor: pointer;
  }

  :global(.hero-button .fill) {
    position: absolute;
    inset: 0;
    background-color: var(--color-orange-10);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  :global(.hero-button:hover .fill) {
    transform: translateX(0);
  }

  :global(.hero-button .shine) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.7s ease;
  }

  :global(.hero-button:hover .shine) {
    transform: translateX(100%);
  }

  @media (max-width: 640px) {
    .grid-background {
      background-size: 20px 20px;
    }
  }

  :global(.hero-content) {
    opacity: 0;
  }

  :global(.hero-content.visible) {
    opacity: 1;
  }

  .hero-description {
    color: var(--color-light);
    opacity: 0.8;
  }
</style>

<section bind:this={container} bind:this={ref}>
  <div class="content-wrapper ml-[10%] px-4">
    {#if mounted}
      <h1 
        class="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-light mb-4 max-w-2xl"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        Scalable DeFi Operations
      </h1>
      <h2 
        class="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-400 mb-12 max-w-2xl"
        in:fly={{ y: 20, duration: 800, delay: 400 }}
      >
        for Asset Managers
      </h2>
      <p 
        class="text-light/80 text-lg sm:text-xl md:text-2xl text-light/90 mb-12 leading-relaxed max-w-2xl"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <span class="font-bold text-[var(--color-orange)]">Full‑stack DeFi yield implementation</span>
        <br />
        <span class="font-bold">End-to-end custom solutions — from strategy design and infrastructure setup to ongoing operations and reporting tools.</span>
      </p>
      <div
        in:fly={{ y: 20, duration: 800, delay: 800 }}
      >
        <button 
          class="hero-button group relative inline-block px-8 sm:px-10 py-4 sm:py-5 rounded-lg border text-base sm:text-lg font-medium"
          on:click={openModal}
        >
          <span class="fill"></span>
          <span class="shine"></span>
          <span class="relative z-10">Start Your Project</span>
        </button>
      </div>
    {/if}
  </div>
</section>

<ContactModal isOpen={isModalOpen} onClose={closeModal} /> 