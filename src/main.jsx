import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Calendar, Car, Check, ChevronDown,
  Clock3, Coffee, Compass, Copy, ExternalLink, Heart, IceCreamBowl, Instagram, Map, MapPin, Menu as MenuIcon,
  MessageCircle, Minus, Navigation, Phone, Plus, ShieldCheck, ShoppingBag, Sparkles, Star, Utensils, UtensilsCrossed, X
} from 'lucide-react';
import AdminPanel from './AdminPanel';
import {
  getStoredMenu, getStoredSettings, addStoredBooking, addStoredOrder,
  DEFAULT_MENU_ITEMS
} from './adminData';
import './styles.css';

function CafeLogoMark({ size = 42 }) {
  const height = Math.round(size * 1.18);
  return (
    <div className="brand-crest" style={{ width: size, height }}>
      <svg
        viewBox="0 0 46 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={height}
        aria-hidden="true"
      >
        <defs>
          {/* Deep espresso velvet backdrop gradient */}
          <linearGradient id="archVelvet" x1="23" y1="4" x2="23" y2="51" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3d2217" />
            <stop offset="0.6" stopColor="#25140d" />
            <stop offset="1" stopColor="#140b07" />
          </linearGradient>

          {/* Luxury burnished gold rim */}
          <linearGradient id="goldArchRim" x1="7" y1="4" x2="39" y2="51" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe6c7" />
            <stop offset="0.3" stopColor="#df8e5d" />
            <stop offset="0.7" stopColor="#f8ca9b" />
            <stop offset="1" stopColor="#9a4829" />
          </linearGradient>

          {/* Artisan gelato swirl gradient */}
          <linearGradient id="creamSwirl" x1="18" y1="17" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff8ee" />
            <stop offset="0.45" stopColor="#fcdbb5" />
            <stop offset="1" stopColor="#d97a47" />
          </linearGradient>

          {/* Bistro ceramic cup gradient */}
          <linearGradient id="cupGrad" x1="15" y1="28" x2="31" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e27c49" />
            <stop offset="0.5" stopColor="#bd5833" />
            <stop offset="1" stopColor="#7a2e16" />
          </linearGradient>

          {/* Subtle inner ambient glow */}
          <radialGradient id="archInnerGlow" cx="50%" cy="40%" r="50%">
            <stop stopColor="#e88a59" stopOpacity="0.25" />
            <stop offset="1" stopColor="#e88a59" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Architectural Arch */}
        <path
          d="M 7 47 L 7 21 C 7 11 14.2 4 23 4 C 31.8 4 39 11 39 21 L 39 47 C 39 49.5 37.5 50.5 35 50.5 L 11 50.5 C 8.5 50.5 7 49.5 7 47 Z"
          fill="url(#archVelvet)"
          stroke="url(#goldArchRim)"
          strokeWidth="1.25"
        />

        {/* Inner ambient illumination */}
        <path
          d="M 8.5 46.5 L 8.5 21 C 8.5 12 15 5.5 23 5.5 C 31 5.5 37.5 12 37.5 21 L 37.5 46.5 Z"
          fill="url(#archInnerGlow)"
        />

        {/* Inner Dashed Architectural Hairline */}
        <path
          d="M 9.8 46 L 9.8 21.5 C 9.8 12.8 15.6 6.8 23 6.8 C 30.4 6.8 36.2 12.8 36.2 21.5 L 36.2 46"
          stroke="rgba(248, 214, 178, 0.45)"
          strokeWidth="0.75"
          strokeDasharray="1.5 2"
          fill="none"
        />

        {/* Top Keystone Apex 4-Point Star */}
        <path
          d="M 23 8 L 23.8 10.4 L 26.2 11.2 L 23.8 12 L 23 14.4 L 22.2 12 L 19.8 11.2 L 22.2 10.4 Z"
          fill="#ffdfba"
        />
        <circle cx="15.5" cy="14" r="0.8" fill="#e9a274" opacity="0.75" />
        <circle cx="30.5" cy="14" r="0.8" fill="#e9a274" opacity="0.75" />

        {/* Delicate Steam / Aroma Ribbons */}
        <path
          d="M 19 18.5 C 18 17 19.5 15.5 18.5 14"
          stroke="#f8cca3"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 23 17.5 C 22 15.8 24 14.5 23 13"
          stroke="#ffe6cc"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M 27 18.5 C 26 17 27.5 15.5 26.5 14"
          stroke="#f8cca3"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Gelato / Dessert Swirl Crown */}
        <path
          d="M 23 17.5 C 20.8 17.5 19.2 19.2 19.2 20.8 C 19.2 21.8 19.7 22.5 20.4 23.1 C 18.8 23.8 17.2 25 17.2 26.8 C 17.2 27.8 18.5 28.4 23 28.4 C 27.5 28.4 28.8 27.8 28.8 26.8 C 28.8 25 27.2 23.8 25.6 23.1 C 26.3 22.5 26.8 21.8 26.8 20.8 C 26.8 19.2 25.2 17.5 23 17.5 Z"
          fill="url(#creamSwirl)"
        />
        <path
          d="M 20.6 20.5 C 21.3 19.2 23.5 19.2 24.8 19.9"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 19 25.5 C 20.8 24.5 24.8 24.5 27 25.5"
          stroke="#b85228"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* European Bistro Cup Body */}
        <path
          d="M 15.5 27.5 C 15.5 33.2 19 36 23 36 C 27 36 30.5 33.2 30.5 27.5 Z"
          fill="url(#cupGrad)"
          stroke="#ffd6b0"
          strokeWidth="0.75"
        />
        {/* Cup rim highlight */}
        <path
          d="M 15 27.5 H 31"
          stroke="#ffe7d1"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Cup handle */}
        <path
          d="M 30.5 29 C 33.2 29 34.5 30.8 34.5 32.2 C 34.5 33.8 32.8 34.8 30.3 34.5"
          stroke="#f8cca3"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Cup gloss sheen */}
        <path
          d="M 18 29.5 C 17.6 31.8 18.8 34 20.2 34.5"
          stroke="#fff0e0"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Saucer */}
        <ellipse cx="23" cy="37.8" rx="8.5" ry="1.6" fill="#e99e70" stroke="#fff1e0" strokeWidth="0.6" />

        {/* Pedestal Foot */}
        <path d="M 19.5 38.8 L 19 40.5 H 27 L 26.5 38.8 Z" fill="#8f391b" />
        <path d="M 17 41 H 29" stroke="#e99e70" strokeWidth="1" strokeLinecap="round" />

        {/* European Bistro Arch Flourish (Laurel Sprigs & Center Gem) */}
        <path
          d="M 11.5 42 C 12.5 44 15.2 45.8 18.2 46.2"
          stroke="#e9a274"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <circle cx="12.2" cy="42.2" r="0.7" fill="#ffe2ba" />
        <circle cx="14.5" cy="44.2" r="0.7" fill="#ffe2ba" />
        <circle cx="17" cy="45.8" r="0.7" fill="#ffe2ba" />

        <path
          d="M 34.5 42 C 33.5 44 30.8 45.8 27.8 46.2"
          stroke="#e9a274"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <circle cx="33.8" cy="42.2" r="0.7" fill="#ffe2ba" />
        <circle cx="31.5" cy="44.2" r="0.7" fill="#ffe2ba" />
        <circle cx="29" cy="45.8" r="0.7" fill="#ffe2ba" />

        {/* Center Golden Diamond Accent */}
        <path
          d="M 23 44.2 L 24.3 45.8 L 23 47.4 L 21.7 45.8 Z"
          fill="#ffdfb8"
        />
      </svg>
    </div>
  );
}

// Default curated menu is imported from DEFAULT_MENU_ITEMS and managed reactively in App()


const menuSectionDefinitions = [
  {
    category: 'Pizzas',
    icon: '🍕',
    title: 'Stone-Baked & Wood-Fired Pizzas',
    tagline: 'Hand-stretched crusts baked with Italian herbs, rich San Marzano tomato sugo and 100% molten mozzarella.',
    highlight: 'Stone-Baked Crusts'
  },
  {
    category: 'Mexican & Tacos',
    icon: '🌮',
    title: 'Mexican, Tacos & Savoury Bites',
    tagline: 'Fiesta soft tacos, loaded nachos grande, cheesy quesadillas, crispy burgers and seasoned loaded fries.',
    highlight: 'Savoury Bites'
  },
  {
    category: 'Pastas & Mains',
    icon: '🍝',
    title: 'Artisan Pastas & European Mains',
    tagline: 'Slow-simmered rich parmesan Alfredo cream, fiery Arrabbiata, fresh basil pesto and oven-baked lasagna.',
    highlight: 'Slow-Cooked Sauces'
  },
  {
    category: 'Coffee & Shakes',
    icon: '☕',
    title: 'Handcrafted Coffees, Gourmet Shakes & Coolers',
    tagline: 'Speciality double-shot Arabica roasts, dense Biscoff & Belgian chocolate shakes, and sparkling coolers.',
    highlight: '100% Arabica & Gelato'
  },
  {
    category: 'Helados Desserts',
    icon: '🍨',
    title: 'Signature Helados Gelato & Warm Waffles',
    tagline: 'Golden Belgian waffles with warm Nutella, small-batch gelato sundaes, and sizzling walnut brownie skillets.',
    highlight: 'Artisan Gelato'
  }
];

const photo = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const signatureTreats = [
  {
    id: 'latte',
    tag: 'HANDCRAFTED ARTISAN ROAST',
    name: 'French Vanilla Latte',
    subtitle: 'Silky double-shot Arabica espresso with velvety microfoam latte art, warm roasted beans & cinnamon',
    price: '₹169',
    numPrice: 169,
    image: '/treat-latte.jpg',
    pill: '100% Arabica',
    icon: '☕',
    treatIndex: 0,
    hasSteam: true
  },
  {
    id: 'waffle',
    tag: 'BAKED FRESH & CRISP',
    name: 'Ferrero Belgian Waffle',
    subtitle: 'Golden crisp waffle with melting butter cube, warm Nutella drizzle, toasted hazelnuts & fresh berries',
    price: '₹249',
    numPrice: 249,
    image: '/treat-waffle.jpg',
    pill: 'Warm & Crispy',
    icon: '🧇',
    treatIndex: 1,
    hasSteam: true
  },
  {
    id: 'sundae',
    tag: 'SIGNATURE ARTISAN GELATO',
    name: 'Artisan Helados Coupe',
    subtitle: 'Triple-scoop dark chocolate, vanilla bean & raspberry sorbet with hot fudge drizzle and fresh cherry',
    price: '₹229',
    numPrice: 229,
    image: '/treat-gelato.jpg',
    pill: 'Triple Artisan Scoop',
    icon: '🍨',
    treatIndex: 2,
    hasSteam: false
  }
];

function CinematicArtisanTreat({ reducedMotion, onOrderTreat }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef(null);
  const steamCanvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const targetTilt = useRef({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // Auto-cycle treats every 7.5s when not interacting
  useEffect(() => {
    if (isInteracting) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % signatureTreats.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [isInteracting]);

  // Smooth tilt lerp loop with gentle idle breathing
  useEffect(() => {
    let animId;
    let t = 0;
    const updateTilt = () => {
      t += 0.02;
      const idleTiltX = isDragging.current ? 0 : Math.sin(t * 0.7) * 1.8;
      const idleTiltY = isDragging.current ? 0 : Math.cos(t * 0.5) * 2.2;

      setTilt((prev) => ({
        x: prev.x + (targetTilt.current.x + idleTiltX - prev.x) * 0.1,
        y: prev.y + (targetTilt.current.y + idleTiltY - prev.y) * 0.1,
        glareX: prev.glareX + (targetTilt.current.glareX - prev.glareX) * 0.1,
        glareY: prev.glareY + (targetTilt.current.glareY - prev.glareY) * 0.1
      }));
      animId = requestAnimationFrame(updateTilt);
    };
    animId = requestAnimationFrame(updateTilt);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Realistic Fluid Steam & Glowing Golden Embers Simulation
  useEffect(() => {
    const canvas = steamCanvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 460);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const currentTreat = signatureTreats[activeIndex];
    const enableSteam = currentTreat.hasSteam;

    // Steam wisps
    const steamParticles = [];
    const maxSteam = enableSteam ? 28 : 0;

    // Glowing ambient embers
    const embers = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.25 - Math.random() * 0.45,
      size: 1 + Math.random() * 2.2,
      alpha: 0.2 + Math.random() * 0.65,
      pulse: Math.random() * Math.PI * 2
    }));

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Steam generation for hot coffee or waffle
      if (enableSteam && steamParticles.length < maxSteam && Math.random() < 0.65) {
        const originX = width * 0.5 + (Math.random() - 0.5) * (width * 0.22);
        const originY = height * 0.46 + (Math.random() - 0.5) * (height * 0.05);

        steamParticles.push({
          baseX: originX,
          x: originX,
          y: originY,
          vy: 28 + Math.random() * 24,
          radius: 10 + Math.random() * 8,
          maxRadius: 42 + Math.random() * 28,
          swayAmp: 16 + Math.random() * 22,
          swaySpeed: 1.2 + Math.random() * 1.6,
          swayOffset: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: 3.5 + Math.random() * 2.0,
          maxAlpha: 0.26 + Math.random() * 0.12
        });
      }

      // Draw & update steam
      for (let i = steamParticles.length - 1; i >= 0; i--) {
        const p = steamParticles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          steamParticles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        p.y -= p.vy * dt;
        p.x = p.baseX + Math.sin(now * 0.0018 * p.swaySpeed + p.swayOffset) * p.swayAmp * Math.sqrt(progress);

        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.7);
        const alpha = p.maxAlpha * Math.sin(progress * Math.PI);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0, `rgba(255, 246, 238, ${alpha.toFixed(3)})`);
        grad.addColorStop(0.4, `rgba(255, 238, 222, ${(alpha * 0.5).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(235, 215, 195, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw glowing golden cafe embers
      embers.forEach((emb) => {
        emb.y += emb.vy;
        emb.x += emb.vx + Math.sin(now * 0.001 + emb.pulse) * 0.25;
        emb.pulse += 0.025;

        if (emb.y < -10) {
          emb.y = height + 10;
          emb.x = Math.random() * width;
        }

        const emberAlpha = emb.alpha * (0.6 + Math.sin(emb.pulse) * 0.4);
        const grad = ctx.createRadialGradient(emb.x, emb.y, 0, emb.x, emb.y, emb.size * 2);
        grad.addColorStop(0, `rgba(255, 228, 185, ${emberAlpha.toFixed(2)})`);
        grad.addColorStop(1, 'rgba(232, 138, 89, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, reducedMotion]);

  // Pointer drag & tilt handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    setIsInteracting(true);
    setHasInteracted(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: targetTilt.current.x,
      rotY: targetTilt.current.y
    };
  };

  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    targetTilt.current.glareX = Math.round(nx * 100);
    targetTilt.current.glareY = Math.round(ny * 100);

    if (isDragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      targetTilt.current.y = Math.max(-25, Math.min(25, dragStart.current.rotY + dx * 0.16));
      targetTilt.current.x = Math.max(-18, Math.min(18, dragStart.current.rotX - dy * 0.12));
    } else {
      const tiltX = (ny - 0.5) * -16;
      const tiltY = (nx - 0.5) * 18;
      targetTilt.current.x = tiltX;
      targetTilt.current.y = tiltY;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsInteracting(false);
    targetTilt.current.x = 0;
    targetTilt.current.y = 0;
  };

  const current = signatureTreats[activeIndex];

  return (
    <div
      ref={containerRef}
      className="artisan-hero-portal-wrap"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div 
        className="artisan-hero-card artisan-realistic-card"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
        }}
      >
        {/* Dynamic Specular Light Glare Overlay */}
        <div 
          className="artisan-glare-overlay" 
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 238, 218, 0.32) 0%, rgba(255, 238, 218, 0.08) 35%, transparent 68%)`
          }}
          aria-hidden="true" 
        />

        {/* Ambient Arched Halo Rim */}
        <div className="artisan-arch-rim" aria-hidden="true" />

        {/* Realistic Culinary Visual Stage */}
        <div className="artisan-photo-stage">
          {signatureTreats.map((treat, idx) => (
            <div 
              key={treat.id}
              className={`artisan-photo-layer ${idx === activeIndex ? 'active' : ''}`}
              aria-hidden={idx !== activeIndex}
            >
              <img 
                src={treat.image} 
                alt={treat.name}
                className="artisan-hero-img"
                loading="eager"
              />
              <div className="artisan-photo-vignette" />
              <div className="artisan-photo-bottom-fade" />
            </div>
          ))}

          {/* Fluid Rising Steam & Glowing Embers Canvas */}
          <canvas ref={steamCanvasRef} className="realistic-steam-canvas" />

          {/* Floating Freshly Brewed Live Pill */}
          <div className="artisan-floating-steam-tag">
            <span className="steam-pulse-core" />
            <span>{current.hasSteam ? 'Freshly Pulled & Steaming' : 'Artisan Handcrafted'}</span>
          </div>
        </div>

        {/* Header Badges */}
        <div className="artisan-card-header">
          <div className="artisan-live-badge">
            <span className="live-sparkle-dot" />
            <span>ARTISAN SHOWCASE</span>
          </div>
          <div className="artisan-pill-badge">{current.pill}</div>
        </div>

        {/* 3D Interactive Interaction Tip */}
        <div className={`artisan-3d-hint ${hasInteracted ? 'faded' : ''}`}>
          <span>✦ Drag or Tilt to Explore in 3D</span>
        </div>

        {/* Bottom Treat Info & Switcher HUD */}
        <div className="artisan-card-content">
          <div className="artisan-treat-meta">
            <span className="artisan-treat-tag">{current.tag}</span>
            <div className="artisan-treat-title-row">
              <h3 className="artisan-treat-name">{current.name}</h3>
              <span className="artisan-treat-price">{current.price}</span>
            </div>
            <p className="artisan-treat-desc">{current.subtitle}</p>
          </div>

          {/* Quick-Pick Interactive Switcher Pills */}
          <div className="artisan-treat-switcher" role="tablist" aria-label="Select signature treat">
            {signatureTreats.map((treat, idx) => (
              <button
                key={treat.id}
                role="tab"
                aria-selected={idx === activeIndex}
                className={`artisan-tab-btn ${idx === activeIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                  setHasInteracted(true);
                }}
              >
                <span className="tab-icon">{treat.icon}</span>
                <span className="tab-label">{treat.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Quick Add CTA Button */}
          <button
            className="btn-order-3d-treat"
            onClick={(e) => {
              e.stopPropagation();
              onOrderTreat(current);
            }}
          >
            <span>Add {current.name.split(' ')[0]} to Bag</span>
            <span className="treat-price-chip">{current.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const REAL_GELATO_VARIANTS = {
  Caramel: {
    id: 'Caramel',
    moodNumber: '001',
    name: 'Caramel daydream',
    subtitle: 'Sea Salt Butterscotch Gelato',
    desc: 'Slow-churned velvet cream folded with warm Maldon sea salt butterscotch, crowned with roasted almond brittle and amber caramel ribbons.',
    price: 160,
    formattedPrice: '₹160',
    image: '/mood-caramel.jpg',
    tag: 'SLOW CHURNED · ARTISAN BATCH',
    badge: 'Maldon Sea Salt & Roasted Almonds',
    rating: '4.9 ★',
    scoopNote: '140+ scoops churned today',
    profile: { creaminess: '100%', richness: '92%', sweetness: 'Balanced' },
    notes: ['Warm Butterscotch', 'Flaky Maldon Salt', 'Roasted Almond Crunch', 'Farm Dairy Cream']
  },
  Berry: {
    id: 'Berry',
    moodNumber: '002',
    name: 'Berry daydream',
    subtitle: 'Wild Berry Blush Gelato',
    desc: 'Tart hand-picked blackberries and sweet Himalayan strawberries whipped with fresh mascarpone, finished with slow-simmered ruby coulis and garden mint.',
    price: 170,
    formattedPrice: '₹170',
    image: '/mood-berry.jpg',
    tag: 'FARM FRESH · WILD BERRIES',
    badge: 'Himalayan Berries & Garden Mint',
    rating: '4.9 ★',
    scoopNote: '115+ scoops churned today',
    profile: { creaminess: '95%', richness: '85%', sweetness: 'Fruity & Tart' },
    notes: ['Wild Blackberries', 'Ruby Strawberry Coulis', 'Fresh Mountain Mint', 'Sweet Mascarpone']
  },
  Chocolate: {
    id: 'Chocolate',
    moodNumber: '003',
    name: 'Chocolate daydream',
    subtitle: 'Midnight Cocoa Truffle Gelato',
    desc: 'Decadent 72% single-origin Belgian dark cocoa, warm ganache cascade, toasted hazelnut crumbles, and hand-shaved delicate dark chocolate ribbons.',
    price: 180,
    formattedPrice: '₹180',
    image: '/mood-chocolate.jpg',
    tag: '72% BELGIAN COCOA · SINGLE ORIGIN',
    badge: 'Warm Ganache & Hazelnut Praline',
    rating: '5.0 ★',
    scoopNote: '180+ scoops churned today',
    profile: { creaminess: '98%', richness: '99%', sweetness: 'Deep & Dark' },
    notes: ['72% Belgian Cocoa', 'Silky Ganache Drizzle', 'Toasted Hazelnut', 'Shaved Dark Curls']
  }
};

function RealisticArtisanGelato({ selectedMaterial, setSelectedMaterial, autoRotate, setAutoRotate, onAddToCart }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const cardRef = useRef(null);

  const current = REAL_GELATO_VARIANTS[selectedMaterial] || REAL_GELATO_VARIANTS.Caramel;
  const flavorKeys = ['Caramel', 'Berry', 'Chocolate'];

  // Auto-rotate every 4.8s if enabled and not currently hovered
  useEffect(() => {
    if (!autoRotate || isHovered) return;
    const interval = setInterval(() => {
      setSelectedMaterial(prev => {
        const nextIdx = (flavorKeys.indexOf(prev) + 1) % flavorKeys.length;
        return flavorKeys[nextIdx];
      });
    }, 4800);
    return () => clearInterval(interval);
  }, [autoRotate, isHovered, setSelectedMaterial]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt calculation (-9deg to +9deg)
    const tiltX = ((y - centerY) / centerY) * -9;
    const tiltY = ((x - centerX) / centerX) * 9;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: glareX, y: glareY, opacity: 0.55 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  const handleAddScoop = () => {
    onAddToCart({
      id: `gelato-mood-${current.id.toLowerCase()}`,
      name: `${current.subtitle}`,
      price: current.price,
      image: current.image,
      category: 'Artisan Gelato'
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="realistic-gelato-container reveal">
      <div 
        ref={cardRef}
        className="realistic-gelato-stage"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Specular glare overlay for realistic lighting reflections */}
        <div 
          className="gelato-specular-glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 65%)`
          }}
        />

        {/* Ambient warmth aura */}
        <div className={`gelato-ambient-aura ${current.id.toLowerCase()}`} />

        {/* Gelato Visual Column */}
        <div className="gelato-visual-col">
          <div className="gelato-scoop-wrapper">
            <div className="gelato-shadow-pedestal" />
            <img 
              key={current.image}
              src={current.image} 
              alt={`${current.name} artisan real gelato scoop`} 
              className="gelato-real-img"
              loading="eager"
            />
            {/* Real scoop badge overlay */}
            <div className="gelato-fresh-pill">
              <span className="live-sparkle-dot" />
              <span>100% PURE ARTISAN DAIRY</span>
            </div>
            <div className="gelato-rating-pill">
              <span>{current.rating}</span>
              <small>({current.scoopNote})</small>
            </div>
          </div>
        </div>

        {/* Gelato Story & Interactivity Column */}
        <div className="gelato-story-col">
          <div className="gelato-story-header">
            <div className="gelato-mood-meta">
              <span className="gelato-badge-gold">THE MOOD BOARD / {current.moodNumber}</span>
              <span className="gelato-tagline-pill">{current.tag}</span>
            </div>
            <h3 className="gelato-headline">{current.name}</h3>
            <h4 className="gelato-subhead">{current.subtitle}</h4>
            <p className="gelato-editorial-desc">{current.desc}</p>
          </div>

          {/* Flavor Profile Metrics */}
          <div className="gelato-profile-strip">
            <div className="profile-metric">
              <span className="metric-label">CREAMINESS</span>
              <span className="metric-val">{current.profile.creaminess}</span>
            </div>
            <div className="profile-metric">
              <span className="metric-label">INTENSITY</span>
              <span className="metric-val">{current.profile.richness}</span>
            </div>
            <div className="profile-metric">
              <span className="metric-label">TASTE NOTE</span>
              <span className="metric-val">{current.profile.sweetness}</span>
            </div>
          </div>

          {/* Tasting Note Chips */}
          <div className="gelato-tasting-notes">
            {current.notes.map((note) => (
              <span key={note} className="tasting-chip">
                <i>✳</i> {note}
              </span>
            ))}
          </div>

          {/* Flavor Selector Switcher */}
          <div className="gelato-actions-row">
            <div className="gelato-flavor-selector" role="tablist" aria-label="Select gelato mood">
              {flavorKeys.map((flavorKey) => (
                <button
                  key={flavorKey}
                  type="button"
                  role="tab"
                  aria-selected={selectedMaterial === flavorKey}
                  className={`gelato-flavor-btn ${selectedMaterial === flavorKey ? 'active' : ''}`}
                  onClick={() => setSelectedMaterial(flavorKey)}
                >
                  <span className={`flavor-indicator ${flavorKey.toLowerCase()}`} />
                  <span>{flavorKey}</span>
                </button>
              ))}
            </div>

            {/* Auto-motion toggle */}
            <button 
              type="button"
              className="gelato-auto-toggle-btn" 
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? "Pause automatic flavor slideshow" : "Turn on automatic flavor slideshow"}
            >
              <span className={`toggle-track ${autoRotate ? 'on' : ''}`}>
                <span className="toggle-thumb" />
              </span>
              <span>{autoRotate ? 'Auto-motion on' : 'Auto-motion off'}</span>
            </button>
          </div>

          {/* Order Scoop Direct Action */}
          <div className="gelato-order-action">
            <button 
              type="button"
              className={`btn-add-scoop ${addedNotice ? 'added' : ''}`}
              onClick={handleAddScoop}
            >
              <IceCreamBowl size={16} />
              <span>{addedNotice ? 'Added to Bag! ✓' : `Add ${current.name} to Bag`}</span>
              <span className="scoop-price-badge">{current.formattedPrice}</span>
            </button>
            <span className="gelato-order-hint">Freshly scooped on order · Dine-in & Takeaway</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionsMapBox({ address, onCopyAddress }) {
  const [activeStep, setActiveStep] = useState(0);
  const [travelMode, setTravelMode] = useState('drive');
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = 'https://maps.app.goo.gl/Z12Ydz5MpKPRvuaq5';
  const directNavigationUrl = 'https://www.google.com/maps/dir/?api=1&destination=30.3451682,76.3797209';

  const steps = [
    {
      step: '01',
      title: '22 No. Phatak & Bhupindra Road',
      instruction: 'Start at the 22 No. Phatak intersection and head north onto the main Bhupindra Road stretch.',
      landmark: 'Near Rapid Laboratory & Redtape Outlet',
      timeCar: '1 min',
      timeWalk: '4 mins'
    },
    {
      step: '02',
      title: 'Turn at Columbia Asia (Manipal Hospital)',
      instruction: 'Take the right turn just behind Manipal Hospital complex into the Charan Bagh lane.',
      landmark: 'Behind Manipal / Columbia Asia Hospital',
      timeCar: '2 mins',
      timeWalk: '7 mins'
    },
    {
      step: '03',
      title: 'Backside DAV School Lane',
      instruction: 'Continue along the quiet paved lane directly opposite the Punjabi Bagh residential lane.',
      landmark: 'Back side of DAV School lane',
      timeCar: '3 mins',
      timeWalk: '10 mins'
    },
    {
      step: '04',
      title: 'Arrive at Cafe Helados 🎉',
      instruction: 'Cafe Helados will be on your right with warm ambient lighting & dedicated parking outside.',
      landmark: 'Opp. Punjabi Bagh Lane, Charan Bagh',
      timeCar: '4 mins',
      timeWalk: '12 mins'
    }
  ];

  const handleCopy = () => {
    onCopyAddress();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="directions-box-container reveal">
      {/* Header bar */}
      <div className="dir-box-header">
        <div className="dir-box-title">
          <div className="live-radar-dot">
            <span className="dot-pulse" />
            <span className="dot-core" />
          </div>
          <div>
            <span className="dir-tag">GOOGLE MAPS DIRECTIONS · PATIALA</span>
            <h3>How to Reach <em>Cafe Helados</em></h3>
          </div>
        </div>

        <div className="travel-mode-tabs">
          <button 
            type="button" 
            className={`mode-tab ${travelMode === 'drive' ? 'active' : ''}`}
            onClick={() => setTravelMode('drive')}
            aria-label="Driving route: 4 minutes"
          >
            <Car size={13} />
            <span>4 min drive</span>
          </button>
          <button 
            type="button" 
            className={`mode-tab ${travelMode === 'walk' ? 'active' : ''}`}
            onClick={() => setTravelMode('walk')}
            aria-label="Walking route: 12 minutes"
          >
            <Clock3 size={13} />
            <span>12 min walk</span>
          </button>
        </div>
      </div>

      {/* Main Box Grid */}
      <div className="dir-box-body">
        {/* Animated Map Canvas */}
        <div className="dir-map-stage">
          <div className="dir-map-viewport">
            <img 
              src="/cafe-helados-map.png" 
              alt="Google Map route to Cafe Helados near Bhupindra Road and Manipal Hospital Patiala"
              className="dir-map-img" 
            />
            
            {/* SVG Animated Route & Radar Overlays */}
            <svg 
              className="dir-route-svg" 
              viewBox="0 0 900 900" 
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#e88a59" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#ffb590" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Route Foundation */}
              <path 
                d="M 750 880 L 685 630 Q 675 550 695 485" 
                fill="none" 
                stroke="#c75b3d" 
                strokeWidth="16" 
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
                filter="url(#routeGlow)"
              />

              {/* Animated Dashed Route Line */}
              <path 
                d="M 750 880 L 685 630 Q 675 550 695 485" 
                fill="none" 
                stroke="url(#routeGradient)" 
                strokeWidth="7" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="18 12"
                className="animated-flow-path"
              />

              {/* Waypoint 1: 22 No. Phatak Start Marker */}
              <circle cx="750" cy="880" r="14" fill="#2d1a12" stroke="#e88a59" strokeWidth="4" />
              <circle cx="750" cy="880" r="6" fill="#fff" />

              {/* Waypoint 2: Turn behind Manipal Hospital */}
              <circle cx="685" cy="630" r="11" fill="#2d1a12" stroke="#e88a59" strokeWidth="3" />
              <circle cx="685" cy="630" r="4.5" fill="#f7ca9f" />

              {/* Animated Radar Pulse Rings on Cafe Helados (x: 695, y: 485) */}
              <circle cx="695" cy="485" r="32" className="radar-circle radar-c1" />
              <circle cx="695" cy="485" r="64" className="radar-circle radar-c2" />
              <circle cx="695" cy="485" r="96" className="radar-circle radar-c3" />

              {/* Destination Beacon Pin */}
              <circle cx="695" cy="485" r="20" fill="#c75b3d" stroke="#ffffff" strokeWidth="4" className="pin-pulse-core" />
              <circle cx="695" cy="485" r="8" fill="#ffffff" />
            </svg>

            {/* Live Floating Destination Chip */}
            <div className="dir-map-badge destination-badge">
              <span className="badge-pulse-indicator" />
              <div>
                <strong>Cafe Helados</strong>
                <small>⭐ 4.2 · Open daily till 10:55 PM</small>
              </div>
            </div>

            {/* Start point chip */}
            <div className="dir-map-badge start-badge">
              <span>📍 Start: 22 No. Phatak Rd</span>
            </div>

            {/* Open full map link chip */}
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="dir-map-launch-chip"
              title="Open location on Google Maps"
            >
              <span>View on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Turn-by-Turn Directions Stepper */}
        <div className="dir-stepper-pane">
          <div className="stepper-header">
            <span className="stepper-tag">TURN-BY-TURN LANDMARKS</span>
            <h4>Step-by-step route to our door</h4>
          </div>

          <div className="stepper-list">
            {steps.map((item, idx) => (
              <div 
                key={item.step} 
                className={`stepper-card ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
              >
                <div className="stepper-num-col">
                  <span className="stepper-num">{item.step}</span>
                  {idx < steps.length - 1 && <span className="stepper-line" />}
                </div>
                <div className="stepper-info">
                  <div className="stepper-title-row">
                    <h5>{item.title}</h5>
                    <span className="stepper-duration">
                      {travelMode === 'drive' ? item.timeCar : item.timeWalk}
                    </span>
                  </div>
                  <p>{item.instruction}</p>
                  <div className="stepper-landmark">
                    <MapPin size={11} />
                    <span>{item.landmark}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons in Box */}
          <div className="dir-actions-row">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-dir-cta"
            >
              <Navigation size={15} />
              <span>Get Directions on Google Maps</span>
              <ArrowUpRight size={15} />
            </a>

            <button 
              type="button" 
              className="btn-dir-copy" 
              onClick={handleCopy}
              title="Copy address to clipboard"
            >
              {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
              <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer of the Box */}
      <div className="dir-box-footer">
        <div className="footer-addr-snippet">
          <MapPin size={13} />
          <span>{address}</span>
        </div>
        <div className="footer-links">
          <a href={directNavigationUrl} target="_blank" rel="noreferrer">
            <Car size={13} /> Live GPS Navigation
          </a>
          <span>·</span>
          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps App <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState(() => window.location.hash === '#admin' ? 'admin' : 'store');
  const [menuItems, setMenuItems] = useState(getStoredMenu());
  const [settings, setSettings] = useState(getStoredSettings());

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Pizzas');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('Caramel');
  const [autoRotate, setAutoRotate] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '06:30 PM — Golden Hour Catch-up',
    guests: '1 - 2 Guests (Cozy Table)',
    seating: 'Cozy Arched Corner'
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else if (view === 'admin') {
        setView('store');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [view]);

  useEffect(() => {
    const handleMenuSync = (e) => setMenuItems(e.detail);
    const handleSettingsSync = (e) => setSettings(e.detail);
    window.addEventListener('cafe_helados_menu_updated', handleMenuSync);
    window.addEventListener('cafe_helados_settings_updated', handleSettingsSync);
    return () => {
      window.removeEventListener('cafe_helados_menu_updated', handleMenuSync);
      window.removeEventListener('cafe_helados_settings_updated', handleSettingsSync);
    };
  }, []);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(pref);
    const onScroll = () => setScrollProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight-window.innerHeight));
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => {window.removeEventListener('scroll',onScroll);};
  }, []);
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (reducedMotion) { els.forEach(el=>el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);} }), {threshold:.12});
    els.forEach(el=>io.observe(el)); return ()=>io.disconnect();
  }, [reducedMotion]);

  const categoryTabs = [
    { id: 'Pizzas', label: 'Pizzas', icon: '🍕' },
    { id: 'Mexican & Tacos', label: 'Mexican & Bites', icon: '🌮' },
    { id: 'Pastas & Mains', label: 'Pastas & Mains', icon: '🍝' },
    { id: 'Coffee & Shakes', label: 'Coffee & Shakes', icon: '☕' },
    { id: 'Helados Desserts', label: 'Helados Desserts', icon: '🍨' },
    { id: 'All', label: 'All Items', icon: '✨' },
  ];
  const sectionKeys = ['Pizzas', 'Mexican & Tacos', 'Pastas & Mains', 'Coffee & Shakes', 'Helados Desserts'];
  const currentSectionIdx = sectionKeys.indexOf(activeCategory);
  const prevSectionKey = currentSectionIdx > 0 ? sectionKeys[currentSectionIdx - 1] : sectionKeys[sectionKeys.length - 1];
  const nextSectionKey = currentSectionIdx >= 0 && currentSectionIdx < sectionKeys.length - 1 ? sectionKeys[currentSectionIdx + 1] : sectionKeys[0];

  const filteredItems = menuItems.filter(i => activeCategory === 'All' || i.category === activeCategory);
  const visibleSections = activeCategory === 'All'
    ? menuSectionDefinitions
    : menuSectionDefinitions.filter(s => s.category === activeCategory);
  const cartCount = cart.reduce((n,item)=>n+item.qty,0);
  const cartTotal = cart.reduce((n,item)=>n+item.price*item.qty,0);
  const addToCart = item => {
    if (item.inStock === false) {
      setNotice(`${item.name} is currently sold out`);
      setTimeout(() => setNotice(''), 2200);
      return;
    }
    setCart(prev => {const found=prev.find(x=>x.id===item.id);return found?prev.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...prev,{...item,qty:1}];});
    setNotice(`${item.name} added to your bag`);
    setTimeout(()=>setNotice(''),2200);
  };
  const changeQty = (id,delta) => setCart(prev=>prev.map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0));
  const testimonials = [
    {quote:'The arched interiors, soft lighting and calm vibe make it such a cozy place to catch up.',name:'A guest in Patiala',meta:'A little escape from the everyday'},
    {quote:'A menu full of little treats — from coffee and shakes to waffles worth sharing.',name:'Cafe Helados regular',meta:'Good things, best enjoyed slowly'},
    {quote:'Come for a quick coffee. Stay because the conversation is too good to end.',name:'Your next favourite table',meta:'Made for moments together'},
  ];
  const orderMessage = encodeURIComponent(`Hi Cafe Helados! I'd like to enquire about an order. Items: ${cart.map(x=>`${x.name} x${x.qty}`).join(', ')}. Estimated total: ₹${cartTotal}. Please confirm availability.`);
  const address = 'Opp Punjabi Bagh lane, behind Columbia Asia Hospital, back side DAV School, 22 No, Phatak Rd, Charan Bagh, Patiala, Punjab 147004';
  const mapUrl = 'https://maps.app.goo.gl/Z12Ydz5MpKPRvuaq5';

  if (view === 'admin') {
    return (
      <AdminPanel
        onExitToStore={() => {
          window.location.hash = '#home';
          setView('store');
        }}
      />
    );
  }

  return <div className="site-shell">
    <div className="scroll-progress" style={{transform:`scaleX(${scrollProgress})`}} />
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Cafe Helados home">
        <CafeLogoMark size={42} />
        <span className="brand-text">
          <small className="brand-sup">CAFÉ</small>
          <span className="brand-name">HELADOS</span>
          <small className="brand-sub">PATIALA · EST. 2026</small>
        </span>
      </a>
      <nav className={menuOpen?'nav-links open':'nav-links'}>
        <a href="#story" onClick={()=>setMenuOpen(false)}>Our Story</a>
        <a href="#menu" onClick={()=>setMenuOpen(false)}>The Menu</a>
        <a href="#experience" onClick={()=>setMenuOpen(false)}>The Feeling</a>
        <a href="#ritual" onClick={()=>setMenuOpen(false)}>Mood Ritual</a>
        <a href="#reviews" onClick={()=>setMenuOpen(false)}>Reviews</a>
        <a href="#visit" onClick={()=>setMenuOpen(false)}>Find Us</a>
        <div className="mobile-nav-actions">
          <button className="btn btn-order-online mobile-nav-btn" onClick={()=>{setOrderModalOpen(true);setMenuOpen(false);}}>
            <Sparkles size={14} /> Order Online
          </button>
          <button className="btn btn-book-table mobile-nav-btn" onClick={()=>{setBookingOpen(true);setMenuOpen(false);}}>
            <Calendar size={14} /> Book a Table
          </button>
          <a className="mobile-nav-call" href="tel:+919876543210">
            <Phone size={14} /> Call: +91 98765 43210
          </a>
        </div>
      </nav>
      <div className="header-actions">
        <a className="header-call-btn" href="tel:+919876543210" title="Call Cafe Helados">
          <Phone size={13} />
          <span>Call</span>
        </a>
        <button className="btn-book-table" onClick={()=>setBookingOpen(true)}>
          <Calendar size={13} />
          <span>Book Table</span>
        </button>
        <button className="btn-order-online" onClick={()=>setOrderModalOpen(true)}>
          <Sparkles size={14} />
          <span>Order Online</span>
        </button>
        <button className="bag-button" onClick={()=>setCartOpen(true)} aria-label="Open order bag">
          <ShoppingBag size={17} />
          <span>Bag</span>
          {cartCount>0&&<b>{cartCount}</b>}
        </button>
        <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Close menu':'Open menu'}>
          {menuOpen?<X/>:<MenuIcon/>}
        </button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/><Sparkles size={14}/> A LITTLE MORE DELICIOUS</div>
          <h1>Good days<br/>start with <em>something</em><br/><span>sweet.</span></h1>
          <p className="hero-sub">Coffee in your hand. A favourite person across the table. One more bite before you go.</p>
          <div className="hero-ctas"><a className="btn btn-primary" href="#menu">Explore the menu <ArrowUpRight size={17}/></a><a className="text-link" href="#story">Get to know us <ArrowDownRight size={17}/></a></div>
          <div className="hero-rating"><div className="rating-stars">{[1,2,3,4,5].map(n=><Star key={n} size={13} fill="currentColor"/>)}</div><strong>4.2/5</strong><span>from 339 Google reviews</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-art-orbit orbit-one"/><div className="hero-art-orbit orbit-two"/>
          <div className="hero-art-label label-top"><span>01 / THE SIGNATURE</span><b>Sweet little<br/>moments</b></div>
          <CinematicArtisanTreat 
            reducedMotion={reducedMotion} 
            onOrderTreat={(treat)=>{
              const itemMatch = menuItems.find(m => m.name.toLowerCase().includes(treat.name.toLowerCase().split(' ')[0])) || { id: 99, name: treat.name, price: treat.numPrice, image: treat.image };
              addToCart(itemMatch);
              setCartOpen(true);
            }}
          />
          <div className="hero-art-label label-bottom"><span>MADE FRESH, SERVED WITH LOVE</span><b>Stay for<br/><i>one more.</i></b></div>
          <div className="hero-stamp"><span>MADE FOR</span><strong>YOUR<br/>HAPPY<br/>PLACE</strong><span>✳ PATIALA ✳</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO TASTE THE MOMENT</span><a href="#story" aria-label="Scroll to our story"><ArrowDown size={16}/></a><span>30°20' N · PATIALA, INDIA</span></div>
      </section>

      <section className="ticker" aria-label="Cafe highlights"><div className="ticker-track">{Array.from({length:2}).map((_,i)=><span key={i}>SLOW SIPS <b>✳</b> SWEET TREATS <b>✳</b> GOOD COMPANY <b>✳</b> LITTLE MOMENTS <b>✳</b> BIG CRAVINGS <b>✳</b> </span>)}</div></section>

      <section className="story section-pad" id="story">
        <div className="story-side reveal"><span className="section-index">01 — THE HELADOS FEELING</span><h2>A table for<br/>every <em>kind</em><br/>of day.</h2><div className="story-note"><span className="handwritten">Come as you are.</span><ArrowDownRight size={25}/></div></div>
        <div className="story-content reveal"><div className="story-photo photo-main"><img src="/cafe-helados-real.jpg" alt="Inside Cafe Helados Patiala with warm lighting, arched booths, and artisan counter" loading="lazy"/><span className="photo-caption">✦ REAL AMBIENCE · CAFE HELADOS PATIALA</span></div><div className="story-lower"><div className="story-photo photo-small"><img src={photo('photo-1495474472287-4d71bcdd2085',650)} alt="Freshly brewed coffee on a table" loading="lazy"/></div><div className="story-copy"><p className="eyebrow dark">A GOOD PLACE TO PAUSE</p><p>Some places are for a quick coffee. Some become the backdrop to your favourite stories. At Cafe Helados, we make room for both.</p><p>From the first sip to the last spoonful, it's all about finding a little something that makes your day feel better.</p><a className="text-link dark-link" href="#visit">Come say hello <ArrowUpRight size={16}/></a></div></div></div>
        <div className="story-deco">made<br/><i>with</i><br/>feeling<span>✳</span></div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="section-heading reveal">
          <div>
            <span className="section-index">02 — SOMETHING FOR THE MOOD</span>
            <h2>Meet your <em>new</em><br/>usual.</h2>
          </div>
          <p>Savoury wood-fired pizzas, hearty pastas, loaded bites, handcrafted coffees, chilled coolers and rich gelato desserts. Find what you came for — and stay for what comes next.</p>
        </div>

        <div className="menu-controls reveal">
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            {categoryTabs.map(cat => (
              <button 
                key={cat.id} 
                className={activeCategory === cat.id ? 'active' : ''} 
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="tab-icon">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="tab-count">
                  {cat.id === 'All' ? menuItems.length : menuItems.filter(m => m.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
          <div className="menu-count-badge">
            <span className="count-dot" />
            <span>
              {activeCategory === 'All' 
                ? `${menuItems.length} ITEMS · ARRANGED BY DISH NAME (A–Z)` 
                : `${menuItems.filter(m => m.category === activeCategory).length} ITEMS · ARRANGED BY DISH NAME (A–Z)`}
            </span>
            <span className="sparkle-symbol">✳</span>
          </div>
        </div>

        {/* Unified Tabbed Section Stage: Single container arranged with sections */}
        <div className="unified-menu-stage reveal">
          <div className="menu-sections-wrapper">
            {visibleSections.map(section => {
              const sectionItems = menuItems
                .filter(i => i.category === section.category)
                .sort((a, b) => a.name.localeCompare(b.name));
              return (
                <div 
                  className="menu-category-section" 
                  key={section.category}
                  id={`sec-${section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className="menu-section-header">
                    <div className="menu-section-header-left">
                      <div className="menu-section-pill">
                        <span className="section-pill-icon">{section.icon}</span>
                        <span className="section-pill-cat">{section.category.toUpperCase()}</span>
                        <span className="section-pill-divider">·</span>
                        <span className="section-pill-count">{sectionItems.length} ITEMS (A–Z)</span>
                      </div>
                      <h3 className="menu-section-title">{section.title}</h3>
                      <p className="menu-section-tagline">{section.tagline}</p>
                    </div>
                    <div className="menu-section-header-right">
                      <span className="section-highlight-badge">{section.highlight}</span>
                    </div>
                  </div>

                  <div className="menu-grid">
                    {sectionItems.map((item, i) => (
                      <article className={`menu-item delay-${i % 4} ${item.inStock === false ? 'item-sold-out' : ''}`} key={item.id}>
                        <div className="menu-image">
                          <img 
                            src={photo(item.image, 750)} 
                            alt={item.name} 
                            loading="lazy" 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=750&q=85';
                            }}
                          />
                          <div className="menu-badges-left">
                            <span className="menu-category">{item.category}</span>
                            <span className={`menu-type-pill type-${item.itemType}`}>
                              {item.itemType === 'beverage' ? 'Beverage' : item.itemType === 'dessert' ? 'Dessert' : 'Dish'}
                            </span>
                          </div>
                          {item.tag && <span className="menu-item-tag">{item.tag}</span>}
                          {item.inStock !== false && (
                            <button 
                              className="quick-add" 
                              onClick={() => addToCart(item)} 
                              aria-label={`Add ${item.name} to bag`}
                              title={`Add ${item.name} to bag`}
                            >
                              <Plus size={19} />
                            </button>
                          )}
                        </div>
                        <div className="menu-item-info">
                          <div className="menu-item-text">
                            <h3>{item.name}</h3>
                            <p>{item.note}</p>
                          </div>
                          <div className="menu-item-pricing">
                            <strong>₹{item.price}</strong>
                            {item.inStock !== false ? (
                              <button 
                                className="add-to-bag-chip" 
                                onClick={() => addToCart(item)}
                                title={`Add ${item.name} to order`}
                              >
                                <Plus size={12} /> Add
                              </button>
                            ) : (
                              <span className="sold-out-chip">Sold Out</span>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* In-Place Section Switcher Bar */}
          {activeCategory !== 'All' && (
            <div className="unified-nav-row">
              <button 
                type="button" 
                className="unified-nav-btn prev-btn"
                onClick={() => setActiveCategory(prevSectionKey)}
                title={`Switch to ${prevSectionKey}`}
              >
                <ArrowLeft size={14} />
                <span>Previous: {prevSectionKey.split('&')[0].trim()}</span>
              </button>

              <div className="unified-section-dots" aria-label="Quick section selector">
                {sectionKeys.map((sec, idx) => (
                  <button 
                    key={sec}
                    type="button"
                    className={`unified-dot-pill ${activeCategory === sec ? 'active' : ''}`}
                    onClick={() => setActiveCategory(sec)}
                    title={sec}
                  >
                    <span>{menuSectionDefinitions[idx]?.icon}</span>
                    <span className="dot-name">{sec.split('&')[0].trim()}</span>
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                className="unified-nav-btn next-btn"
                onClick={() => setActiveCategory(nextSectionKey)}
                title={`Switch to ${nextSectionKey}`}
              >
                <span>Next: {nextSectionKey.split('&')[0].trim()}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="menu-bottom">
          <div className="menu-bottom-summary">
            <span className="menu-status-pill">
              <Sparkles size={13} />
              ALL {menuItems.length} ITEMS AVAILABLE AT CAFE HELADOS
            </span>
            <p className="menu-bottom-meta">
              {menuItems.filter(i=>i.itemType==='dish').length} Savoury Dishes · {menuItems.filter(i=>i.itemType==='beverage').length} Handcrafted Beverages · {menuItems.filter(i=>i.itemType==='dessert').length} Artisan Desserts · Dine-in & Takeaway
            </p>
          </div>
          <div className="menu-bottom-cta-group">
            <button className="btn btn-menu-order-now" onClick={()=>setOrderModalOpen(true)}>
              <Sparkles size={14} /> Order Online Now
            </button>
            <button className="btn btn-menu-book-table" onClick={()=>setBookingOpen(true)}>
              <Calendar size={14} /> Book a Table
            </button>
          </div>
        </div>
        <p className="menu-disclaimer">Sourced directly from Cafe Helados Patiala on Google Maps & counter menu. Prices and daily availability subject to cafe confirmation.</p>
      </section>

      <section className="experience" id="experience">
        <div className="experience-photo"><img src={photo('photo-1555396273-367ea4eb4db5',1000)} alt="Warm cafe ambience and dining table" onError={e=>{e.currentTarget.src=photo('photo-1563805042-7684c019e1cb',1000)}} loading="lazy"/></div>
        <div className="experience-content reveal"><span className="section-index">03 — TAKE YOUR TIME</span><h2>Not just a<br/>coffee break.<br/><em>A whole mood.</em></h2><p>Soft lights, slow conversations, one last bite. Come in between plans, make a plan here, or let the afternoon take its time.</p><div className="experience-points"><div><span>✳</span><b>Settle in</b><small>Cozy corners, unhurried moments</small></div><div><span>✳</span><b>Find your favourite</b><small>Something sweet or something savoury</small></div><div><span>✳</span><b>Stay a little longer</b><small>Good company is always on the menu</small></div></div><a className="btn btn-light" href="#visit">Plan a little visit <ArrowUpRight size={17}/></a></div>
        <div className="experience-vertical">A LITTLE JOY, EVERY DAY</div>
      </section>

      <section className="ritual section-pad" id="ritual">
        <div className="ritual-head reveal">
          <span className="section-index">04 — YOUR LITTLE RITUAL</span>
          <h2>Pick a mood.<br/><em>We'll bring the magic.</em></h2>
          <p>Hand-crafted artisan gelato, churned fresh daily in Patiala with pure dairy and slow-simmered sauces. Touch, tilt, and explore each flavor.</p>
        </div>
        <RealisticArtisanGelato
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          onAddToCart={addToCart}
        />
      </section>

      <section className="numbers section-pad">
        <div className="numbers-heading reveal"><span className="section-index">05 — THE LITTLE THINGS ADD UP</span><h2>Good things.<br/><em>Shared often.</em></h2></div>
        <div className="numbers-grid"><div className="number-cell reveal"><span className="number-symbol">✳</span><strong>4.2<span>/5</span></strong><p>Google guest rating</p><small>Based on 339 reviews at the time of listing</small></div><div className="number-cell reveal delay-1"><span className="number-symbol">♡</span><strong>∞</strong><p>Reasons to get together</p><small>Catch-ups, celebrations, and just-because days</small></div><div className="number-cell reveal delay-2"><span className="number-symbol">☼</span><strong>1</strong><p>Happy place in Patiala</p><small>Your next coffee date is waiting</small></div></div>
      </section>

      <section className="timeline-section section-pad">
        <div className="timeline-intro reveal"><span className="section-index">06 — THE PERFECT LITTLE PLAN</span><h2>Make an<br/><em>afternoon of it.</em></h2><p>There is no wrong way to spend a little time at Cafe Helados. Here's one way to make it yours.</p></div>
        <div className="timeline">
          {[{time:'01',title:'Arrive & exhale',desc:'Find a seat, leave the rush outside, and get comfortable.',icon:'☼'},{time:'02',title:'Choose your treat',desc:'A coffee, a shake, a waffle — follow the craving.',icon:'✳'},{time:'03',title:'Stay for the story',desc:'Order one more thing. Finish that conversation.',icon:'♡'}].map((step,i)=><button key={step.time} onClick={()=>setActiveTimeline(i)} className={`timeline-step reveal ${activeTimeline===i?'current':''}`}><span className="timeline-marker">{step.icon}</span><span className="timeline-time">THE {step.time} MOMENT</span><h3>{step.title}</h3><p>{step.desc}</p><span className="timeline-arrow"><ArrowUpRight size={18}/></span></button>)}
        </div>
      </section>

      <section className="testimonial-section section-pad" id="reviews">
        <div className="testimonial-top reveal"><span className="section-index">07 — KIND WORDS, GOOD COMPANY</span><span className="quote-mark">“</span></div>
        <div className="testimonial-main reveal"><p className="testimonial-quote">“{testimonials[activeTestimonial].quote}”</p><div className="testimonial-by"><span className="testimonial-avatar">{['H','C','Y'][activeTestimonial]}</span><div><strong>{testimonials[activeTestimonial].name}</strong><small>{testimonials[activeTestimonial].meta}</small></div></div><div className="testimonial-controls"><span>0{activeTestimonial+1} <i>/ 03</i></span><button onClick={()=>setActiveTestimonial((activeTestimonial+2)%3)} aria-label="Previous testimonial"><ArrowRight className="arrow-back" size={18}/></button><button onClick={()=>setActiveTestimonial((activeTestimonial+1)%3)} aria-label="Next testimonial"><ArrowRight size={18}/></button></div></div>
        <div className="testimonial-side-image"><img src={photo('photo-1511920170033-f8396924c348',800)} alt="Coffee prepared with care" loading="lazy"/><span>GOOD COMPANY<br/>LOOKS GOOD ON YOU.</span></div>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-deco"><div className="visit-ring ring-a"/><div className="visit-ring ring-b"/><div className="visit-ring ring-c"/><div className="visit-spark">✳</div></div>
        
        {/* Top Split: Section Title, Quick Info & Real Photo of Cafe Helados */}
        <div className="visit-top-grid">
          <div className="visit-content reveal">
            <span className="section-index">08 — YOUR TABLE IS WAITING</span>
            <h2>See you<br/><em>in a little bit?</em></h2>
            <p>Bring your people. Bring your appetite. We'll be the place with the good stuff — soft arched corners, artisan coffee, and sweet indulgences right here in Charan Bagh.</p>
            
            <div className="visit-quick-specs">
              <div className="visit-spec-item">
                <MapPin size={18} className="spec-icon" />
                <div>
                  <strong>Charan Bagh, Patiala</strong>
                  <p>Behind Columbia Asia (Manipal Hospital), Opp. Punjabi Bagh Lane</p>
                </div>
              </div>
              <div className="visit-spec-item">
                <Clock3 size={18} className="spec-icon" />
                <div>
                  <strong>Open Daily until 10:55 PM</strong>
                  <p>Dine-in · Takeaway · Online Delivery across Patiala</p>
                </div>
              </div>
            </div>

            <div className="visit-actions">
              <a className="btn btn-primary" href={mapUrl} target="_blank" rel="noreferrer">
                <Navigation size={15} /> Open in Google Maps <ArrowUpRight size={16}/>
              </a>
              <button className="btn btn-ghost" onClick={()=>{navigator.clipboard?.writeText(address);setNotice('Cafe address copied to clipboard');setTimeout(()=>setNotice(''),2200)}}>
                <Copy size={15}/> Copy address
              </button>
              <button className="btn btn-book-outline" onClick={()=>setBookingOpen(true)}>
                <Calendar size={15}/> Reserve Table
              </button>
            </div>
          </div>

          <div className="visit-photo-card reveal">
            <div className="visit-photo-frame">
              <img 
                src="/cafe-helados-real.jpg" 
                alt="Inside Cafe Helados Patiala with warm lighting and artisan counter" 
                loading="lazy" 
              />
              <div className="visit-photo-glass-bar">
                <div className="glass-bar-top">
                  <span className="live-pill"><Sparkles size={11} /> CAFE HELADOS · PATIALA</span>
                  <span className="rating-pill">⭐ 4.2 (339+ Google Reviews)</span>
                </div>
                <h4>Inside Our Cozy Arched Space</h4>
                <p>Gelato Counter · Slow Coffee Bar · Warm Ambient Seating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Directions on Google Map Box */}
        <DirectionsMapBox 
          address={address} 
          onCopyAddress={() => {
            navigator.clipboard?.writeText(address);
            setNotice('Cafe address copied to clipboard');
            setTimeout(() => setNotice(''), 2200);
          }} 
        />
      </section>

      <section className="newsletter section-pad"><div className="newsletter-copy reveal"><span className="section-index">A NOTE FROM THE SWEET SIDE</span><h2>Good things<br/>in your <em>inbox.</em></h2><p>Occasional little updates, seasonal cravings, and reasons to treat yourself.</p></div><form className="newsletter-form reveal" onSubmit={e=>{e.preventDefault();if(email.trim()){setSubscribed(true);setEmail('')}}}><label htmlFor="email">YOUR EMAIL ADDRESS</label><div className="email-field"><input id="email" type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/><button type="submit" aria-label="Subscribe"><ArrowRight size={20}/></button></div>{subscribed?<p className="form-success"><Check size={15}/> You're on the list — thanks for stopping by!</p>:<small>No spam. Just a little sweetness, now and then.</small>}</form></section>
    </main>

    <footer className="footer">
      <div className="footer-main">
        <a className="brand footer-brand" href="#home" aria-label="Cafe Helados home">
          <CafeLogoMark size={42} />
          <span className="brand-text">
            <small className="brand-sup">CAFÉ</small>
            <span className="brand-name">HELADOS</span>
            <small className="brand-sub">PATIALA · EST. 2026</small>
          </span>
        </a>
        <p>Little moments.<br/><em>Big happy.</em></p>
        <div className="footer-nav">
          <div>
            <span>EXPLORE</span>
            <a href="#story">Our story</a>
            <a href="#menu">The menu</a>
            <a href="#experience">The feeling</a>
            <a href="#ritual">Mood ritual</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div>
            <span>ORDERS & VISITS</span>
            <button onClick={()=>setOrderModalOpen(true)}>Order online</button>
            <button onClick={()=>setBookingOpen(true)}>Book a table</button>
            <button onClick={()=>{ window.location.hash = '#admin'; setView('admin'); }}>Admin Console</button>
            <a href="#visit">Find us</a>
            <a href={mapUrl} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={12}/></a>
            <button onClick={()=>setCartOpen(true)}>Your order bag</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 CAFE HELADOS · PATIALA, INDIA</span><span>MADE FOR THE MOMENTS THAT MATTER <Heart size={12} fill="currentColor"/></span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>

    {notice&&<div className="toast" role="status"><Check size={16}/>{notice}</div>}
    {cartOpen&&<div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="section-index">A LITTLE SOMETHING</span><h2>Your bag <em>({cartCount})</em></h2></div><button onClick={()=>setCartOpen(false)} aria-label="Close bag"><X/></button></div>{cart.length===0?<div className="empty-cart"><span><ShoppingBag size={30}/></span><h3>Your bag is feeling light.</h3><p>Add a favourite from the menu and let's make it a good day.</p><button className="btn btn-primary" onClick={()=>{setCartOpen(false);document.querySelector('#menu')?.scrollIntoView({behavior:'smooth'})}}>Find a favourite <ArrowRight size={16}/></button></div>:<><div className="cart-items">{cart.map(item=><div className="cart-line" key={item.id}><img src={photo(item.image,200)} alt=""/><div className="cart-line-info"><h3>{item.name}</h3><strong>₹{item.price}</strong><div className="qty-control"><button onClick={()=>changeQty(item.id,-1)} aria-label={`Remove one ${item.name}`}><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label={`Add one ${item.name}`}><Plus size={13}/></button></div></div><span className="line-total">₹{item.price*item.qty}</span></div>)}</div><div className="cart-footer"><div><span>ESTIMATED TOTAL</span><strong>₹{cartTotal}</strong></div><p>Final availability and pricing will be confirmed by the cafe.</p><a className="btn btn-primary full-btn" href={`https://wa.me/?text=${orderMessage}`} target="_blank" rel="noreferrer" onClick={()=>{
      if (cart.length > 0) {
        addStoredOrder({
          id: `HLD-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: 'Customer (WhatsApp Bag)',
          phone: '+91 98765 43210',
          type: 'Takeaway / Delivery',
          tableNo: '',
          address: 'Order placed via Bag on Website',
          status: 'Pending',
          createdAt: 'Just now',
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
          total: cartTotal,
          paymentMethod: 'WhatsApp Order'
        });
      }
    }}>Enquire about this order <ArrowUpRight size={16}/></a><button className="clear-cart" onClick={()=>setCart([])}>Clear bag</button></div></>}</aside></div>}
    
    {orderModalOpen && (
      <div className="modal-backdrop" onClick={()=>setOrderModalOpen(false)}>
        <div className="custom-modal order-modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
          <div className="modal-head">
            <div>
              <span className="section-index"><Sparkles size={13}/> CRAVINGS DELIVERED</span>
              <h2>Order <em>Online</em></h2>
              <p>Handcrafted coffees, crisp golden waffles, and gourmet desserts.</p>
            </div>
            <button className="modal-close" onClick={()=>setOrderModalOpen(false)} aria-label="Close modal"><X size={20}/></button>
          </div>

          {cartCount > 0 && (
            <div className="order-bag-banner">
              <div>
                <strong>You have {cartCount} item{cartCount>1?'s':''} in your bag</strong>
                <p>Estimated total: ₹{cartTotal}</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={()=>{setOrderModalOpen(false);setCartOpen(true);}}>
                Review Bag <ArrowRight size={14}/>
              </button>
            </div>
          )}

          <div className="order-options-grid">
            <a 
              className="order-option-card highlight" 
              href={`https://wa.me/?text=${cartCount > 0 ? orderMessage : encodeURIComponent("Hi Cafe Helados! I'd like to place an order.")}`}
              target="_blank" 
              rel="noreferrer"
            >
              <div className="option-icon whatsapp"><MessageCircle size={22}/></div>
              <div className="option-info">
                <span className="option-badge">FASTEST & DIRECT</span>
                <h3>Order via WhatsApp</h3>
                <p>Instant chat with the cafe counter for rapid confirmation and custom scoops.</p>
              </div>
              <ArrowUpRight size={18} className="option-arrow"/>
            </a>

            <div 
              className="order-option-card"
              onClick={()=>{setOrderModalOpen(false);document.querySelector('#menu')?.scrollIntoView({behavior:'smooth'});}}
              role="button"
              tabIndex={0}
            >
              <div className="option-icon menu"><Utensils size={22}/></div>
              <div className="option-info">
                <span className="option-badge">BROWSE & PICK</span>
                <h3>View Menu & Add to Bag</h3>
                <p>Select your favorite dishes, customize treats, and calculate total.</p>
              </div>
              <ArrowRight size={18} className="option-arrow"/>
            </div>

            <a className="order-option-card" href="https://www.zomato.com/patiala" target="_blank" rel="noreferrer">
              <div className="option-icon zomato"><ShoppingBag size={22}/></div>
              <div className="option-info">
                <span className="option-badge">DOORSTEP DELIVERY</span>
                <h3>Order on Zomato</h3>
                <p>Track delivery straight to your location across Patiala.</p>
              </div>
              <ExternalLink size={17} className="option-arrow"/>
            </a>

            <a className="order-option-card" href="https://www.swiggy.com/city/patiala" target="_blank" rel="noreferrer">
              <div className="option-icon swiggy"><Sparkles size={22}/></div>
              <div className="option-info">
                <span className="option-badge">DOORSTEP DELIVERY</span>
                <h3>Order on Swiggy</h3>
                <p>Order fresh shakes, pastas, and waffles with Swiggy delivery.</p>
              </div>
              <ExternalLink size={17} className="option-arrow"/>
            </a>
          </div>

          <div className="order-modal-footer">
            <div className="pickup-call">
              <Phone size={15}/>
              <span>Takeaway / Curbside Pickup: <a href="tel:+919876543210">+91 98765 43210</a></span>
            </div>
            <small>Charan Bagh, Patiala · Open daily until 10:55 PM</small>
          </div>
        </div>
      </div>
    )}

    {bookingOpen && (
      <div className="modal-backdrop" onClick={()=>setBookingOpen(false)}>
        <div className="custom-modal booking-modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
          <div className="modal-head">
            <div>
              <span className="section-index"><Calendar size={13}/> RESERVATIONS</span>
              <h2>Book a <em>Table</em></h2>
              <p>Reserve a cozy nook, celebration table, or sunlit window seat.</p>
            </div>
            <button className="modal-close" onClick={()=>setBookingOpen(false)} aria-label="Close modal"><X size={20}/></button>
          </div>

          <form 
            className="booking-form" 
            onSubmit={e => {
              e.preventDefault();
              const newBooking = {
                id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
                name: bookingData.name,
                phone: bookingData.phone,
                guests: bookingData.guests,
                date: bookingData.date,
                time: bookingData.time,
                seating: bookingData.seating,
                status: 'Pending',
                createdAt: 'Just now',
                notes: 'Website Reservation'
              };
              addStoredBooking(newBooking);
              const msg = encodeURIComponent(`Hi Cafe Helados! I would like to reserve a table.\nBooking Ref: ${newBooking.id}\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nGuests: ${bookingData.guests}\nDate: ${bookingData.date}\nTime slot: ${bookingData.time}\nPreference: ${bookingData.seating}`);
              setNotice('Reservation logged in Manager Console! Opening WhatsApp...');
              setBookingOpen(false);
              setTimeout(() => {
                window.open(`https://wa.me/?text=${msg}`, '_blank');
                setNotice('');
              }, 1200);
            }}
          >
            <div className="booking-grid">
              <div className="field-group">
                <label htmlFor="b-name">YOUR NAME</label>
                <input id="b-name" required placeholder="e.g. Jasleen Kaur" value={bookingData.name} onChange={e=>setBookingData({...bookingData,name:e.target.value})}/>
              </div>
              <div className="field-group">
                <label htmlFor="b-phone">PHONE NUMBER</label>
                <input id="b-phone" type="tel" required placeholder="e.g. +91 98765 43210" value={bookingData.phone} onChange={e=>setBookingData({...bookingData,phone:e.target.value})}/>
              </div>
              <div className="field-group">
                <label htmlFor="b-date">DATE</label>
                <input id="b-date" type="date" required value={bookingData.date} onChange={e=>setBookingData({...bookingData,date:e.target.value})}/>
              </div>
              <div className="field-group">
                <label htmlFor="b-time">TIME SLOT</label>
                <select id="b-time" value={bookingData.time} onChange={e=>setBookingData({...bookingData,time:e.target.value})}>
                  <option>12:00 PM — Lunch & Coffee</option>
                  <option>02:30 PM — Afternoon Hangout</option>
                  <option>04:30 PM — Evening Sundaes & Shakes</option>
                  <option>06:30 PM — Golden Hour Catch-up</option>
                  <option>08:30 PM — Dinner & Desserts</option>
                  <option>09:45 PM — Late Night Dessert Run</option>
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="b-guests">PARTY SIZE</label>
                <select id="b-guests" value={bookingData.guests} onChange={e=>setBookingData({...bookingData,guests:e.target.value})}>
                  <option>1 - 2 Guests (Cozy Table)</option>
                  <option>3 - 4 Guests (Family / Friends)</option>
                  <option>5 - 8 Guests (Group Gathering)</option>
                  <option>8+ Guests (Celebration / Birthday)</option>
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="b-seating">SEATING PREFERENCE</label>
                <select id="b-seating" value={bookingData.seating} onChange={e=>setBookingData({...bookingData,seating:e.target.value})}>
                  <option>Cozy Arched Corner</option>
                  <option>Window View Table</option>
                  <option>Plush Lounge Sofa</option>
                  <option>Celebration / Birthday Table</option>
                </select>
              </div>
            </div>

            <div className="booking-footer">
              <button type="submit" className="btn btn-primary full-btn">
                Confirm Reservation on WhatsApp <ArrowUpRight size={16}/>
              </button>
              <small>No advance deposit required · Free cancellation</small>
            </div>
          </form>
        </div>
      </div>
    )}

    <button className="sound-toggle" onClick={()=>{setSoundOn(!soundOn);setNotice(soundOn?'Ambient sound preference off':'Sound stays off unless an audio track is connected');setTimeout(()=>setNotice(''),2400)}} aria-label="Toggle ambient sound"><span className={soundOn?'sound-bars active':'sound-bars'}><i/><i/><i/><i/></span>{soundOn?'Sound on':'Sound off'}</button>
    <button 
      className="floating-admin-btn" 
      onClick={() => { window.location.hash = '#admin'; setView('admin'); }}
      title="Open Cafe Helados Admin Console"
    >
      <ShieldCheck size={15} />
      <span>Manager Console</span>
    </button>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
