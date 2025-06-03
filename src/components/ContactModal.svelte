<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';

  /**
   * Props
   */
  export let isOpen = false;
  export let onClose: () => void;

  /**
   * Form state
   */
  let name = '';
  let email = '';
  let message = '';
  let isLoading = false;
  let errorMessage = '';
  let isSuccess = false;

  /**
   * Handles form submission
   * @param {Event} e - Form submission event
   */
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMessage = '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      
      // Show success message
      isSuccess = true;
      
      // Close modal after delay and reset form
      setTimeout(() => {
        isSuccess = false;
        onClose();
        name = '';
        email = '';
        message = '';
      }, 3000);

    } catch (error: unknown) {
      errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

<style>
  /* Contact button styling with hover effects */
  .contact-button {
    color: var(--color-orange);
    border-color: var(--color-orange);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .contact-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-orange-10);
  }

  .contact-button :global(.fill) {
    background-color: var(--color-orange-10);
  }
</style>

<!-- Modal Container -->
{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    transition:fade={{ duration: 200 }}
    on:click={onClose}
  >
    <div
      class="bg-dark rounded-lg p-6 w-full max-w-md border border-light/10 shadow-xl"
      transition:scale={{ duration: 300, start: 0.95 }}
      on:click|stopPropagation
    >
      {#if isSuccess}
        <div 
          in:fly={{ y: 20, duration: 300, delay: 200 }}
          out:fade={{ duration: 200 }}
          class="text-center py-8 space-y-4"
        >
          <div 
            class="text-orange text-4xl mb-4"
            in:scale={{ duration: 400, delay: 300 }}
          >
            ✓
          </div>
          <h3 
            class="text-xl font-bold text-light"
            in:fly={{ y: 10, duration: 300, delay: 400 }}
          >
            Thank you for reaching out!
          </h3>
          <p 
            class="text-light/80"
            in:fly={{ y: 10, duration: 300, delay: 500 }}
          >
            I'll get back to you as soon as possible.
          </p>
        </div>
      {:else}
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-light">Get in Touch</h2>
          <button
            class="text-light/50 hover:text-light/80 transition-colors"
            on:click={onClose}
          >
            ✕
          </button>
        </div>

        <form on:submit={handleSubmit} class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-light/80">Name</label>
            <input
              type="text"
              id="name"
              bind:value={name}
              required
              class="mt-1 block w-full rounded-md bg-dark border-light/10 text-light shadow-sm 
                     focus:border-orange focus:ring-orange focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-light/80">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="mt-1 block w-full rounded-md bg-dark border-light/10 text-light shadow-sm 
                     focus:border-orange focus:ring-orange focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-light/80">Message</label>
            <textarea
              id="message"
              bind:value={message}
              required
              rows="4"
              class="mt-1 block w-full rounded-md bg-dark border-light/10 text-light shadow-sm 
                     focus:border-orange focus:ring-orange focus:ring-opacity-50"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            class="w-full contact-button group relative inline-block px-6 py-3 rounded border
                   overflow-hidden transition-colors duration-300 {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            <!-- Effet de remplissage -->
            <span class="fill absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            
            <!-- Effet de brillance -->
            <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            
            <!-- Texte -->
            <span class="relative z-10">
              {isLoading ? 'Sending...' : 'Send Message'}
            </span>
          </button>
        </form>

        {#if errorMessage}
          <p class="mt-2 text-red-500 text-sm">{errorMessage}</p>
        {/if}
      {/if}
    </div>
  </div>
{/if} 