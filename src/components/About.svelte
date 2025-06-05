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

  .founders-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
    justify-content: center;
    align-items: start;
    padding-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .founders-container {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .profile-container {
      width: 240px;
      height: 240px;
      margin: 2rem auto;
    }

    .profile-title {
      font-size: 1rem;
    }

    .profile-desc {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }

    .profile-name {
      font-size: 1.2rem;
    }
  }

  .founder-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .alexis-image {
    filter: grayscale(1);
    transition: filter 0.3s ease;
  }

  .profile-container:hover .alexis-image {
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

  .profile-name {
    color: #fff;
    font-weight: bold;
    font-size: 1.35rem;
    text-decoration: none;
    position: relative;
    transition: opacity 0.3s ease;
    margin-bottom: 0.5rem;
  }

  .profile-title {
    color: var(--color-orange);
    font-weight: bold;
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  .profile-desc {
    color: var(--color-light);
    opacity: 0.9;
    font-size: 1.07rem;
    margin-bottom: 2.2rem;
    margin-top: 0.5rem;
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

  .linkedin-logo {
    width: 32px;
    height: 32px;
    display: inline-block;
    fill: var(--color-light);
    opacity: 0.5;
    transition: opacity 0.2s ease;
    cursor: pointer;
  }
  .linkedin-logo:hover {
    opacity: 0.8;
  }

  .linkedin-logo-wrapper {
    margin-top: 1rem;
  }

  .team-card.antoine .overlay {
    opacity: 0.25;
  }

  .team-card.antoine img {
    filter: sepia(0.3) brightness(1.1);
  }

  .profile-description {
    width: 100%;
    max-width: 280px;
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
        Meet the minds behind our DeFi innovations
      </p>
    </div>

    <div 
      class="w-full text-center"
      bind:this={blocks[0]}
    >
      {#if visibleBlocks.has(0)}
        <div class="founders-container">
          <div class="founder-card">
            <a href="https://resume.ap3labs.com/" target="_blank" rel="noopener noreferrer" aria-label="Alexis Péron Resume">
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
                  alt="Alexis Péron - AP3 Labs Developer" 
                  class="profile-image alexis-image"
                />
                <div class="profile-overlay"></div>
              </div>
            </a>

            <div 
              class="profile-description"
              in:fly={{ 
                y: 50, 
                duration: 1000,
                delay: getTransitionDelay(0) + 400,
                easing: cubicOut 
              }}
            >
              <span class="profile-name">Alexis Péron</span><br />
              <span class="profile-title">Web3 Solutions Architect</span>
              <span class="profile-desc">Leading infrastructure deployment and operations, ensuring seamless smart contract integration and efficient fund execution processes.</span>
            </div>

            <div class="flex flex-col items-center gap-2 mb-4">
              <div class="linkedin-logo-wrapper">
                <a href="https://www.linkedin.com/in/alexispierreprn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Alexis Péron">
                  <svg class="linkedin-logo" viewBox="0 0 32 32"><path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.4 27.1H5.2V12h4.2v15.1zM7.3 10.3c-1.3 0-2.1-0.9-2.1-2 0-1.1 0.8-2 2.1-2s2.1 0.9 2.1 2c0 1.1-0.8 2-2.1 2zM27.1 27.1h-4.2v-7.5c0-1.9-0.7-3.2-2.3-3.2-1.2 0-1.9 0.8-2.2 1.6-0.1 0.3-0.1 0.7-0.1 1.1v8h-4.2s0.1-13 0-14.1h4.2v2c0.6-0.9 1.7-2.2 4.1-2.2 3 0 5.2 2 5.2 6.3v8z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div class="founder-card">
            <a href="https://www.linkedin.com/in/antoineray7/" target="_blank" rel="noopener noreferrer" aria-label="Antoine Raymond LinkedIn">
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
                  src="/antoine.png" 
                  alt="Antoine Raymond - AP3 Labs Co-founder" 
                  class="profile-image"
                />
                <div class="profile-overlay"></div>
              </div>
            </a>

            <div 
              class="profile-description"
              in:fly={{ 
                y: 50, 
                duration: 1000,
                delay: getTransitionDelay(0) + 400,
                easing: cubicOut 
              }}
            >
              <span class="profile-name">Antoine Raymond</span><br />
              <span class="profile-title">DeFi Strategist</span>
              <span class="profile-desc">Mastering yield optimization strategies and DeFi protocols, driving fund performance through innovative investment approaches.</span>
            </div>

            <div class="flex flex-col items-center gap-2 mb-4">
              <div class="linkedin-logo-wrapper">
                <a href="https://www.linkedin.com/in/antoineray7/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Antoine Raymond">
                  <svg class="linkedin-logo" viewBox="0 0 32 32"><path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.4 27.1H5.2V12h4.2v15.1zM7.3 10.3c-1.3 0-2.1-0.9-2.1-2 0-1.1 0.8-2 2.1-2s2.1 0.9 2.1 2c0 1.1-0.8 2-2.1 2zM27.1 27.1h-4.2v-7.5c0-1.9-0.7-3.2-2.3-3.2-1.2 0-1.9 0.8-2.2 1.6-0.1 0.3-0.1 0.7-0.1 1.1v8h-4.2s0.1-13 0-14.1h4.2v2c0.6-0.9 1.7-2.2 4.1-2.2 3 0 5.2 2 5.2 6.3v8z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section> 