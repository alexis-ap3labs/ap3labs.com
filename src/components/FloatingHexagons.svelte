<script lang="ts">
  import { onMount } from 'svelte';

  // Positions prédéfinies pour les 8 hexagones sur les bords
  const positions = [
    // Coin supérieur gauche
    { x: 5, y: 5 },
    // Coin supérieur droit
    { x: 85, y: 5 },
    // Milieu gauche haut
    { x: 5, y: 30 },
    // Milieu droit haut
    { x: 85, y: 30 },
    // Milieu gauche bas
    { x: 5, y: 70 },
    // Milieu droit bas
    { x: 85, y: 70 },
    // Haut centre
    { x: 50, y: 5 },
    // Bas centre
    { x: 50, y: 70 }
  ];

  const hexagons = positions.map((pos, i) => {
    // Ajouter une légère variation aléatoire
    const x = pos.x + (Math.random() * 10 - 5);
    const y = pos.y + (Math.random() * 10 - 5);
    
    return {
      id: i,
      size: Math.random() * 40 + 100, // Tailles entre 100px et 140px
      x,
      y,
      delay: 0.2,
      duration: Math.random() * 8 + 25,
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360,
      rotationZ: Math.random() * 360,
    };
  });
</script>

<div class="hexagons-container">
  {#each hexagons as hexagon}
    <div
      class="hexagon"
      style="
        --size: {hexagon.size}px;
        --x: {hexagon.x}%;
        --y: {hexagon.y}%;
        --delay: {hexagon.delay}s;
        --duration: {hexagon.duration}s;
        --rotation-x: {hexagon.rotationX}deg;
        --rotation-y: {hexagon.rotationY}deg;
        --rotation-z: {hexagon.rotationZ}deg;
      "
    />
  {/each}
</div>

<style>
  .hexagons-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    perspective: 1000px;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .hexagon {
    position: absolute;
    width: var(--size);
    height: var(--size);
    left: var(--x);
    top: var(--y);
    transform-style: preserve-3d;
    animation: float var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .hexagon::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ff8800 0%, transparent 100%);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    border: 1px solid rgba(255, 136, 0, 0.3);
    backdrop-filter: blur(2px);
    opacity: 0.2;
  }

  @keyframes float {
    0% {
      transform: 
        translate3d(0, 0, 0)
        rotateX(var(--rotation-x))
        rotateY(var(--rotation-y))
        rotateZ(var(--rotation-z))
        scale(0.8);
      opacity: 0;
    }
    20% {
      opacity: 0.2;
    }
    50% {
      transform: 
        translate3d(calc(var(--size) * 0.2), calc(var(--size) * -0.15), calc(var(--size) * 0.1))
        rotateX(calc(var(--rotation-x) + 180deg))
        rotateY(calc(var(--rotation-y) + 180deg))
        rotateZ(calc(var(--rotation-z) + 180deg))
        scale(1.1);
    }
    80% {
      opacity: 0.2;
    }
    100% {
      transform: 
        translate3d(0, 0, 0)
        rotateX(var(--rotation-x))
        rotateY(var(--rotation-y))
        rotateZ(var(--rotation-z))
        scale(0.8);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .hexagon {
      --size: calc(var(--size) * 0.7);
    }
  }

  main {
    position: relative;
    z-index: 1;
  }

  footer {
    position: relative;
    z-index: 2;
  }
</style> 