<script lang="ts">
    import UnifiedFrontEndPlatform from '../../../components/UnifiedFrontEndPlatform.svelte';
    import Header from '../../../components/Header.svelte';
    import Footer from '../../../components/Footer.svelte';
    import FloatingHexagons from '../../../components/FloatingHexagons.svelte';
</script>

<svelte:head>
    <title>DeFi Control Interface - AP3 Labs</title>
    <meta name="description" content="Comprehensive front-end platform integrating analytics, position management, and back-office operations into one seamless interface for DeFi operations." />
    <meta property="og:title" content="DeFi Control Interface - AP3 Labs" />
    <meta property="og:description" content="Comprehensive front-end platform integrating analytics, position management, and back-office operations into one seamless interface for DeFi operations." />
    <meta name="twitter:title" content="DeFi Control Interface - AP3 Labs" />
    <meta name="twitter:description" content="Comprehensive front-end platform integrating analytics, position management, and back-office operations into one seamless interface for DeFi operations." />
</svelte:head>

<Header />
<FloatingHexagons />
<UnifiedFrontEndPlatform />
<Footer /> 