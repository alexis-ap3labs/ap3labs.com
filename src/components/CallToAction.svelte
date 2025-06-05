<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
</script>

<style>
  .cta-section {
    padding: 8rem 0;
    text-align: center;
    background: transparent;
    min-height: 50vh;
    display: flex;
    align-items: center;
  }

  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .cta-subtitle {
    font-size: 1.2rem;
    color: var(--color-light);
    opacity: 0.9;
    margin-bottom: 3rem;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-button {
    display: inline-block;
    background: transparent;
    border: 1px solid var(--color-orange);
    color: var(--color-orange);
    padding: 1.25rem 3rem;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
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

  @media (max-width: 768px) {
    .cta-section {
      padding: 6rem 0;
      min-height: 40vh;
    }

    .cta-title {
      font-size: 2rem;
      padding: 0 1rem;
    }

    .cta-subtitle {
      font-size: 1.1rem;
      padding: 0 1rem;
    }

    .cta-button {
      padding: 1rem 2.5rem;
      font-size: 1rem;
    }
  }
</style>

<section class="cta-section">
  <div class="cta-container">
    <h2 
      class="cta-title"
      in:fly={{ y: 20, duration: 600, easing: cubicOut }}
    >
      Ready to Scale Your DeFi Operations?
    </h2>
    <p 
      class="cta-subtitle"
      in:fly={{ y: 20, duration: 600, delay: 200, easing: cubicOut }}
    >
      Let's discuss how we can optimize your yield strategies and streamline your DeFi infrastructure.
    </p>
    <a 
      href="https://calendly.com/alexis-ap3labs/30min"
      target="_blank"
      rel="noopener noreferrer"
      class="cta-button"
      in:fly={{ y: 20, duration: 600, delay: 400, easing: cubicOut }}
    >
      <div class="fill"></div>
      <div class="shine"></div>
      <span>Schedule a Call</span>
    </a>
  </div>
</section> 