<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    
    /**
     * Props
     * @callback finishLoading - Function to call when loading is complete
     */
    export let finishLoading: () => void;

    /**
     * State for component mounting
     * @type {boolean}
     */
    let isMounted = false;
    
    /**
     * Initialize loader animation and trigger finishLoading callback
     */
    onMount(() => {
        // Skip loader on /projects and /services routes
        if ($page.url.pathname === '/projects' || $page.url.pathname.startsWith('/services/')) {
            finishLoading();
            return;
        }

        setTimeout(() => {
            isMounted = true;
            setTimeout(finishLoading, 1000);
        }, 10);
    });
</script>

<style>
    /* Logo fade-in animation */
    .animate-draw {
        opacity: 0;
        animation: fadeInLogo 0.5s ease forwards;
    }

    @keyframes fadeInLogo {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Logo fade-out animation */
    .logo-wrapper {
        animation: fadeOut 0.3s ease forwards 0.7s;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.1);
        }
    }
</style>

<!-- Loader Container -->
<div 
    class="fixed inset-0 z-[99] flex items-center justify-center bg-dark"
    transition:fade={{ duration: 200 }}
>
    {#if isMounted}
        <div 
            class="logo-wrapper"
            in:fade={{ duration: 300, delay: 150 }}
        >
            <img 
                src="/ap3labs_logo.webp" 
                alt="AP3 Labs Logo"
                class="w-32 h-32 object-contain animate-draw"
            />
        </div>
    {/if}
</div> 