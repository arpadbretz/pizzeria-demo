"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Mail,
  Flame,
  ChevronDown,
  Star,
  ArrowRight,
  Menu,
  X,
  Quote,
} from "lucide-react";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/* ─── data ─── */
const menuCategories = [
  {
    id: "classics",
    label: "Klasszikusok",
    items: [
      {
        name: "Margherita",
        desc: "San Marzano, fior di latte, friss bazsalikom, extra szűz olívaolaj",
        price: "2 490",
        badge: null,
      },
      {
        name: "Diavola",
        desc: "Csípős szalámi, mozzarella, calabriai chili olaj",
        price: "3 190",
        badge: "Csípős",
      },
      {
        name: "Quattro Formaggi",
        desc: "Mozzarella, gorgonzola, parmezán, taleggio, dió",
        price: "3 490",
        badge: null,
      },
      {
        name: "Prosciutto e Rucola",
        desc: "24 hónapos pármai sonka, rukkola, parmezán, balzsamkrém",
        price: "3 690",
        badge: null,
      },
    ],
  },
  {
    id: "special",
    label: "A Séf Ajánlata",
    items: [
      {
        name: "Tartufo Bianco",
        desc: "Szarvasgomba krém, burrata, prosciutto crudo, rucola",
        price: "4 290",
        badge: "Prémium",
      },
      {
        name: "Frutti di Mare",
        desc: "Garnéla, polip, vongole, fokhagyma, petrezselyem",
        price: "4 490",
        badge: null,
      },
      {
        name: "Calzone Napoli",
        desc: "Ricotta, sonka, gomba, füstölt mozzarella, házi szósz",
        price: "3 290",
        badge: null,
      },
      {
        name: "Nduja e Burrata",
        desc: "Krémes nduja, burrata, méz, bazsalikom, pisztácia",
        price: "3 990",
        badge: "Új",
      },
    ],
  },
  {
    id: "dessert",
    label: "Édes Pizzák & Desszertek",
    items: [
      {
        name: "Nutella e Fragole",
        desc: "Nutella, friss eper, porcukor, mascarpone",
        price: "2 290",
        badge: null,
      },
      {
        name: "Tiramisù della Casa",
        desc: "Házi tiramisu, mascarpone, espresso, kakaópor",
        price: "1 890",
        badge: null,
      },
      {
        name: "Panna Cotta",
        desc: "Vanília panna cotta, erdei gyümölcs ragú",
        price: "1 690",
        badge: null,
      },
    ],
  },
];

const testimonials = [
  {
    name: "Kovács Petra",
    text: "A legjobb pizza Budapesten, nem kérdés. A Tartufo Bianco szinte vallási élmény. A hangulat, a kiszolgálás, minden tökéletes.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Tóth Márk",
    text: "Nápoly óta nem ettem ilyen jó Margheritát. A tészta tökéletes – kívül ropogós, belül puha, a szélein éppen szenesedik. Fantasztikus!",
    rating: 5,
    source: "TripAdvisor",
  },
  {
    name: "Szabó Anna",
    text: "A fatüzelésű kemence illata már az ajtóból megüti az embert. Hetente járunk ide a családdal, és a gyerekek is imádják. A személyzet kedves és figyelmes.",
    rating: 5,
    source: "Google",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    alt: "Nápolyi pizza közelről",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80",
    alt: "Fatüzelésű kemence",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80",
    alt: "Étterem hangulat",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    alt: "Pizza felszolgálás",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    alt: "Pepperoni pizza",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=600&q=80",
    alt: "Pizza tészta készítés",
    span: "",
  },
];

const navLinks = [
  { label: "Történetünk", href: "#story" },
  { label: "Étlap", href: "#menu" },
  { label: "Galéria", href: "#gallery" },
  { label: "Kapcsolat", href: "#contact" },
];

/* ─── counter hook ─── */
function useCounter(end: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

/* ─── counter component ─── */
function AnimatedCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-ember tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-warm-muted text-sm mt-2 tracking-wide uppercase">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("classics");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMenu = menuCategories.find((c) => c.id === activeTab)!;

  return (
    <main className="relative">
      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2"
            : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className={`max-w-7xl mx-auto mx-6 md:mx-auto px-6 md:px-8 py-3 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-night/90 backdrop-blur-xl shadow-2xl shadow-night/50 border border-gold/10"
              : "bg-transparent"
          }`}
          style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-ember flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-5 h-5 text-warm" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-warm leading-none">
                Napoli
              </span>
              <span className="text-[10px] tracking-[0.3em] text-gold-muted uppercase leading-none mt-0.5">
                Pizzéria
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-warm/60 hover:text-warm transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-ember after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="tel:+3612345678"
            className="hidden md:flex items-center gap-2 bg-ember text-warm px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ember-light transition-colors duration-300 shadow-lg shadow-ember/20"
          >
            <Phone className="w-4 h-4" />
            Rendelés
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-warm"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 mx-6 bg-night-light/95 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-gold/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-warm/60 hover:text-ember transition-colors border-b border-warm/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+3612345678"
              className="mt-3 flex items-center justify-center gap-2 bg-ember text-warm px-5 py-3 rounded-full text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              Rendelés
            </a>
          </motion.div>
        )}
      </motion.nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        {/* Background image with parallax + scale */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=1920&q=80')",
            }}
          />
          {/* Dark cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-night/40" />
        </motion.div>

        {/* Ember glow accent */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-ember/10 rounded-full blur-[120px] glow-pulse pointer-events-none" />

        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-gold text-sm tracking-wide">
                4.9 &middot; 2800+ értékelés
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-warm leading-[0.95] mb-8"
            >
              Tűzben
              <br />
              született
              <br />
              <span className="italic text-ember">ízvilág</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-warm/50 max-w-xl mb-10 leading-relaxed"
            >
              Autentikus nápolyi pizza, 500°C-os fatüzelésű kemencéből.
              72 órás érlelésű tészta, olasz mesterek tudásával,
              Budapest szívében.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="group inline-flex items-center gap-3 bg-ember text-warm px-8 py-4 rounded-full font-semibold hover:bg-ember-light transition-all duration-300 shadow-xl shadow-ember/25"
              >
                Étlap megtekintése
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-3 border border-warm/20 text-warm/80 px-8 py-4 rounded-full font-semibold hover:border-ember/50 hover:text-ember transition-all duration-300"
              >
                Történetünk
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-warm/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE STRIP ═══════════════ */}
      <div className="py-5 bg-ember overflow-hidden">
        <div className="marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-warm/90 text-sm font-semibold tracking-widest uppercase mr-8">
              <span>Fatüzelésű kemence</span>
              <span className="text-warm/40">◆</span>
              <span>72 órás érlelés</span>
              <span className="text-warm/40">◆</span>
              <span>San Marzano paradicsom</span>
              <span className="text-warm/40">◆</span>
              <span>Olasz mozzarella</span>
              <span className="text-warm/40">◆</span>
              <span>Caputo liszt</span>
              <span className="text-warm/40">◆</span>
              <span>Kézzel nyújtott tészta</span>
              <span className="text-warm/40">◆</span>
              <span>Nápoly receptek</span>
              <span className="text-warm/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ OUR STORY — SPLIT SCREEN ═══════════════ */}
      <section id="story" className="py-24 md:py-40 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-ember/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Images stack */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&q=80"
                    alt="Pizzakészítés"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent" />
                </div>

                {/* Overlapping smaller image */}
                <motion.div
                  className="absolute -bottom-8 -right-4 md:-right-12 w-48 md:w-64 aspect-square rounded-2xl overflow-hidden border-4 border-night shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80"
                    alt="Fatüzelésű kemence"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Gold accent line */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-gold/30 rounded-tl-3xl" />
              </div>
            </motion.div>

            {/* Right — Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                variants={fadeUp}
                className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
              >
                Történetünk
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-warm mb-8 leading-tight"
              >
                Nápoly szíve,
                <br />
                <span className="text-ember">Budapest tüze</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-6 mb-10">
                <p className="text-warm/50 text-lg leading-relaxed">
                  2018-ban egy álommal indultunk: elhozni Budapest szívébe
                  az autentikus nápolyi pizzakultúrát. Marco, alapító
                  séfünk 15 évet töltött Nápoly legjobb pizzériáiban,
                  mielőtt a Duna partjára költözött.
                </p>
                <p className="text-warm/50 text-lg leading-relaxed">
                  A titkunk a türelem: a tésztánk 72 órán át érik természetes
                  kovásszal, a szószunk San Marzano paradicsomból készül,
                  a mozzarellánk pedig hetente érkezik Campaniából.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex gap-12 pt-8 border-t border-warm/10"
              >
                <div>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-ember">
                    7+
                  </div>
                  <div className="text-warm-muted text-sm mt-1">Év tapasztalat</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-ember">
                    15 000+
                  </div>
                  <div className="text-warm-muted text-sm mt-1">Pizza havonta</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-ember">
                    100%
                  </div>
                  <div className="text-warm-muted text-sm mt-1">Olasz alapanyag</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS COUNTER BAR ═══════════════ */}
      <section className="py-20 bg-night-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(212,74,26,0.08), transparent 60%), radial-gradient(circle at 70% 50%, rgba(201,169,110,0.06), transparent 60%)",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeUp}>
              <AnimatedCounter end={500} suffix="°C" label="Kemence hőfok" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <AnimatedCounter end={72} suffix=" óra" label="Tészta érlelés" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <AnimatedCounter end={90} suffix=" mp" label="Sütési idő" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <AnimatedCounter end={2800} suffix="+" label="Értékelés" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ MENU — TABBED ═══════════════ */}
      <section id="menu" className="py-24 md:py-40 relative">
        {/* Large background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span className="font-[family-name:var(--font-display)] text-[15vw] font-bold text-warm/[0.02] whitespace-nowrap">
            MENU
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Étlapunk
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-warm mb-6"
            >
              Válassz a kedvenceid közül
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-warm/40 text-lg max-w-xl mx-auto"
            >
              Minden pizzánk kézzel nyújtott és fatüzelésű kemencében sütött,
              a legfrissebb olasz alapanyagokból.
            </motion.p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-2 mb-14"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-ember text-warm shadow-lg shadow-ember/20"
                    : "bg-warm/5 text-warm/50 hover:bg-warm/10 hover:text-warm/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Menu items */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-0">
              {activeMenu.items.map((item, i) => (
                <div
                  key={i}
                  className="group py-6 border-b border-warm/5 last:border-0 hover:border-warm/10 transition-colors duration-300"
                >
                  <div className="flex items-baseline">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-warm group-hover:text-ember transition-colors duration-300">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-ember/10 text-ember border border-ember/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="price-dots" />
                    <span className="font-[family-name:var(--font-display)] font-bold text-gold text-lg whitespace-nowrap">
                      {item.price} Ft
                    </span>
                  </div>
                  <p className="text-sm text-warm/30 mt-1.5 group-hover:text-warm/50 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-3 border border-warm/15 text-warm/70 px-8 py-4 rounded-full font-semibold hover:border-ember/40 hover:text-ember transition-all duration-300"
            >
              Teljes étlap letöltése (PDF)
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 md:py-32 bg-night-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ember/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Vélemények
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-warm"
            >
              Amit vendégeink mondanak
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-night-medium/50 backdrop-blur-sm border border-warm/5 rounded-2xl p-8 hover:border-ember/20 transition-all duration-500"
              >
                <Quote className="w-8 h-8 text-ember/20 mb-4" />
                <p className="text-warm/60 leading-relaxed mb-6 text-[15px]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-warm text-sm">{t.name}</div>
                    <div className="text-warm-muted text-xs">{t.source}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-ember/5 via-transparent to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Galéria
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-warm"
            >
              Pillanatok a konyhából
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-3 md:gap-4"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-warm text-sm font-medium">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA — RESERVATION ═══════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-night/85 backdrop-blur-sm" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Foglalás
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-warm mb-6"
            >
              Foglalj asztalt nálunk
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-warm/50 text-lg md:text-xl mb-10 max-w-xl mx-auto"
            >
              Élvezd a frissen sült pizza illatát és az olasz vendégszeretetet
              Budapest legautentikusabb pizzériájában.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="tel:+3612345678"
                className="inline-flex items-center gap-3 bg-ember text-warm px-8 py-4 rounded-full font-bold hover:bg-ember-light transition-all duration-300 shadow-xl shadow-ember/30"
              >
                <Phone className="w-5 h-5" />
                +36 1 234 5678
              </a>
              <a
                href="mailto:info@napolipizzeria.hu"
                className="inline-flex items-center gap-3 border border-warm/20 text-warm px-8 py-4 rounded-full font-bold hover:border-ember/40 hover:text-ember transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email küldése
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER / CONTACT ═══════════════ */}
      <footer id="contact" className="bg-night-light pt-20 pb-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
          <span className="font-[family-name:var(--font-display)] text-[16vw] font-bold text-warm/[0.015] whitespace-nowrap block leading-none -mb-[3vw]">
            NAPOLI PIZZÉRIA
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            {/* Col 1 */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center">
                  <Flame className="w-6 h-6 text-warm" />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-xl font-bold text-warm">
                    Napoli
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-gold-muted uppercase">
                    Pizzéria
                  </div>
                </div>
              </div>
              <p className="text-warm/30 leading-relaxed mb-6">
                Autentikus nápolyi pizza Budapest szívében.
                Fatüzelésű kemence, friss olasz alapanyagok,
                szenvedéllyel készítve 2018 óta.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-warm/5 flex items-center justify-center hover:bg-ember/20 hover:text-ember transition-all duration-300 text-warm/40"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2 */}
            <motion.div variants={fadeUp}>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-warm mb-6">
                Elérhetőség
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ember mt-0.5 flex-shrink-0" />
                  <span className="text-warm/40">
                    1065 Budapest,
                    <br />
                    Nagymező utca 38.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-ember flex-shrink-0" />
                  <span className="text-warm/40">+36 1 234 5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-ember flex-shrink-0" />
                  <span className="text-warm/40">info@napolipizzeria.hu</span>
                </div>
              </div>
            </motion.div>

            {/* Col 3 */}
            <motion.div variants={fadeUp}>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-warm mb-6">
                Nyitvatartás
              </h4>
              <div className="space-y-3">
                {[
                  { days: "Hétfő – Csütörtök", hours: "11:00 – 22:00" },
                  { days: "Péntek – Szombat", hours: "11:00 – 23:00" },
                  { days: "Vasárnap", hours: "12:00 – 21:00" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-ember flex-shrink-0" />
                    <div>
                      <div className="text-warm/40 text-sm">{row.days}</div>
                      <div className="text-warm/70 font-medium text-sm">{row.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 rounded-2xl overflow-hidden border border-warm/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.4!2d19.058!3d47.506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDMwJzIxLjYiTiAxOcKwMycyOC44IkU!5e0!3m2!1shu!2shu!4v1"
              width="100%"
              height="300"
              style={{
                border: 0,
                filter: "invert(0.92) hue-rotate(180deg) saturate(0.2) brightness(0.8)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Napoli Pizzéria - Térkép"
            />
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-warm/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm/20 text-sm">
              © 2025 Napoli Pizzéria. Minden jog fenntartva.
            </p>
            <p className="text-warm/20 text-sm">
              Készítette:{" "}
              <a
                href="#"
                className="text-ember/50 hover:text-ember transition-colors"
              >
                Prometheus Digital
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
