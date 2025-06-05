<script lang="ts">
  import Header from '../components/Header.svelte';
  import Hero from '../components/Hero.svelte';
  import Services from '../components/Services.svelte';
  import Projects from '../components/Projects.svelte';
  import About from '../components/About.svelte';
  import Footer from '../components/Footer.svelte';
  import FloatingHexagons from '../components/FloatingHexagons.svelte';
  import CallToAction from '../components/CallToAction.svelte';
  import { onMount } from 'svelte';

  /**
   * State variables
   */
  let activeSection = '';
  let sectionsVisible = {
    about: false,
    services: false,
    projects: false
  } as const;

  let scrollProgress = 0;
  let mainElement: HTMLElement;

  /**
   * Initialize page behavior
   */
  onMount(() => {
    // Set initial active section
    activeSection = window.location.hash.slice(1);
    
    // Ajouter l'écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);
    
    // Add parallax effect on scroll
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
      parallaxElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          const speed = element.dataset.speed || '0.1';
          const yPos = window.scrollY * parseFloat(speed);
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    });
    
    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Fonction pour calculer la progression du défilement
  function handleScroll() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = (window.scrollY / windowHeight) * 100;
  }
</script>

<style>
  /* Section fade-in animation */
  section {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    z-index: 9999;
  }

  .scroll-progress {
    height: 100%;
    background: linear-gradient(
      90deg,
      #ff8800 0%,
      #ff9933 50%,
      #ffaa33 100%
    );
    box-shadow: 0 0 10px rgba(255, 136, 0, 0.5);
    width: var(--progress);
    transition: width 0.1s ease-out;
  }

  /* Modifier le background global */
  :global(body) {
    min-height: 100vh;
    background-color: var(--bg-dark); /* Utiliser bg-dark au lieu de color-dark */
    margin: 0;
    padding: 0;
  }

  main {
    position: relative;
    min-height: 100vh;
    background: transparent;
    overflow: visible;
  }

  :global(.parallax) {
    will-change: transform;
  }

  /* Supprimer l'effet de vignette qui assombrissait les bords */
  main::after {
    display: none;
  }

  /* Ajuster le z-index du contenu principal */
  :global(section) {
    position: relative;
    z-index: 2;
  }
</style>

<Header />

<!-- Indicateur de défilement -->
<div class="scroll-indicator">
  <div 
    class="scroll-progress" 
    style="--progress: {scrollProgress}%"
  ></div>
</div>

<!-- Main Content -->
<main 
  bind:this={mainElement}
  style="--scroll: {scrollProgress}"
>
  <FloatingHexagons />
  <Hero />
  <section id="services">
    <Services />
  </section>
  <section id="projects">
    <Projects />
  </section>
  <section id="about">
    <About />
  </section>
  <CallToAction />
</main>

<Footer />

<svelte:head>
    <title>AP3 Labs - Scalable DeFi Operations</title>
    <meta name="description" content="End-to-end custom solutions for DeFi operations from strategy design and infrastructure setup to ongoing operations and reporting tools. Full-stack DeFi yield implementation." />
</svelte:head>
