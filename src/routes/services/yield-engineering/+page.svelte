<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '../../../components/Header.svelte';
  import Footer from '../../../components/Footer.svelte';
  import FloatingHexagons from '../../../components/FloatingHexagons.svelte';
  import YieldEngineering from '../../../components/YieldEngineering.svelte';

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
  <YieldEngineering />
</main>

<Footer />

<svelte:head>
    <title>Yield Engineering - AP3 Labs</title>
    <meta name="description" content="Comprehensive DeFi yield engineering and strategy implementation. From strategy design to implementation, we deliver institutional-grade DeFi yield solutions." />
</svelte:head> 