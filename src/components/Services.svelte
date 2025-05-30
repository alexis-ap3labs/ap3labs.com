<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let blocks: HTMLElement[] = [];
  let visibleCards = new Set();
  let titleVisible = false;
  let servicesSection: HTMLElement;

  const services = [
    {
      title: 'Yield Engineering\n& Advisory',
      description: 'We design and validate bespoke DeFi yield plans tailored to your risk profile and asset mix. Leveraging on‑chain analytics and market insights, we pinpoint the highest risk‑adjusted opportunities and craft a roadmap to sustainable returns.',
      features: ['Data Analytics', 'Risk Management', 'Yield Optimization', 'Strategy Planning']
    },
    {
      title: 'Smart Contract\nOrchestration',
      description: 'Our integration framework handles everything—from contract interaction layers and access orchestration to gas‑optimized deployment—so your vaults deliver peak performance and yield potential under strict security best practices.',
      features: ['Gas Optimization', 'Security Hardening', 'Access Control', 'Vault Integration']
    },
    {
      title: 'Unified \nFront‑End Platform',
      description: 'Our integration layer brings together analytics visualizations, interactive position management, and back‑office operations into one responsive UI. Teams can track KPIs, trigger transactions, and oversee vaults—all without switching screens.',
      features: ['Analytics', 'Dashboard', 'UX Design', 'Monitoring']
    }
  ];
  
  function handleMouseMove(event: MouseEvent, block: HTMLElement) {
    const rect = block.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    block.style.setProperty('--mouse-x', `${x}px`);
    block.style.setProperty('--mouse-y', `${y}px`);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = (entry.target as HTMLElement).dataset.index;
            if (index) {
              visibleCards.add(parseInt(index));
              visibleCards = visibleCards;
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

  // Ajout d'un délai pour chaque carte
  function getTransitionDelay(index: number): number {
    return 200 * index;
  }

  function getNumberDelay(index: number): number {
    // Un délai légèrement plus long pour les numéros
    return 300 * index + 200;
  }
</script>

<style>
  .service-block {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }

  .service-block::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 163, 60, 0.1),
      transparent
    );
    transform: translateX(-100%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .service-block:hover::before {
    opacity: 1;
    animation: shimmer 0.8s ease-out forwards;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .service-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .service-title-wrapper {
    min-height: 5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding-left: 4.5rem;
    padding-right: 1rem;
  }

  .service-title {
    flex-grow: 1;
    text-align: left;
    font-size: 1.5rem;
    line-height: 1.2;
    white-space: pre-line;
  }

  .service-number {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 163, 60, 0.1);
    border: 1px solid rgba(255, 163, 60, 0.2);
    font-family: 'Monaco', monospace;
    font-size: 0.875rem;
    color: var(--color-orange);
    transition: background 0.3s ease, transform 0.3s ease;
    transform-origin: center center;
  }

  .service-number::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 1px solid rgba(255, 163, 60, 0);
    transition: all 0.3s ease;
  }

  .service-block:hover .service-number {
    background: rgba(255, 163, 60, 0.15);
    transform: scale(1.1);
  }

  .service-block:hover .service-number::after {
    border-color: rgba(255, 163, 60, 0.2);
    transform: scale(1.1);
  }

  .description-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .description {
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .features-grid {
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .feature-item {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .number-animation {
    animation: numberAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  @keyframes numberAppear {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

<section 
  class="py-24"
  bind:this={servicesSection}
>
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Our Expertise
      </h2>
      <h3 
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 mb-12"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        From DeFi consulting to technical implementation
      </h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each services as service, index}
        <div
          bind:this={blocks[index]}
          on:mousemove={(e) => handleMouseMove(e, blocks[index])}
          class="service-block w-full p-8 rounded-xl bg-dark/30 transition-all duration-300 hover:scale-[1.02] border border-orange/10 hover:border-orange/30 shadow-[0_0_40px_rgba(255,163,60,0.05)] hover:shadow-[0_0_50px_rgba(255,163,60,0.15)]"
        >
          {#if visibleCards.has(index)}
            <span 
              class="service-number"
              in:fade={{ 
                duration: 400,
                delay: getTransitionDelay(index)
              }}
            >
              {(index + 1).toString().padStart(2, '0')}
            </span>

            <div 
              class="service-content"
              in:fly={{ 
                y: 50, 
                duration: 800,
                delay: getTransitionDelay(index),
                easing: cubicOut,
                opacity: 0
              }}
            >
              <div class="service-title-wrapper">
                <h3 class="service-title text-2xl font-bold text-light">
                  {service.title}
                </h3>
              </div>
              <div class="description-wrapper">
                <p class="description text-light/80">
                  {service.description}
                </p>
                <div class="features-grid">
                  {#each service.features as feature}
                    <div class="feature-item">
                      <div class="bg-orange/5 px-4 py-2 rounded-full text-sm text-orange border border-orange/20 hover:bg-orange/10 transition-colors">
                        {feature}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section> 