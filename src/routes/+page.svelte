<script lang="ts">
  import Header from '../components/Header.svelte';
  import Hero from '../components/Hero.svelte';
  import Services from '../components/Services.svelte';
  import Projects from '../components/Projects.svelte';
  import About from '../components/About.svelte';
  import Footer from '../components/Footer.svelte';
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
  let mouseX = 0;
  let mouseY = 0;
  let mainElement: HTMLElement;

  function handleMouseMove(event: MouseEvent) {
    if (!mainElement) return;
    const { clientX, clientY } = event;
    const { width, height } = mainElement.getBoundingClientRect();
    
    // Normalize coordinates between -1 and 1
    mouseX = (clientX / width) * 2 - 1;
    mouseY = (clientY / height) * 2 - 1;
  }

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
    background: var(--color-dark); /* Fond uni */
    margin: 0;
    padding: 0;
  }

  main {
    position: relative;
    min-height: 100vh;
    background: transparent;
    overflow: visible;
  }

  .background-grain {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.15; /* Réduire l'opacité */
    pointer-events: none;
    z-index: 0;
  }

  /* Ajuster l'opacité et la taille du cursor-glow */
  .cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle at center,
      rgba(255, 136, 0, 0.15),
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 1;
    opacity: 0.2; /* Réduire l'opacité */
    mix-blend-mode: screen;
  }

  .floating-element {
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--color-orange-10), transparent);
    filter: blur(100px);
    opacity: 0.15; /* Réduire l'opacité */
    pointer-events: none;
  }

  .floating-element:nth-child(1) {
    top: 20%;
    left: 10%;
  }

  .floating-element:nth-child(2) {
    bottom: 30%;
    right: 15%;
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

<div 
  class="cursor-glow"
  style="left: {50 + mouseX * 100}%; top: {50 + mouseY * 100}%"
/>

<div class="background-grain" />
<div class="floating-element parallax" data-speed="-0.2" />
<div class="floating-element parallax" data-speed="0.1" />

<!-- Main Content -->
<main 
  bind:this={mainElement}
  on:mousemove={handleMouseMove}
  style="--scroll: {scrollProgress}"
>
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
</main>

<Footer />

<svelte:head>
    <title>Alexis Péron - Full Stack Developer | AP3 Labs</title>
    <meta name="description" content="Passionate Full Stack Developer with expertise in JavaScript, TypeScript, React, and Node.js. Discover my portfolio and professional journey at AP3 Labs." />
</svelte:head>
