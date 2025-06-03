<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { isPageLoaded } from '../stores/loading';

  type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: string[];
    featured?: boolean;
  };

  const projects: Project[] = [
    {
      title: "AP3 Labs Website",
      description: "Modern, responsive website built with SvelteKit featuring smooth animations, dark theme, and interactive components. Implements best practices for performance and SEO.",
      image: "ap3labs-website.png",
      link: "https://ap3labs.com",
      technologies: ["SvelteKit", "TypeScript", "TailwindCSS", "HTML/CSS"],
      featured: true
    },
    {
      title: "DeFi Analytics Dashboard",
      description: "Real-time analytics dashboard for DeFi protocols, featuring interactive charts, portfolio tracking, and yield optimization suggestions. Built with a focus on user experience and data accuracy.",
      image: "defi-dashboard.png",
      link: "https://analytics.ap3labs.com",
      technologies: ["React", "TypeScript", "D3.js", "Web3.js", "Node.js"],
      featured: true
    }
  ];

  const images = [
    {
      src: "/app-detrade.png",
      alt: "DeTrade App Interface",
      link: "https://app.detrade.fund/"
    },
    {
      src: "/oracle-detrade.png",
      alt: "DeTrade Oracle Interface",
      link: "https://oracle.detrade.fund/"
    },
    {
      src: "/detrade.png",
      alt: "DeTrade Landing Page",
      link: "https://detrade.fund/"
    },
    {
      src: "/docs-detrade.png",
      alt: "DeTrade Documentation",
      link: "https://docs.detrade.fund/"
    },
    {
      src: "/dtusdc-detrade.png",
      alt: "DeTrade Core USDC Vault",
      link: "https://app.detrade.fund/vault/detrade-core-usdc"
    }
  ];

  let currentImageIndex = 0;
  let isVisible = false;

  let blocks: HTMLElement[] = [];
  let visibleBlocks = new Set();

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  function getTransitionDelay(index: number): number {
    return 400 * index;
  }

  onMount(() => {
    isVisible = true;

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
  .project-container {
    position: relative;
  }

  .content-container {
    height: 500px; /* Hauteur fixe */
    display: flex;
    align-items: center;
  }

  .project-description {
    max-width: 900px;
    margin: 2rem auto 0;
    text-align: center;
    font-size: 1.1rem;
    color: var(--color-light);
    opacity: 0.9;
  }

  .project-link {
    color: var(--color-orange);
    text-decoration: none;
    position: relative;
    transition: opacity 0.3s ease;
  }

  .project-link:hover {
    opacity: 0.8;
  }

  .project-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-orange);
    transition: width 0.3s ease;
  }

  .project-link:hover::after {
    width: 100%;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.75rem;
    background: #0D1117;
  }

  .carousel-track {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s ease;
    transform: scale(0.98);
  }

  .carousel-slide.active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 0;
    background: none;
    filter: grayscale(0.8);
    transition: filter 0.3s ease;
  }

  .carousel-slide:hover .carousel-image {
    filter: none;
  }

  .project-overlay {
    position: absolute;
    inset: 0;
    background-color: var(--color-orange);
    opacity: 0.5;
    mix-blend-mode: color;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .carousel-slide:hover .project-overlay {
    opacity: 0;
  }

  .external-link {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 20;
    background: #2a2a2a;
    padding: 0.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 2rem;
    height: 2rem;
  }

  .external-link:hover {
    transform: translate(-2px, -2px);
    background-color: var(--color-orange);
    color: var(--color-dark);
  }

  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 0.75rem;
    margin: 0 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .carousel-nav.prev {
    left: 0;
  }

  .carousel-nav.next {
    right: 0;
  }

  .carousel-nav:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .tech-pill {
    background-color: var(--color-orange-10);
    color: var(--color-orange);
    border: 1px solid var(--color-orange);
    border-radius: 9999px;
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .visit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 20;
    background: rgba(42, 42, 42, 0.9);
    color: var(--color-light);
    padding: 0.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 2.5rem;
    height: 2.5rem;
  }

  .visit-button:hover {
    background: var(--color-orange);
    color: var(--color-dark);
  }

  .visit-button svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .project-title {
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 600;
    color: var(--color-light);
    margin-bottom: 1.5rem;
  }

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

  .text-light {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .carousel-container {
      aspect-ratio: 16 / 10;
    }

    .project-description {
      padding: 1.5rem;
      margin-top: 1.5rem;
    }

    .carousel-nav {
      padding: 0.75rem;
      margin: 0 0.5rem;
    }
  }
</style>

<section class="py-24">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Featured Projects
      </h2>
      <h3 
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 mb-12"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        A glimpse into our work in the DeFi space
      </h3>
    </div>

    <div>
      <div 
        class="project-container relative"
        bind:this={blocks[0]}
      >
        {#if visibleBlocks.has(0)}
          <div 
            class="carousel-container"
            in:fly={{ 
              y: 100, 
              duration: 1200,
              delay: getTransitionDelay(0),
              easing: cubicOut 
            }}
          >
            <div class="carousel-track">
              {#each images as image, index}
                <a 
                  href={image.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="carousel-slide {index === currentImageIndex ? 'active' : ''}"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    class="carousel-image"
                  />
                  <div class="project-overlay"></div>
                </a>
              {/each}
            </div>

            <button class="carousel-nav prev" on:click={() => {
              currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button class="carousel-nav next" on:click={() => {
              currentImageIndex = (currentImageIndex + 1) % images.length;
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p 
            class="project-description"
            in:fly={{ 
              y: 50, 
              duration: 1000, 
              delay: getTransitionDelay(0) + 400,
              easing: cubicOut 
            }}
          >
            Discover <a href="/projects" class="project-link" target="_blank" rel="noopener noreferrer">DeTrade Fund's ecosystem</a>, our latest comprehensive DeFi platform.
          </p>
        {/if}
      </div>
    </div>
  </div>
</section> 