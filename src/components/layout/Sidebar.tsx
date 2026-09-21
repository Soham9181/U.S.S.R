import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Library,
  MapPin,
  Radio,
  BarChart3,
  Info,
  Waves,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', label: 'Mission Control', icon: LayoutDashboard },
  { to: '/sonar-analysis', label: 'Sonar Analysis', icon: ScanLine },
  { to: '/debris-library', label: 'Debris Library', icon: Library },
  { to: '/mission-map', label: 'Mission Map', icon: MapPin },
  { to: '/auv-monitor', label: 'AUV Monitor', icon: Radio },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/about', label: 'About', icon: Info },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-abyss-950/80 border-r border-abyss-700/40 h-screen sticky top-0 z-40">
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-abyss-700/40">
        <div className="relative">
          <div className="w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/40 flex items-center justify-center">
            <Waves className="w-4 h-4 text-sonar-cyan" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-status-safe animate-blink" />
        </div>
        <div>
          <div className="text-sm font-bold text-abyss-50 tracking-wider">MARINE VISION</div>
          <div className="text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
            Marine Debris AI
          </div>
        </div>
      </Link>

      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        <div className="text-label-sm text-abyss-400 px-3 pb-2 pt-1">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-abyss-700/40 space-y-2">
        <div className="text-label-sm text-abyss-400 px-1 pb-1">System Status</div>
        {[
          { label: 'Sonar Online', color: 'bg-status-safe' },
          { label: 'AI Engine Ready', color: 'bg-status-safe' },
          { label: 'AUV Connected', color: 'bg-status-safe' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 px-1">
            <span className={`w-1.5 h-1.5 rounded-full ${s.color} animate-blink`} />
            <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">
              {s.label}
            </span>
          </div>
        ))}
        <div className="pt-2 mt-1 border-t border-abyss-700/30">
          <div className="flex items-center gap-1.5 px-1">
            <span className="text-[9px] font-mono text-status-warn uppercase tracking-widest">
              Demo Mode
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 right-3 z-50 w-10 h-10 rounded-sm bg-abyss-900/90 border border-abyss-700/50 flex items-center justify-center"
      >
        {isOpen ? <X className="w-5 h-5 text-sonar-cyan" /> : <Menu className="w-5 h-5 text-sonar-cyan" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="lg:hidden fixed inset-y-0 right-0 w-64 bg-abyss-950/95 border-l border-abyss-700/40 z-40 pt-16 pb-4 overflow-y-auto"
          >
            <nav className="px-2 space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                    }
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="px-4 py-3 mt-4 border-t border-abyss-700/40 space-y-2">
              {[
                { label: 'Sonar Online', color: 'bg-status-safe' },
                { label: 'AI Engine Ready', color: 'bg-status-safe' },
                { label: 'AUV Connected', color: 'bg-status-safe' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.color} animate-blink`} />
                  <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
