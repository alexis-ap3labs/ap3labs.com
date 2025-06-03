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
  <div class="content-wrapper px-4 sm:ml-[10%]">
    {#if mounted}
      <h1 
        class="text-4xl sm:text-4xl md:text-6xl font-bold tracking-tight text-light mb-4 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        Operate DeFi Strategies at Scale
      </h1>
      <p 
        class="text-xl sm:text-xl md:text-2xl text-light/90 mb-12 leading-relaxed max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <span class="font-bold text-[var(--color-orange)]">We design, deploy and operate your DeFi infrastructure</span>
        <br />
        <span class="font-bold">so you can focus on capital and returns.</span>
      </p>
      <div
        class="flex justify-center sm:justify-start"
        in:fly={{ y: 20, duration: 800, delay: 800 }}
      >
        <button 
          class="hero-button group relative inline-block px-8 sm:px-10 py-4 sm:py-5 rounded-lg border text-lg sm:text-lg font-medium"
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