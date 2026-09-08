import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Waves,
  ArrowRight,
  Radio,
  ScanLine,
  Brain,
  MapPin,
  Target,
  AlertTriangle,
  Fish,
  Anchor,
  ChevronRight,
  Eye,
  Camera,
  Gauge,
  Crosshair,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import { CircularSonar } from '@/components/sonar/SonarPanel';
import { Footer } from '@/components/common/Footer';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-abyss-950">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 sonar-noise opacity-40" />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sonar-cyan/5 blur-3xl" />
        </div>

        {/* Underwater particles */}
        <UnderwaterParticles />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-label text-sonar-cyan">DEEPSENSE</span>
              <span className="text-abyss-600">//</span>
              <span className="text-label text-abyss-300">UNDERWATER INTELLIGENCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-abyss-50 tracking-tight leading-[1.05] mb-6"
            >
              SEE WHAT
              <br />
              LIES <span className="text-sonar-cyan text-glow">BENEATH</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-abyss-200 max-w-lg leading-relaxed mb-8"
            >
              AI-powered detection of lost fishing gear and marine debris using
              side-scan sonar imagery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/dashboard" className="btn-primary">
                <Crosshair className="w-4 h-4" />
                Launch Mission Control
              </Link>
              <Link to="/about" className="btn-secondary">
                <Eye className="w-4 h-4" />
                Explore the Technology
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-safe animate-blink" />
                <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">AI Engine Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sonar-cyan animate-blink" />
                <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">Sonar Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-warn animate-blink" />
                <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">Demo Mode</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Sonar visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-full bg-sonar-cyan/10 blur-3xl scale-110" />
              <CircularSonar size={420} />

              {/* Floating detection labels */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-[20%] -left-4 lg:-left-12 panel px-3 py-2 space-y-1"
              >
                <div className="text-[9px] font-mono text-status-crit uppercase tracking-wider">NET DETECTED</div>
                <div className="text-xs font-mono text-abyss-100">CONFIDENCE 94.2%</div>
                <div className="text-[10px] font-mono text-abyss-300">DEPTH 38.4 M</div>
                <div className="text-[10px] font-mono text-abyss-300">SECTOR B-07</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-[15%] -right-4 lg:-right-12 panel px-3 py-2 space-y-1"
              >
                <div className="text-[9px] font-mono text-status-warn uppercase tracking-wider">ROPE DETECTED</div>
                <div className="text-xs font-mono text-abyss-100">CONFIDENCE 91.7%</div>
                <div className="text-[10px] font-mono text-abyss-300">DEPTH 42.1 M</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono text-abyss-400 uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-4 h-4 text-abyss-400 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <ProblemSection />

      {/* How DeepSense Works */}
      <HowItWorksSection />

      {/* Why Side-Scan Sonar */}
      <WhySonarSection />

      {/* Ghost Gear Feature */}
      <GhostGearSection />

      {/* Pipeline Section */}
      <PipelineSection />

      {/* Final CTA */}
      <FinalCTA />

      <Footer />
    </div>
  );
}

function UnderwaterParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sonar-cyan/30"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function ProblemSection() {
  const categories = [
    {
      icon: ShieldAlert,
      name: 'Ghost Nets',
      desc: 'Lost fishing nets can continue catching marine life without human control.',
      color: 'text-status-crit',
    },
    {
      icon: Anchor,
      name: 'Rope & Lines',
      desc: 'Submerged ropes and longlines can entangle wildlife and interfere with underwater operations.',
      color: 'text-status-warn',
    },
    {
      icon: Fish,
      name: 'Traps & Cages',
      desc: 'Lost traps and cages can become persistent hazards on the seabed.',
      color: 'text-status-warn',
    },
    {
      icon: Waves,
      name: 'Buoys & Floats',
      desc: 'Lost buoys and floats drift with currents, creating navigation hazards.',
      color: 'text-sonar-cyan',
    },
    {
      icon: Layers,
      name: 'Metal Equipment',
      desc: 'Metal fishing gear and hardware persist indefinitely on the seafloor.',
      color: 'text-abyss-200',
    },
  ];

  return (
    <section className="relative py-24 bg-abyss-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-label text-sonar-cyan mb-3">THE PROBLEM</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight max-w-3xl">
            THE OCEAN DOESN'T FORGET
            <br />
            <span className="text-abyss-300">LOST GEAR.</span>
          </h2>
          <p className="text-abyss-200 mt-4 max-w-2xl text-lg leading-relaxed">
            Fishing gear can become marine debris when it is lost, abandoned, or
            discarded underwater. Ghost nets and other fishing equipment can
            continue trapping marine life long after they are lost.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="panel p-5 group hover:border-abyss-600/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-sm bg-abyss-800/50 border border-abyss-700/30 flex items-center justify-center mb-4 group-hover:border-sonar-cyan/30 transition-colors">
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <div className="text-label-sm text-abyss-400 mb-2">CATEGORY</div>
                <h3 className="text-sm font-bold text-abyss-50 uppercase tracking-wider mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-abyss-300 leading-relaxed">{cat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Sonar Scan', desc: 'Side-scan sonar sends acoustic pulses toward the seafloor.', icon: Radio },
    { num: '02', title: 'Sonar Image', desc: 'Acoustic returns create an image of the underwater environment.', icon: ScanLine },
    { num: '03', title: 'AI Processing', desc: 'DeepSense preprocesses and analyzes the sonar imagery.', icon: Brain },
    { num: '04', title: 'Debris Detection', desc: 'AI identifies visual/acoustic patterns associated with fishing gear.', icon: Crosshair },
    { num: '05', title: 'Classification', desc: 'The system estimates what type of fishing debris was detected.', icon: Layers },
    { num: '06', title: 'Location', desc: 'Detection is associated with survey position and estimated depth.', icon: MapPin },
    { num: '07', title: 'Prioritization', desc: 'Potentially dangerous or high-confidence objects are prioritized.', icon: Target },
  ];

  return (
    <section className="relative py-24 bg-abyss-900/50 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-label text-sonar-cyan mb-3">THE PIPELINE</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight">
            HOW DEEPSENSE WORKS
          </h2>
        </motion.div>

        <div className="space-y-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 lg:gap-6 group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-abyss-800/50 border border-abyss-700/40 flex items-center justify-center group-hover:border-sonar-cyan/40 transition-colors">
                  <Icon className="w-6 h-6 text-sonar-cyan/70 group-hover:text-sonar-cyan transition-colors" />
                </div>
                <div className="flex-shrink-0 text-2xl lg:text-3xl font-mono font-bold text-abyss-700 group-hover:text-sonar-cyan/40 transition-colors">
                  {step.num}
                </div>
                <div className="flex-1 panel p-4 group-hover:border-abyss-600/50 transition-colors">
                  <h3 className="text-sm font-bold text-abyss-50 uppercase tracking-wider mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-abyss-300">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-[3.5rem] -bottom-4 w-px h-4 bg-abyss-700/40" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhySonarSection() {
  return (
    <section className="relative py-24 bg-abyss-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-label text-sonar-cyan mb-3">WHY SONAR</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight max-w-3xl">
            WHEN CAMERAS CAN'T SEE,
            <br />
            <span className="text-sonar-cyan">SONAR CAN.</span>
          </h2>
          <p className="text-abyss-200 mt-4 max-w-2xl text-lg leading-relaxed">
            Underwater visibility can be limited by darkness, turbidity, sediment,
            depth, and water conditions. Side-scan sonar uses acoustic energy to
            produce imagery of the seafloor regardless of visual conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="panel p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-5 h-5 text-abyss-300" />
              <h3 className="text-sm font-bold text-abyss-200 uppercase tracking-wider">
                Underwater Camera
              </h3>
              <span className="badge badge-low">LIMITED</span>
            </div>
            <div className="relative h-48 rounded-sm bg-abyss-950 overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-b from-abyss-800/40 via-abyss-900/60 to-abyss-950" />
              <div className="absolute inset-0 sonar-noise opacity-80" />
              {/* Murky effect */}
              <div className="absolute inset-0 bg-abyss-950/60" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <Eye className="w-8 h-8 text-abyss-600 mx-auto mb-2" />
                <span className="text-[10px] font-mono text-abyss-500 uppercase tracking-wider">Limited Visibility</span>
              </div>
            </div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              Optical cameras depend on light. In turbid or deep water, visibility
              drops to less than a meter, making visual inspection impossible.
            </p>
          </motion.div>

          {/* Sonar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="panel p-6 border-sonar-cyan/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-5 h-5 text-sonar-cyan" />
              <h3 className="text-sm font-bold text-sonar-cyan uppercase tracking-wider">
                Side-Scan Sonar
              </h3>
              <span className="badge badge-safe">EFFECTIVE</span>
            </div>
            <div className="relative h-48 rounded-sm bg-abyss-950 overflow-hidden mb-4">
              {/* Sonar beam visualization */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="beamPort" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beamStar" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Port beam */}
                <polygon points="50,50 0,20 0,80" fill="url(#beamPort)" />
                {/* Starboard beam */}
                <polygon points="50,50 100,20 100,80" fill="url(#beamStar)" />
                {/* AUV shape */}
                <rect x="47" y="48" width="6" height="4" fill="#22d3ee" rx="1" />
                {/* Seafloor returns */}
                <ellipse cx="20" cy="65" rx="5" ry="3" fill="#22d3ee" opacity="0.4" />
                <ellipse cx="75" cy="55" rx="6" ry="3" fill="#22d3ee" opacity="0.35" />
                <ellipse cx="15" cy="40" rx="3" ry="2" fill="#22d3ee" opacity="0.3" />
                {/* Shadows */}
                <rect x="22" y="68" width="3" height="10" fill="#061220" opacity="0.6" />
                <rect x="77" y="58" width="4" height="12" fill="#061220" opacity="0.6" />
              </svg>
              <div className="absolute inset-0 sonar-noise opacity-40" />
              <div className="absolute top-2 right-2 text-[9px] font-mono text-sonar-cyan/60 uppercase tracking-wider">
                Acoustic View
              </div>
            </div>
            <p className="text-xs text-abyss-200 leading-relaxed">
              Side-scan sonar sends acoustic pulses to both sides of the survey
              vehicle, creating detailed imagery of the seafloor regardless of
              water clarity or depth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GhostGearSection() {
  return (
    <section className="relative py-24 bg-abyss-900/50 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-status-crit" />
              <span className="text-label text-status-crit">GHOST GEAR</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight mb-6">
              THE SILENT THREAT
              <br />
              <span className="text-status-crit">BENEATH THE SURFACE</span>
            </h2>
            <p className="text-abyss-200 text-lg leading-relaxed mb-6">
              Lost or abandoned fishing gear can continue interacting with marine
              life and the seafloor long after it leaves active use. These ghost
              nets trap fish, entangle marine mammals, and damage coral reefs —
              continuing to fish without anyone at the other end of the line.
            </p>
            <div className="space-y-3">
              {[
                { label: 'NET STRUCTURE', desc: 'Mesh-like acoustic returns with irregular patterns' },
                { label: 'ACOUSTIC RETURN', desc: 'Extended linear features across the sonar swath' },
                { label: 'SHADOW', desc: 'Diffuse shadow pattern indicating flexible material' },
                { label: 'DETECTION REGION', desc: 'AI flags the area for priority investigation' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1 h-1 rounded-full bg-status-crit mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-status-crit uppercase tracking-wider">{item.label}</span>
                    <p className="text-xs text-abyss-300 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ghost net sonar visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="panel p-4 relative">
              <div className="panel-header mb-3">
                <span className="panel-title">GHOST NET SONAR SIGNATURE</span>
                <span className="badge badge-low">DEMO</span>
              </div>
              <div className="relative h-80 bg-abyss-950 rounded-sm overflow-hidden">
                <div className="absolute inset-0 sonar-noise opacity-50" />
                <div className="absolute inset-0 grid-bg-fine opacity-30" />
                {/* Simulated ghost net */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="netBlur">
                      <feGaussianBlur stdDeviation="0.5" />
                    </filter>
                  </defs>
                  {/* Net mesh pattern */}
                  <g opacity="0.5" filter="url(#netBlur)">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`h${i}`} x1="20" y1={20 + i * 7} x2="80" y2={20 + i * 7} stroke="#22d3ee" strokeWidth="0.3" />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`v${i}`} x1={20 + i * 7.5} y1="20" x2={20 + i * 7.5} y2="75" stroke="#22d3ee" strokeWidth="0.3" />
                    ))}
                  </g>
                  {/* Detection box */}
                  <motion.rect
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    x="18" y="18" width="64" height="60"
                    fill="none" stroke="#f87171" strokeWidth="0.5" strokeDasharray="2 1"
                  />
                  {/* Labels */}
                  <text x="20" y="16" fill="#f87171" fontSize="3" fontFamily="monospace">NET STRUCTURE</text>
                  <text x="50" y="50" fill="#22d3ee" fontSize="2.5" fontFamily="monospace" textAnchor="middle">ACOUSTIC RETURN</text>
                  <text x="82" y="82" fill="#80aab9" fontSize="2.5" fontFamily="monospace">SHADOW</text>
                </svg>
                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-sonar-cyan/40"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                {/* Corner labels */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                  Side-Scan Sonar
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-status-crit uppercase tracking-widest">
                  HIGH PRIORITY
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PipelineSection() {
  const stages = [
    'SURVEY VEHICLE',
    'SIDE-SCAN SONAR',
    'SONAR IMAGE',
    'PREPROCESSING',
    'AI MODEL',
    'FISHING GEAR DETECTION',
    'LOCATION',
    'MISSION RESPONSE',
  ];

  return (
    <section className="relative py-24 bg-abyss-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-label text-sonar-cyan mb-3">SYSTEM ARCHITECTURE</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight">
            FROM SONAR PULSE TO MISSION RESPONSE
          </h2>
        </motion.div>

        <div className="flex flex-col items-stretch gap-2">
          {stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-sonar-cyan">{i + 1}</span>
              </div>
              <div className="flex-1 panel px-4 py-3">
                <span className="text-sm font-mono font-medium text-abyss-100 uppercase tracking-wider">{stage}</span>
              </div>
              {i < stages.length - 1 && (
                <div className="hidden lg:block absolute left-4 -bottom-2 w-px h-2 bg-sonar-cyan/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-32 bg-abyss-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sonar-cyan/5 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-label text-sonar-cyan mb-4">DEEPSENSE</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-abyss-50 tracking-tight mb-6 leading-tight">
            THE NEXT GENERATION OF
            <br />
            UNDERWATER CLEANUP STARTS
            <br />
            WITH <span className="text-sonar-cyan text-glow">SEEING THE PROBLEM.</span>
          </h2>
          <p className="text-abyss-200 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            DeepSense transforms side-scan sonar imagery into actionable
            information, helping survey teams identify and locate lost fishing
            gear beneath the surface.
          </p>
          <Link to="/dashboard" className="btn-primary text-base">
            <Crosshair className="w-5 h-5" />
            Enter Mission Control
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
