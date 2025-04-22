<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  let blocks: HTMLElement[] = [];
  let visibleBlocks = new Set();
  let mousePosition = { x: 0, y: 0 };
  let buttonElement: HTMLElement | null = null;

  function getTransitionDelay(index: number): number {
    return 400 * index;
  }

  function handleMouseMove(event: MouseEvent) {
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      mousePosition.x = event.clientX - rect.left;
      mousePosition.y = event.clientY - rect.top;
      buttonElement.style.setProperty('--mouse-x', `${mousePosition.x}px`);
      buttonElement.style.setProperty('--mouse-y', `${mousePosition.y}px`);
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = (entry.target as HTMLElement).dataset.index;
            if (index) {
              visibleBlocks.add(parseInt(index));
              visibleBlocks = visibleBlocks;
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    blocks.forEach((block, index) => {
      if (block) {
        block.dataset.index = index.toString();
        observer.observe(block);
      }
    });

    return () => {
      blocks.forEach(block => {
        if (block) observer.unobserve(block);
      });
    };
  });
</script>

<style>
  .highlight {
    color: var(--color-orange);
    font-weight: 500;
    position: relative;
    display: inline-block;
  }

  .highlight::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-orange);
    transition: width 0.3s ease;
  }

  .highlight:hover::after {
    width: 100%;
  }

  .cta-button {
    background: transparent;
    border: 1px solid var(--color-orange);
    color: var(--color-orange);
    padding: 0.75rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .cta-button .fill {
    position: absolute;
    inset: 0;
    background-color: var(--color-orange-10);
    opacity: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .cta-button:hover .fill {
    transform: translateX(0);
    opacity: 1;
  }

  .cta-button .shine {
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

  .cta-button:hover .shine {
    transform: translateX(100%);
  }

  .cta-button span {
    position: relative;
    z-index: 1;
  }

  .profile-container {
    position: relative;
    width: 280px;
    height: 280px;
    margin: 3rem auto;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.8);
    transition: all 0.3s ease;
  }

  .profile-container:hover .profile-image {
    filter: none;
  }

  .profile-overlay {
    position: absolute;
    inset: 0;
    background-color: var(--color-orange);
    opacity: 0.5;
    mix-blend-mode: color;
    transition: opacity 0.3s ease;
  }

  .profile-container:hover .profile-overlay {
    opacity: 0;
  }

  .profile-description {
    color: var(--color-light);
    opacity: 0.9;
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  .profile-name {
    color: var(--color-orange);
    text-decoration: none;
    position: relative;
    transition: opacity 0.3s ease;
  }

  .profile-name:hover {
    opacity: 0.8;
  }

  .profile-name::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-orange);
    transition: width 0.3s ease;
  }

  .profile-name:hover::after {
    width: 100%;
  }
</style>

<section class="py-24">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Behind AP3 Labs
      </h2>
      <p 
        class="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-400"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Meet the developer behind every line of code
      </p>
    </div>

    <div 
      class="max-w-4xl mx-auto text-center"
      bind:this={blocks[0]}
    >
      {#if visibleBlocks.has(0)}
        <div 
          class="profile-container"
          in:fly={{ 
            y: 100, 
            duration: 1200,
            delay: getTransitionDelay(0),
            easing: cubicOut 
          }}
        >
          <img 
            src="/profile.jpg" 
            alt="AP3 Labs Developer" 
            class="profile-image"
          />
          <div class="profile-overlay"></div>
        </div>

        <p 
          class="profile-description"
          in:fly={{ 
            y: 50, 
            duration: 1000,
            delay: getTransitionDelay(0) + 400,
            easing: cubicOut 
          }}
        >
          I'm <span class="profile-name">Alexis Péron</span>, a solo developer dedicated to crafting secure and efficient DeFi solutions
        </p>

        <div 
          class="mt-12"
          in:fly={{ 
            y: 30, 
            duration: 1000,
            delay: getTransitionDelay(0) + 800,
            easing: cubicOut 
          }}
        >
          <a 
            href="https://resume.ap3labs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="cta-button">
              <span class="fill"></span>
              <span class="shine"></span>
              <span class="relative z-10">Learn more about my journey</span>
            </button>
          </a>
        </div>
      {/if}
    </div>
  </div>
</section> 