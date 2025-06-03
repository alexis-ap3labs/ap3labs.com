<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  const sections = [
    {
      title: 'Strategy Planning',
      subtitle: 'Designing yield strategies aligned with institutional mandates',
      features: [
        'Define objectives, constraints, and risk appetite',
        'Model asset allocation and capital deployment plans',
        'Select protocol verticals based on fit and maturity',
        'Simulate scenarios to test strategic robustness'
      ]
    },
    {
      title: 'Yield Optimization',
      subtitle: 'Enhancing net returns through active strategy refinement',
      features: [
        'Monitor and reallocate based on real-time performance',
        'Optimize reward harvesting, compounding, and reinvestment flows',
        'Integrate liquidity mining and incentive programs',
        'Adjust strategies dynamically based on on-chain conditions'
      ]
    },
    {
      title: 'Risk Management',
      subtitle: 'Identifying and mitigating risks across DeFi operations',
      features: [
        'Perform risk audits on protocols and positions',
        'Map exposure by chain, counterparty, and asset type',
        'Track depeg, slippage, and liquidity events',
        'Establish alerting and safeguard mechanisms'
      ]
    },
    {
      title: 'On-Chain Analytics',
      subtitle: 'Powering decisions with transparent, data-driven insights',
      features: [
        'Build custom dashboards for NAV and position tracking',
        'Aggregate protocol yields and funding rates',
        'Provide backtesting and benchmarking for strategies',
        'Generate reporting outputs for internal or client use'
      ]
    }
  ];

  let blocks: HTMLElement[] = [];
  let visibleCards = new Set();
  let mounted = false;

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

    mounted = true;

    return () => {
      blocks.forEach(block => {
        if (block) observer.unobserve(block);
      });
    };
  });
</script>

<style>
  .service-block {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 2.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
  }

  .service-block:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.15);
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
      rgba(255, 255, 255, 0.1),
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

  .service-number {
    position: absolute;
    top: 2.5rem;
    left: 2.5rem;
    font-family: 'Monaco', monospace;
    font-size: 0.9rem;
    color: #ff8800;
    opacity: 0;
    letter-spacing: 1px;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .service-block:hover .service-number {
    opacity: 0.8;
    transform: translateY(0);
  }

  .service-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
    padding-left: 3.5rem;
    letter-spacing: -0.5px;
  }

  .service-subtitle {
    font-size: 1.1rem;
    color: #ffffff;
    opacity: 0.7;
    margin-bottom: 2rem;
    padding-left: 3.5rem;
    line-height: 1.6;
  }

  .features-list {
    padding-left: 3.5rem;
  }

  .feature-item {
    color: #ffffff;
    opacity: 0.8;
    margin-bottom: 1rem;
    line-height: 1.5;
    position: relative;
    padding-left: 1.5rem;
    transition: opacity 0.3s ease;
  }

  .feature-item:hover {
    opacity: 1;
  }

  .feature-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 6px;
    height: 6px;
    background: #ff8800;
    opacity: 0.5;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .feature-item:hover::before {
    transform: scale(1.2);
  }

  .feature-item:last-child {
    margin-bottom: 0;
  }

  .hero-section {
    background: transparent;
    padding: 8rem 0 4rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    color: #ffffff;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .service-block {
      padding: 2rem;
    }

    .service-number {
      top: 2rem;
      left: 2rem;
    }

    .service-title {
      padding-left: 3rem;
      font-size: 1.5rem;
    }

    .service-subtitle {
      padding-left: 3rem;
    }

    .features-list {
      padding-left: 3rem;
    }
  }
</style>

<section class="hero-section">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Yield Engineering
      </h2>
      <h3 
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 mb-12"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Institutional-grade yield strategies for DeFi protocols
      </h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {#each sections as section, index}
        <div
          bind:this={blocks[index]}
          on:mousemove={(e) => handleMouseMove(e, blocks[index])}
          class="service-block w-full p-8 rounded-xl bg-dark/30 transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] relative group"
        >
          {#if visibleCards.has(index)}
            <div 
              class="service-content"
              in:fly={{ 
                y: 50, 
                duration: 800,
                delay: index * 200,
                easing: cubicOut,
                opacity: 0
              }}
            >
              <span class="service-number">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 class="service-title">
                {section.title}
              </h3>
              <p class="service-subtitle">
                {section.subtitle}
              </p>
              <div class="features-list">
                {#each section.features as feature}
                  <div class="feature-item">
                    {feature}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section> 