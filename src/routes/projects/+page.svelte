<script lang="ts">
  import Header from '../../components/Header.svelte';
  import ProjectsList from '../../components/ProjectsList.svelte';
  import Footer from '../../components/Footer.svelte';
  import FloatingHexagons from '../../components/FloatingHexagons.svelte';
  import { onMount } from 'svelte';

  let scrollProgress = 0;
  let mainElement: HTMLElement;

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = (window.scrollY / windowHeight) * 100;
  }
</script>

<style>
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

  :global(body) {
    min-height: 100vh;
    background-color: var(--bg-dark);
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

  main::after {
    display: none;
  }

  :global(section) {
    position: relative;
    z-index: 2;
  }
</style>

<Header />

<div class="scroll-indicator">
  <div 
    class="scroll-progress" 
    style="--progress: {scrollProgress}%"
  ></div>
</div>

<main 
  bind:this={mainElement}
  style="--scroll: {scrollProgress}"
>
  <FloatingHexagons />
  <ProjectsList />
</main>

<Footer />

<svelte:head>
    <title>DeTrade Fund - AP3 Labs</title>
    <meta name="description" content="Discover our portfolio of DeFi projects and implementations. From yield strategies to infrastructure solutions, explore how we're building the future of decentralized finance." />
</svelte:head> 