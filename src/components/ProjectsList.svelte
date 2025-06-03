<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { isPageLoaded } from '../stores/loading';
  import FloatingHexagons from './FloatingHexagons.svelte';
  
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
      title: "ERC-4626 DeFi Interface",
      description: "A decentralized, modular DApp for interacting with ERC-4626 vaults. Deposit, withdraw, and track assets with real-time analytics via TheGraph. Custom wallet integration with Svelte stores and window.ethereum — no wagmi, no bloat.",
      image: "/app-detrade.png",
      link: "https://app.detrade.fund/",
      technologies: ["TypeScript", "Svelte", "HTML/CSS", "TailwindCSS", "Ethers.js"],
      featured: true
    },
    {
      title: "Oracle NAV",
      description: "Oracle for pushing NAVs and calculating vault asset liquidation value, leveraging on-chain smart contract data and APIs for asset conversion. Cron task in GitHub Actions for regular valuation pushes.",
      image: "/oracle-detrade.png",
      link: "https://oracle.detrade.fund/",
      technologies: ["Python", "GitHub Actions", "Web3.py", "APIs", "Smart Contracts"],
      featured: true
    }
  ];

  let isVisible = false;

  onMount(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'projects') {
      const unsubscribe = isPageLoaded.subscribe(loaded => {
        if (loaded) {
          setTimeout(() => {
            const section = document.getElementById('projects');
            if (section) {
              const offset = 50;
              window.scrollTo({
                top: section.offsetTop - offset,
                behavior: 'smooth'
              });
            }
          }, 100);
          unsubscribe();
        }
      });
    }

    isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<style>
  .number {
    color: var(--color-orange);
    opacity: 1;
  }

  .project-image {
    transition: all 0.3s ease;
  }

  .project-overlay {
    background-color: var(--color-orange);
    opacity: 0.4;
    mix-blend-mode: color;
    transition: opacity 300ms ease;
  }

  .project-container:hover .project-overlay {
    opacity: 0;
  }

  .tech-list {
    color: var(--color-orange);
  }

  .arrow {
    color: var(--color-orange);
    opacity: 1;
  }

  .external-link {
    transition: all 0.3s ease;
  }

  .external-link:hover {
    transform: translate(-2px, -2px);
    background-color: var(--color-orange);
    color: var(--color-dark);
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

  .content-wrapper {
    position: relative;
    z-index: 1;
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
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .hero-subtitle {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    color: #ffffff;
    opacity: 0.8;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .section-block {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 2.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
  }

  .section-block:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.15);
  }

  .section-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #ffffff;
    opacity: 0.7;
    margin-bottom: 2rem;
    line-height: 1.6;
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
    background: var(--color-orange);
    opacity: 0.5;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .feature-item:hover::before {
    transform: scale(1.2);
  }
</style>

<section id="projects" class="hero-section relative">
  <FloatingHexagons />
  
  <div class="content-wrapper max-w-[90rem] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <div class="text-center mb-16">
      <h2 
        class="hero-title"
        in:fly={{ y: 20, duration: 600, easing: cubicOut }}
      >
        Flagship Project
      </h2>
      <h3 
        class="hero-subtitle"
        in:fly={{ y: 20, duration: 600, delay: 200, easing: cubicOut }}
      >
        DeTrade Fund
      </h3>
      <p 
        class="text-xl text-[var(--color-orange)] mt-4"
        in:fly={{ y: 20, duration: 600, delay: 400, easing: cubicOut }}
      >
        Built by AP3 Labs
      </p>
    </div>

    <div class="max-w-4xl mx-auto mb-16">
      <p 
        class="text-lg leading-relaxed text-light/80 text-center"
        in:fly={{ y: 20, duration: 600, delay: 600, easing: cubicOut }}
      >
        DeTrade is our flagship project and serves as a live pilot for AP3 Labs. It's a modular DeFi infrastructure built to help institutional players deploy yield strategies in a secure, efficient, and scalable way.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
      <div 
        class="section-block"
        in:fly={{ y: 20, duration: 600, delay: 800, easing: cubicOut }}
      >
        <h3 class="section-title text-[var(--color-orange)]">Mission</h3>
        <p class="section-subtitle">
          We support our main client — a crypto asset manager — across the entire value chain:
        </p>
        <ul class="space-y-3">
          <li class="feature-item">Strategic research and portfolio allocation</li>
          <li class="feature-item">Vault deployment and protocol integration</li>
          <li class="feature-item">Operational tooling and infrastructure management</li>
        </ul>
      </div>

      <div 
        class="section-block"
        in:fly={{ y: 20, duration: 600, delay: 1000, easing: cubicOut }}
      >
        <h3 class="section-title text-[var(--color-orange)]">What We Delivered</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="section-subtitle font-medium">Strategy & Allocation</h4>
            <ul class="space-y-2">
              <li class="feature-item">Designed risk-adjusted yield strategies</li>
              <li class="feature-item">Modeled capital allocation</li>
              <li class="feature-item">Selected and segmented protocols</li>
            </ul>
          </div>
          <div>
            <h4 class="section-subtitle font-medium">Vault Infrastructure</h4>
            <ul class="space-y-2">
              <li class="feature-item">Deployed extended ERC-4626 vault</li>
              <li class="feature-item">Integrated contracts using Lagoon stack</li>
              <li class="feature-item">Configured Safe multisigs</li>
            </ul>
          </div>
          <div>
            <h4 class="section-subtitle font-medium">NAV Valuation Oracle</h4>
            <ul class="space-y-2">
              <li class="feature-item">Built custom on-chain/off-chain oracle</li>
              <li class="feature-item">Aggregated protocol-level data</li>
              <li class="feature-item">Automated daily NAV pushes</li>
            </ul>
          </div>
          <div>
            <h4 class="section-subtitle font-medium">Frontend & Operations</h4>
            <ul class="space-y-2">
              <li class="feature-item">Developed institutional-grade dashboard</li>
              <li class="feature-item">Real-time monitoring tools</li>
              <li class="feature-item">Whitelist and withdrawal interfaces</li>
            </ul>
          </div>
        </div>
      </div>

      <div 
        class="section-block"
        in:fly={{ y: 20, duration: 600, delay: 1200, easing: cubicOut }}
      >
        <h3 class="section-title text-[var(--color-orange)]">Outcome</h3>
        <p class="section-subtitle">
          DeTrade enables a crypto asset manager to operate an institutional-grade yield strategy with full transparency and robust infrastructure. It now serves as a reference implementation for other funds and partners in the DeFi space.
        </p>
      </div>

      <!-- Projects Showcase -->
      <div class="mt-24 space-y-16 md:space-y-32">
        {#each projects as project, index}
          {#if project.featured}
            <div 
              class="relative grid grid-cols-12 gap-4 md:gap-16"
              in:fly={{ y: 20, duration: 600, delay: 1400 + (index * 200), easing: cubicOut }}
            >
              <div class="col-span-12 md:col-span-5 flex flex-col justify-center 
                          {index % 2 === 1 ? 'md:order-1' : ''} order-1"
              >
                <div class="space-y-4 text-left md:text-{index % 2 === 1 ? 'left' : 'right'} 
                            flex flex-col items-start md:items-{index % 2 === 1 ? 'start' : 'end'}"
                >
                  <p class="font-mono text-[var(--color-orange)] text-sm">Featured Project</p>
                  <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-light whitespace-nowrap">
                    {project.title}
                  </h3>

                  <div class="block md:hidden w-full">
                    <div class="relative rounded-lg overflow-hidden group h-fit">
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block w-full h-full"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          class="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <div class="absolute inset-0 bg-[var(--color-orange)] opacity-40 mix-blend-color group-hover:opacity-0 transition-opacity duration-300"></div>
                      </a>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="absolute top-4 right-4 external-link bg-[#2a2a2a] p-2 rounded-lg z-20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div class="bg-[#2a2a2a] p-4 md:p-6 rounded-lg w-full md:w-auto 
                             {index % 2 === 1 ? 'md:-mr-48' : 'md:-ml-48'} relative z-10 
                             border border-[var(--color-orange)]/20"
                  >
                    <p class="text-light/70 text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                  <div class="flex flex-col gap-4 w-full">
                    <ul class="flex flex-wrap gap-x-3 gap-y-4 text-sm md:text-base 
                               {index % 2 === 1 ? '' : 'md:justify-end'}"
                    >
                      {#each project.technologies as tech}
                        <li>
                          <span class="tech-pill">{tech}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
              </div>

              <div 
                class="hidden md:block col-span-12 md:col-span-7 relative rounded-lg overflow-hidden group h-fit 
                       {index % 2 === 1 ? 'md:order-2' : ''}"
              >
                <div class="absolute inset-0 z-10">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full h-full"
                  ></a>
                </div>
                
                <img 
                  src={project.image} 
                  alt={project.title}
                  class="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div class="absolute inset-0 bg-[var(--color-orange)] opacity-40 mix-blend-color group-hover:opacity-0 transition-opacity duration-300"></div>
                <div class="absolute top-4 right-4 external-link bg-[#2a2a2a] p-2 rounded-lg z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section> 