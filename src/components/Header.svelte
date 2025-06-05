<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { activeSection } from '../stores/navigation';
    import { page } from '$app/stores';
  
    /**
     * State variables
     */
    let lastScrollY = 0;
    let isNavVisible = true;
    let hasScrolled = false;
    let isMenuOpen = false;
    let isHeaderMounted = false;
    let scrollTimeout: number;

    // Détermine si nous sommes sur la landing page
    $: isLandingPage = $page.url.pathname === '/';
    
    // Détermine la page courante
    $: currentPage = $page.url.pathname;

    // Détermine si nous sommes sur la page projets
    $: isProjectsPage = $page.url.pathname === '/projects';

    // Calcule le numéro pour chaque lien
    $: getLinkNumber = (baseNumber: number) => {
        if (isLandingPage) return baseNumber;
        
        // Sur les pages de services, on commence toujours à 1 pour Home
        if (baseNumber === 1) return 1;
        
        // Pour les autres liens, on compte combien de liens sont visibles avant celui-ci
        let visibleCount = 1; // On commence à 1 car Home est toujours visible
        
        if (currentPage !== '/services/strategy-yield-design' && !isProjectsPage) {
            if (baseNumber === 2) return visibleCount + 1;
            visibleCount++;
        }
        
        if (currentPage !== '/services/smart-contract-operations' && !isProjectsPage) {
            if (baseNumber === 3) return visibleCount + 1;
            visibleCount++;
        }
        
        if (currentPage !== '/services/defi-control-interface' && !isProjectsPage) {
            if (baseNumber === 4) return visibleCount + 1;
            visibleCount++;
        }
        
        return visibleCount + 1;
    };

    /**
     * Fonction pour détecter quelle section est visible
     */
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach((section) => {
            // Cast section to HTMLElement since querySelectorAll returns Element
            const sectionElement = section as HTMLElement;
            const sectionTop = sectionElement.offsetTop;
            const sectionHeight = sectionElement.offsetHeight;
            const sectionId = sectionElement.getAttribute('id') || '';

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if ($activeSection !== sectionId) {
                    activeSection.set(sectionId);
                    history.replaceState(null, '', `/#${sectionId}`);
                }
            }
        });
    }

    /**
     * Checks if a section is currently active
     */
    $: isActive = (section: string) => $activeSection === section;

    /**
     * Handle URL hash changes
     */
    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            activeSection.set(hash);
        }
    }

    /**
     * Initializes header animations and scroll behavior
     */
    onMount(() => {
        // Initial hash check and section update
        handleHashChange();
        updateActiveSection();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isNavVisible = currentScrollY < lastScrollY || currentScrollY < 50;
            hasScrolled = currentScrollY > 50;
            lastScrollY = currentScrollY;
            
            // Clear previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set new timeout to hide border after scrolling stops
            if (currentScrollY < lastScrollY) {
                scrollTimeout = setTimeout(() => {
                    hasScrolled = false;
                }, 1000); // Hide border after 1 second of no scrolling
            }
            
            // Mettre à jour la section active pendant le défilement
            updateActiveSection();
        };
  
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        setTimeout(() => {
            isHeaderMounted = true;
        }, 300);
  
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    });

    /**
     * Toggles mobile menu state
     */
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    /**
     * Handles link click
     */
    const handleLinkClick = (section: string) => {
        isMenuOpen = false;
        activeSection.set(section);
        
        // Scroll doux vers la section
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
</script>
  
<style>
    /* Section number styling */
    .number {
      color: var(--color-orange);
      opacity: 1 !important;
    }

    /* Resume button styling */
    .resume-button {
      color: var(--color-orange);
      border-color: var(--color-orange);
    }

    .resume-button :global(.fill) {
      background-color: var(--color-orange-10);
    }

    /* Active link styling */
    .active-link {
      color: var(--color-orange) !important;
    }

    /* Mobile menu styles */
    .hamburger {
        display: none;
    }

    .nav-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3rem;
    }

    /* Mobile responsive styles */
    @media (max-width: 768px) {
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .hamburger {
            display: block;
            cursor: pointer;
            z-index: 20;
            position: absolute;
            right: 1.5rem;  /* 24px from the right edge */
            top: 50%;      /* Center vertically */
            transform: translateY(-50%);
        }

        .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgb(17, 17, 17, 0.97); /* Même couleur que bg-dark avec légère transparence */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            gap: 2rem;
            z-index: 10;
        }

        .nav-links li {
            width: 100%;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .nav-links.open {
            transform: translateX(0);
        }

        .nav-links.open li {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-links a {
            justify-content: center;
            font-size: 1.25rem;
        }

        .nav-links .resume-button {
            margin-top: 2rem;
            width: fit-content;
        }

        :global(.mobile-menu-overlay) {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
        }

        :global(.mobile-menu-overlay.open) {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .hamburger span {
        @apply bg-[var(--color-orange)];
    }
</style>
  
<header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[var(--color-dark)]/95"
    class:translate-y-[-100%]={!isNavVisible}
    class:opacity-0={!isNavVisible}
>
    <nav class="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 relative">
        <!-- Logo -->
        {#if isHeaderMounted}
            <a 
                href="/" 
                class="absolute left-6 md:left-12 top-1/2 -translate-y-1/2"
                in:fly={{ y: -20, duration: 800 }}
            >
                <img src="/ap3labs_logo.webp" alt="Logo" class="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </a>

            <!-- Navigation Links -->
            <ul class="nav-links text-light/60" class:open={isMenuOpen}>
                {#if isLandingPage}
                    <li in:fly={{ y: -20, duration: 800, delay: 200 }}>
                        <a 
                            href="/#services" 
                            class="group flex items-center gap-2 hover:text-primary transition-colors"
                            class:active-link={isActive('services')}
                            on:click={() => handleLinkClick('services')}
                        >
                            <span class="number text-sm">01.</span>
                            <span class="relative">
                                Services
                                <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </a>
                    </li>
                    <li in:fly={{ y: -20, duration: 800, delay: 300 }}>
                        <a 
                            href="/#projects" 
                            class="group flex items-center gap-2 hover:text-primary transition-colors"
                            class:active-link={isActive('projects')}
                            on:click={() => handleLinkClick('projects')}
                        >
                            <span class="number text-sm">02.</span>
                            <span class="relative">
                                Projects
                                <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </a>
                    </li>
                    <li in:fly={{ y: -20, duration: 800, delay: 400 }}>
                        <a 
                            href="/#about" 
                            class="group flex items-center gap-2 hover:text-primary transition-colors"
                            class:active-link={isActive('about')}
                            on:click={() => handleLinkClick('about')}
                        >
                            <span class="number text-sm">03.</span>
                            <span class="relative">
                                About
                                <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </a>
                    </li>
                {:else}
                    <li in:fly={{ y: -20, duration: 800, delay: 200 }}>
                        <a 
                            href="/" 
                            class="group flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <span class="number text-sm">{getLinkNumber(1).toString().padStart(2, '0')}.</span>
                            <span class="relative">
                                Home
                                <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </a>
                    </li>
                    {#if currentPage !== '/services/strategy-yield-design' && !isProjectsPage}
                        <li in:fly={{ y: -20, duration: 800, delay: 300 }}>
                            <a 
                                href="/services/strategy-yield-design" 
                                class="group flex items-center gap-2 hover:text-primary transition-colors"
                            >
                                <span class="number text-sm">{getLinkNumber(2).toString().padStart(2, '0')}.</span>
                                <span class="relative">
                                    Strategy & Yield Design
                                    <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                        </li>
                    {/if}
                    {#if currentPage !== '/services/smart-contract-operations' && !isProjectsPage}
                        <li in:fly={{ y: -20, duration: 800, delay: 400 }}>
                            <a 
                                href="/services/smart-contract-operations" 
                                class="group flex items-center gap-2 hover:text-primary transition-colors"
                            >
                                <span class="number text-sm">{getLinkNumber(3).toString().padStart(2, '0')}.</span>
                                <span class="relative">
                                    Smart Contract Operations
                                    <span class="absolute -bottom-1 left:0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                        </li>
                    {/if}
                    {#if currentPage !== '/services/defi-control-interface' && !isProjectsPage}
                        <li in:fly={{ y: -20, duration: 800, delay: 500 }}>
                            <a 
                                href="/services/defi-control-interface" 
                                class="group flex items-center gap-2 hover:text-primary transition-colors"
                            >
                                <span class="number text-sm">{getLinkNumber(4).toString().padStart(2, '0')}.</span>
                                <span class="relative">
                                    DeFi Control Interface
                                    <span class="absolute -bottom-1 left:0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                        </li>
                    {/if}
                {/if}
            </ul>
        {/if}

        <!-- Hamburger Menu Button -->
        {#if isHeaderMounted}
            <button 
                class="hamburger"
                on:click={toggleMenu}
                aria-label="Toggle menu"
                in:fly={{ y: -20, duration: 800, delay: 700 }}
            >
                <div class="flex flex-col gap-1.5">
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-transform duration-300" class:rotate-45={isMenuOpen} class:translate-y-2={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-opacity duration-300" class:opacity-0={isMenuOpen}></span>
                    <span class="block w-6 h-0.5 bg-[var(--color-orange)] transition-transform duration-300" class:-rotate-45={isMenuOpen} class:-translate-y-2={isMenuOpen}></span>
                </div>
            </button>
        {/if}

        <!-- Mobile Menu Overlay -->
        <div 
            class="mobile-menu-overlay"
            class:open={isMenuOpen}
            on:click={() => isMenuOpen = false}
        ></div>
    </nav>
</header> 