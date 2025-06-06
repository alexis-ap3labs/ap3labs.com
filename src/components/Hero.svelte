<script lang="ts">
  import { onMount } from 'svelte';
  import ContactModal from './ContactModal.svelte';
  import { fade, fly } from 'svelte/transition';

  let container: HTMLElement;
  let isModalOpen = false;
  let mounted = false;
  export let ref: HTMLElement | null = null;
  
  const targets = [
    { desktop: 'Asset Managers', mobile: 'Asset Managers' },
    { desktop: 'Family Offices', mobile: 'Family Offices' },
    { desktop: 'High Net Worth Individuals', mobile: 'High Net Worth Individuals' }
  ];
  
  let currentIndex = 0;
  let currentTarget = targets[0].desktop;
  let currentMobileTarget = targets[0].mobile;
  let isAnimating = false;
  let currentTimeout: number;
  const rotationInterval = 8000; // 8 seconds between each rotation

  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  function rotateText() {
    isAnimating = true;
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % targets.length;
      currentTarget = targets[currentIndex].desktop;
      currentMobileTarget = targets[currentIndex].mobile;
      isAnimating = false;
    }, 1200);
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
    currentTimeout = setInterval(rotateText, rotationInterval);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(currentTimeout);
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

  .hero-subtitle {
    color: #bfc9db;
    font-size: 1.25rem;
    font-weight: 500;
    opacity: 0.85;
    margin-bottom: 2.5rem;
    line-height: 1.6;
    text-align: center;
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 640px) {
    .hero-subtitle {
      text-align: left;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .target-text {
    display: inline-block;
    min-width: 200px;
    position: relative;
    white-space: nowrap;
    transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center;
    filter: blur(0);
  }

  .target-text.animating {
    transform: rotateX(90deg) scale(0.8);
    opacity: 0;
    filter: blur(12px);
  }

  .target-text:not(.animating) {
    animation: appear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes appear {
    0% {
      transform: rotateX(-90deg) scale(0.8);
      opacity: 0;
      filter: blur(12px);
    }
    100% {
      transform: rotateX(0) scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }

  @media (min-width: 640px) {
    .target-text {
      min-width: 300px;
    }
  }

  .static-text {
    display: inline;
  }
</style>

<section bind:this={container} bind:this={ref}>
  <div class="content-wrapper px-4 mx-auto sm:ml-[10%]">
    {#if mounted}
      <h1 
        class="text-4xl sm:text-4xl md:text-6xl font-bold tracking-tight text-light mb-4 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        <span class="static-text">Private Vaults for </span>
        <span class="text-[var(--color-orange)] target-text" class:animating={isAnimating}>
          {#if currentTarget === 'High Net Worth Individuals'}
            <span class="sm:hidden">High Net Worth<br />Individuals</span>
            <span class="hidden sm:inline">{currentTarget}</span>
          {:else}
            {currentTarget}
          {/if}
        </span>
      </h1>
      <p 
        class="hero-subtitle"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        From architecture to execution, we run the stack.<br />
        You focus on growing capital with confidence.
      </p>
      <div
        class="flex justify-center sm:justify-start"
        in:fly={{ y: 20, duration: 800, delay: 800 }}
      >
        <a 
          href="https://calendly.com/alexis-ap3labs/30min"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-button group relative inline-block px-8 sm:px-10 py-4 sm:py-5 rounded-lg border text-lg sm:text-lg font-medium"
        >
          <span class="fill"></span>
          <span class="shine"></span>
          <span class="relative z-10">Schedule a Call</span>
        </a>
      </div>
    {/if}
  </div>
</section>

<ContactModal isOpen={isModalOpen} onClose={closeModal} /> 