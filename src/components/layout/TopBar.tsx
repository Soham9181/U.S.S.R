import { Link } from 'react-router-dom';
import { Activity, Settings, Radio } from 'lucide-react';
import { useClock, formatUTC } from '@/hooks/useSimulation';
import { currentMission } from '@/data/missions';

export function TopBar() {
  const time = useClock();

  return (
    <header className="sticky top-0 z-30 bg-abyss-950/80 backdrop-blur-sm border-b border-abyss-700/40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-label text-abyss-300">Mission</span>
            <span className="text-sm font-mono font-semibold text-sonar-cyan">
              {currentMission.name}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-label text-abyss-300">Sector</span>
            <span className="text-sm font-mono font-semibold text-abyss-100">
              {currentMission.sector}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-status-crit animate-blink" />
            <span className="text-[10px] font-mono text-status-crit uppercase tracking-widest font-semibold">
              Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          <div className="hidden md:flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-status-safe" />
            <span className="text-[10px] font-mono text-status-safe uppercase tracking-wider">
              AI Engine Online
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-sonar-cyan" />
            <span className="text-[10px] font-mono text-sonar-cyan uppercase tracking-wider">
              Sonar Connected
            </span>
          </div>
          <div className="hidden sm:block text-xs font-mono text-abyss-200 tabular-nums">
            {formatUTC(time)}
          </div>
          <button className="w-8 h-8 rounded-sm bg-abyss-800/50 border border-abyss-700/40 flex items-center justify-center hover:bg-abyss-700/50 transition-colors">
            <Settings className="w-4 h-4 text-abyss-300" />
          </button>
          <Link
            to="/dashboard"
            className="w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center hover:bg-sonar-cyan/20 transition-colors"
          >
            <span className="text-[10px] font-mono font-bold text-sonar-cyan">DS</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
