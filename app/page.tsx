"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Mail,
  Flame,
  Wheat,
  Cherry,
  Menu,
  X,
} from "lucide-react";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/* ─── data ─── */
const menuItems = [
  {
    category: "Klasszikusok",
    items: [
      { name: "Margherita", desc: "San Marzano, mozzarella, friss bazsalikom", price: "2 490" },
      { name: "Diavola", desc: "Csípős szalámi, mozzarella, chili olaj", price: "3 190" },
      { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmezán, ricotta", price: "3 490" },
      { name: "Prosciutto e Rucola", desc: "Pármai sonka, rukkola, parmezán forgács", price: "3 690" },
    ],
  },
  {
    category: "A Séf Ajánlata",
    items: [
      { name: "Tartufo Bianco", desc: "Szarvasgomba krém, burrata, ropogós prosciutto", price: "4 290" },
      { name: "Frutti di Mare", desc: "Garnéla, kagyló, kalamári, fokhagyma", price: "4 490" },
      { name: "Calzone Speciale", desc: "Sonka, gomba, ricotta, házi szósz", price: "3 290" },
      { name: "Vegetariana", desc: "Grillzöldségek, pesto, mozzarella, olíva", price: "2 990" },
    ],
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", alt: "Nápolyi pizza", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", alt: "Pizza készítés", span: "" },
  { src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80", alt: "Fatüzelésű kemence", span: "" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", alt: "Pizza felszolgálás", span: "md:col-span-2" },
  { src: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=600&q=80", alt: "Pizza tészta", span: "" },
  { src: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80", alt: "Étterem hangulat", span: "" },
];

const navLinks = [
  { label: "Történetünk", href: "#story" },
  { label: "Étlap", href: "#menu" },
  { label: "Galéria", href: "#gallery" },
  { label: "Kapcsolat", href: "#contact" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="relative">
      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-cream/80 backdrop-blur-lg rounded-full px-6 md:px-8 py-3 shadow-lg shadow-charcoal/5 border border-charcoal/5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-tomato flex items-center justify-center">
              <Flame className="w-5 h-5 text-cream" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal">
              Napoli
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-tomato transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="tel:+3612345678"
            className="hidden md:flex items-center gap-2 bg-tomato text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-tomato-dark transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            Rendelés
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 bg-cream/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-charcoal/5"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-charcoal/70 hover:text-tomato transition-colors border-b border-charcoal/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+3612345678"
              className="mt-3 flex items-center justify-center gap-2 bg-tomato text-cream px-5 py-3 rounded-full text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              Rendelés
            </a>
          </motion.div>
        )}
      </motion.nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-tomato" />
              <span className="text-tomato font-semibold text-sm tracking-widest uppercase">
                Budapest &middot; Est. 2018
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal leading-[0.95] mb-6"
            >
              Ahol a tészta
              <br />
              <span className="text-tomato italic">mesél</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-charcoal/60 max-w-lg mb-10 leading-relaxed"
            >
              Hagyományos nápolyi pizza, fatüzelésű kemencéből.
              72 órás érlelésű tészta, friss olasz alapanyagok,
              és egy csipetnyi budapesti lélek.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="group inline-flex items-center gap-3 bg-charcoal text-cream px-8 py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all duration-300"
              >
                Étlap megtekintése
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-3 border-2 border-charcoal/20 text-charcoal px-8 py-4 rounded-full font-semibold hover:border-tomato hover:text-tomato transition-all duration-300"
              >
                Történetünk
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-charcoal/40 tracking-widest uppercase">Görgess</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-charcoal/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-tomato" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ FEATURES RIBBON ═══════════════ */}
      <section className="py-16 md:py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(192,57,43,0.3), transparent 50%), radial-gradient(circle at 80% 50%, rgba(192,57,43,0.2), transparent 50%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              {
                icon: Flame,
                title: "Fatüzelésű Kemence",
                desc: "500°C-on sült pizza 90 másodperc alatt. Az igazi nápolyi hagyomány.",
              },
              {
                icon: Wheat,
                title: "72 Órás Tészta",
                desc: "Lassú érlelés, Caputo liszt, természetes kovász. Könnyű és emészthető.",
              },
              {
                icon: Cherry,
                title: "Friss Alapanyagok",
                desc: "San Marzano paradicsom, olasz mozzarella, helyi szezonális zöldségek.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-tomato/10 mb-5 group-hover:bg-tomato/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-tomato" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-cream mb-3">
                  {feature.title}
                </h3>
                <p className="text-cream/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <section id="story" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&q=80"
                  alt="Pizzakészítés"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-tomato text-cream p-6 rounded-2xl shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <div className="text-4xl font-bold font-[family-name:var(--font-display)]">7+</div>
                <div className="text-sm text-cream/80">Év tapasztalat</div>
              </motion.div>
              {/* Decorative circle */}
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full border-2 border-tomato/20 -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeUp} className="italian-divider mb-4 max-w-xs">
                <span className="text-tomato font-semibold text-sm tracking-widest uppercase whitespace-nowrap">
                  Történetünk
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight"
              >
                Nápoly szíve,
                <br />
                <span className="text-tomato">Budapest lelke</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-charcoal/60 text-lg leading-relaxed mb-6">
                2018-ban egy álommal indultunk: elhozni Budapest szívébe
                az autentikus nápolyi pizza ízvilágát. Marco, az alapító
                séfünk Nápolyban tanulta a mesterséget, és azóta is minden
                nap ugyanazzal a szenvedéllyel készíti a pizzáinkat.
              </motion.p>

              <motion.p variants={fadeUp} className="text-charcoal/60 text-lg leading-relaxed mb-8">
                A titkunk egyszerű: a legjobb alapanyagok, türelem és
                szeretet. A tésztánk 72 órán át érik, a szószunk San
                Marzano paradicsomból készül, a mozzarellánk pedig
                hetente érkezik Olaszországból.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
                {[
                  { number: "15 000+", label: "Pizza havonta" },
                  { number: "4.9", label: "Google értékelés" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-tomato">
                      {stat.number}
                    </div>
                    <div className="text-sm text-charcoal/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MENU ═══════════════ */}
      <section id="menu" className="py-24 md:py-32 bg-parchment relative">
        {/* Decorative big text */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span className="font-[family-name:var(--font-display)] text-[12vw] font-bold text-charcoal/[0.03] whitespace-nowrap">
            PIZZA
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="italian-divider mb-4 max-w-xs mx-auto">
              <span className="text-tomato font-semibold text-sm tracking-widest uppercase whitespace-nowrap">
                Étlap
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal mb-4"
            >
              Válassz a kedvenceid közül
            </motion.h2>
            <motion.p variants={fadeUp} className="text-charcoal/50 text-lg max-w-lg mx-auto">
              Minden pizzánk kézzel nyújtott, fatüzelésű kemencében sütött,
              és a legfrissebb alapanyagokból készül.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {menuItems.map((section, si) => (
              <motion.div
                key={si}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h3
                  variants={fadeUp}
                  className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal mb-8 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-tomato" />
                  {section.category}
                </motion.h3>

                <div className="space-y-6">
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      variants={fadeUp}
                      className="group"
                    >
                      <div className="flex items-baseline">
                        <span className="font-semibold text-charcoal group-hover:text-tomato transition-colors duration-300">
                          {item.name}
                        </span>
                        <span className="price-dots" />
                        <span className="font-[family-name:var(--font-display)] font-bold text-tomato text-lg">
                          {item.price} Ft
                        </span>
                      </div>
                      <p className="text-sm text-charcoal/45 mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-tomato text-cream px-8 py-4 rounded-full font-semibold hover:bg-tomato-dark transition-all duration-300 shadow-lg shadow-tomato/20"
            >
              Teljes étlap letöltése
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="italian-divider mb-4 max-w-xs mx-auto">
              <span className="text-tomato font-semibold text-sm tracking-widest uppercase whitespace-nowrap">
                Galéria
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal"
            >
              Pillanatok a konyhából
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4"
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-cream text-sm font-medium">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 md:py-28 bg-tomato relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-cream mb-6"
            >
              Éhes lettél?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-cream/80 text-lg md:text-xl mb-10 max-w-lg mx-auto">
              Rendelj online vagy foglalj asztalt és élvezd a frissen sült
              pizza illatát a helyszínen!
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+3612345678"
                className="inline-flex items-center gap-3 bg-cream text-tomato px-8 py-4 rounded-full font-bold hover:bg-cream-dark transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                +36 1 234 5678
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-bold hover:bg-cream/10 transition-all duration-300"
              >
                Asztalfoglalás
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER / CONTACT ═══════════════ */}
      <footer id="contact" className="bg-charcoal text-cream pt-20 pb-8 relative overflow-hidden">
        {/* Large decorative text */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
          <span className="font-[family-name:var(--font-display)] text-[18vw] font-bold text-cream/[0.02] whitespace-nowrap block leading-none -mb-[4vw]">
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
            {/* Col 1: Brand */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-tomato flex items-center justify-center">
                  <Flame className="w-6 h-6 text-cream" />
                </div>
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  Napoli
                </span>
              </div>
              <p className="text-cream/40 leading-relaxed mb-6">
                Autentikus nápolyi pizza Budapest szívében.
                Fatüzelésű kemence, friss alapanyagok,
                olasz mesterek receptjei.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-cream/5 flex items-center justify-center hover:bg-tomato/20 hover:text-tomato transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2: Contact info */}
            <motion.div variants={fadeUp}>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold mb-6">
                Elérhetőség
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-tomato mt-0.5 flex-shrink-0" />
                  <span className="text-cream/60">
                    1065 Budapest,
                    <br />
                    Nagymező utca 38.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-tomato flex-shrink-0" />
                  <span className="text-cream/60">+36 1 234 5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-tomato flex-shrink-0" />
                  <span className="text-cream/60">info@napolipizzeria.hu</span>
                </div>
              </div>
            </motion.div>

            {/* Col 3: Hours */}
            <motion.div variants={fadeUp}>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold mb-6">
                Nyitvatartás
              </h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-tomato flex-shrink-0" />
                  <div>
                    <div className="text-cream/60">Hétfő – Csütörtök</div>
                    <div className="text-cream/80 font-medium">11:00 – 22:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-tomato flex-shrink-0" />
                  <div>
                    <div className="text-cream/60">Péntek – Szombat</div>
                    <div className="text-cream/80 font-medium">11:00 – 23:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-tomato flex-shrink-0" />
                  <div>
                    <div className="text-cream/60">Vasárnap</div>
                    <div className="text-cream/80 font-medium">12:00 – 21:00</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 rounded-2xl overflow-hidden border border-cream/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.4!2d19.058!3d47.506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDMwJzIxLjYiTiAxOcKwMycyOC44IkU!5e0!3m2!1shu!2shu!4v1"
              width="100%"
              height="300"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Napoli Pizzéria - Térkép"
            />
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/30 text-sm">
              © 2025 Napoli Pizzéria. Minden jog fenntartva.
            </p>
            <p className="text-cream/30 text-sm">
              Készítette:{" "}
              <a href="#" className="text-tomato/60 hover:text-tomato transition-colors">
                Prometheus Digital
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
