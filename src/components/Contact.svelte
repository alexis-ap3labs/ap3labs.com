<script lang="ts">
  import { onMount } from 'svelte';
  import ContactModal from './ContactModal.svelte';
  
  /**
   * State for section visibility animation
   * @type {boolean}
   */
  let isVisible = false;

  /**
   * State for modal visibility
   * @type {boolean}
   */
  let isModalOpen = false;
  
  // Initialize visibility on component mount
  onMount(() => {
    isVisible = true;
  });

  /**
   * Opens the contact modal
   */
  function openModal() {
    isModalOpen = true;
  }

  /**
   * Closes the contact modal
   */
  function closeModal() {
    isModalOpen = false;
  }
</script>

<style>
  /* Section number styling */
  .number {
    color: var(--color-orange);
    opacity: 1;
  }

  /* Contact button styling */
  .contact-button {
    color: var(--color-orange);
    border-color: var(--color-orange);
  }

  .contact-button :global(.fill) {
    background-color: var(--color-orange);
    opacity: 0.1;
  }

  /* Section fade-in animation styles */
  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out, visibility 0.6s ease-out;
  }
  
  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }

  /* Font families */
  h2 {
    font-family: 'SF Mono', monospace;
  }

  h3, p {
    font-family: 'Satoshi', sans-serif;
  }
</style>

<section 
  id="contact" 
  class="pt-16 pb-16 bg-dark scroll-mt-20 fade-in-section"
  class:is-visible={isVisible}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
    <!-- Titre avec ligne -->
    <div class="flex items-center gap-4 mb-8 md:mb-16">
      <h2 class="text-2xl font-mono whitespace-nowrap">
        <span class="number">04.</span>
        <span class="text-light">Contact</span>
      </h2>
      <div class="h-[1px] w-32 md:w-96 bg-light/20"></div>
    </div>
    
    <h3 class="text-4xl sm:text-6xl md:text-7xl font-bold text-light mb-4 whitespace-nowrap">
      What's Next?
    </h3>
    
    <h4 class="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-400 mb-8">
      Get In Touch
    </h4>
    
    <p class="text-light/70 max-w-2xl text-base sm:text-lg mb-12 leading-relaxed">
      I'm currently open to exploring new opportunities in the DeFi and blockchain space. 
      Whether you have an exciting project, a job opportunity, or just want to connect, 
      feel free to reach out - I'll make sure to get back to you!
    </p>
    
    <div>
      <button
        on:click={openModal}
        class="contact-button group relative inline-block px-6 py-3 rounded border
               overflow-hidden transition-colors duration-300"
      >
        <!-- Effet de remplissage -->
        <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        
        <!-- Effet de brillance -->
        <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                     translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
        
        <!-- Texte -->
        <span class="relative z-10">Get in Touch</span>
      </button>
    </div>
  </div>
</section>

<ContactModal isOpen={isModalOpen} onClose={closeModal} /> 