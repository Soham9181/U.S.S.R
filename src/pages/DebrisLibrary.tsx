import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, ShieldAlert, Waves, Anchor, Fish, Layers, Crosshair } from 'lucide-react';
import { debrisTypes, DebrisType } from '@/data/debrisTypes';
import { PageHeader, DemoBadge, PriorityBadge } from '@/components/common/PageComponents';

const iconMap: Record<string, any> = {
  net: ShieldAlert,
  rope: Anchor,
  line: Crosshair,
  trap: Fish,
  cage: Fish,
  hook: Crosshair,
  buoy: Waves,
  metal: Layers,
  other: ShieldAlert,
};

export default function DebrisLibrary() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<DebrisType | null>(debrisTypes[0]);

  const filtered = debrisTypes.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter && d.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Fishing Debris Library"
        subtitle="What the AI is designed to detect — fishing-related marine debris categories."
        badge="10 CATEGORIES"
      >
        <div className="flex items-center gap-3 mt-3">
          <DemoBadge />
          <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">
            Classification categories for AI detection model
          </span>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-abyss-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search debris types..."
            className="w-full bg-abyss-900/50 border border-abyss-700/40 rounded-sm pl-9 pr-3 py-2 text-sm font-mono text-abyss-100 placeholder:text-abyss-500 focus:outline-none focus:border-sonar-cyan/40"
          />
        </div>
        <div className="flex gap-1.5">
          {['HIGH', 'MEDIUM', 'LOW'].map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(riskFilter === r ? null : r)}
              className={`px-3 py-2 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-colors ${
                riskFilter === r
                  ? r === 'HIGH'
                    ? 'bg-status-crit/15 text-status-crit border border-status-crit/30'
                    : r === 'MEDIUM'
                      ? 'bg-status-warn/15 text-status-warn border border-status-warn/30'
                      : 'bg-sonar-cyan/15 text-sonar-cyan border border-sonar-cyan/30'
                  : 'bg-abyss-800/30 text-abyss-400 border border-abyss-700/30 hover:text-abyss-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="space-y-2">
          {filtered.map((debris, i) => {
            const Icon = iconMap[debris.icon] || ShieldAlert;
            return (
              <motion.button
                key={debris.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(debris)}
                className={`w-full text-left panel p-3 transition-all duration-200 ${
                  selected?.id === debris.id
                    ? 'border-sonar-cyan/30 bg-sonar-cyan/5'
                    : 'hover:border-abyss-600/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-abyss-800/50 border border-abyss-700/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-sonar-cyan/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-mono text-abyss-500">{debris.number}</span>
                      <span className="text-xs font-bold text-abyss-50 uppercase tracking-wider truncate">{debris.name}</span>
                    </div>
                    <div className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">{debris.category}</div>
                  </div>
                  <PriorityBadge priority={debris.riskLevel} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail */}
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Header */}
            <div className="panel p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center">
                  {(() => {
                    const Icon = iconMap[selected.icon] || ShieldAlert;
                    return <Icon className="w-7 h-7 text-sonar-cyan" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-abyss-500">{selected.number}</span>
                    <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">{selected.category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-abyss-50 uppercase tracking-wider">{selected.name}</h2>
                </div>
                <div className="ml-auto">
                  <PriorityBadge priority={selected.riskLevel} />
                </div>
              </div>
              <p className="text-sm text-abyss-200 leading-relaxed">{selected.description}</p>
            </div>

            {/* Sonar visualization */}
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Example Sonar Signature</span>
                <DemoBadge />
              </div>
              <div className="p-4">
                <div className="relative h-56 bg-abyss-950 rounded-sm overflow-hidden">
                  <div className="absolute inset-0 sonar-noise opacity-50" />
                  <div className="absolute inset-0 grid-bg-fine opacity-30" />
                  <DebrisSonarViz typeId={selected.id} />
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-sonar-cyan/30"
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                    Simulated Sonar Return
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                    DEMO
                  </div>
                </div>
              </div>
            </div>

            {/* Detection characteristics */}
            <div className="panel p-5">
              <div className="flex items-center gap-2 mb-3">
                <Crosshair className="w-4 h-4 text-sonar-cyan" />
                <span className="panel-title">Detection Characteristics</span>
              </div>
              <p className="text-sm text-abyss-200 leading-relaxed">{selected.sonarCharacteristics}</p>
            </div>

            {/* Risk info */}
            <div className="panel p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-status-warn" />
                <span className="panel-title">Risk Assessment</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <PriorityBadge priority={selected.riskLevel} />
                <span className="text-xs font-mono text-abyss-300">
                  {selected.riskLevel === 'HIGH' && 'High ecological hazard — priority investigation recommended'}
                  {selected.riskLevel === 'MEDIUM' && 'Moderate concern — scheduled monitoring recommended'}
                  {selected.riskLevel === 'LOW' && 'Low immediate risk — routine tracking'}
                </span>
              </div>
              <p className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">
                Note: This is a demo priority model, not an established scientific risk score.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function DebrisSonarViz({ typeId }: { typeId: string }) {
  const renderContent = () => {
    switch (typeId) {
      case 'ghost-net':
      case 'fishing-net':
        return (
          <g opacity="0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="20" y1={20 + i * 7} x2="80" y2={20 + i * 7} stroke="#22d3ee" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={20 + i * 7.5} y1="20" x2={20 + i * 7.5} y2="75" stroke="#22d3ee" strokeWidth="0.3" />
            ))}
          </g>
        );
      case 'rope-line':
        return (
          <g opacity="0.6">
            <path d="M 20 50 Q 35 30, 50 50 T 80 50" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <path d="M 20 55 Q 35 35, 50 55 T 80 55" stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>
        );
      case 'longline':
        return (
          <g opacity="0.6">
            <line x1="10" y1="50" x2="90" y2="50" stroke="#22d3ee" strokeWidth="0.8" />
            {[20, 35, 50, 65, 80].map((x, i) => (
              <circle key={i} cx={x} cy="50" r="1.5" fill="#22d3ee" opacity="0.8" />
            ))}
          </g>
        );
      case 'fishing-trap':
        return (
          <g opacity="0.5">
            <rect x="30" y="35" width="40" height="25" stroke="#22d3ee" strokeWidth="0.8" fill="none" />
            <line x1="30" y1="35" x2="70" y2="60" stroke="#22d3ee" strokeWidth="0.3" />
            <line x1="70" y1="35" x2="30" y2="60" stroke="#22d3ee" strokeWidth="0.3" />
          </g>
        );
      case 'fishing-cage':
        return (
          <g opacity="0.5">
            <rect x="25" y="30" width="50" height="35" stroke="#22d3ee" strokeWidth="0.8" fill="none" />
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`h${i}`} x1="25" y1={30 + i * 9} x2="75" y2={30 + i * 9} stroke="#22d3ee" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`v${i}`} x1={25 + i * 10} y1="30" x2={25 + i * 10} y2="65" stroke="#22d3ee" strokeWidth="0.3" />
            ))}
          </g>
        );
      case 'hook-cluster':
        return (
          <g opacity="0.7">
            {[
              [35, 40], [50, 35], [45, 55], [60, 45], [55, 60], [40, 50],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill="#22d3ee" />
            ))}
          </g>
        );
      case 'buoy-float':
        return (
          <g opacity="0.6">
            <circle cx="50" cy="50" r="12" stroke="#22d3ee" strokeWidth="0.8" fill="#22d3ee" fillOpacity="0.15" />
            <circle cx="50" cy="50" r="8" stroke="#22d3ee" strokeWidth="0.4" fill="none" />
          </g>
        );
      case 'metal-equipment':
        return (
          <g opacity="0.7">
            <polygon points="40,35 60,35 65,50 55,60 45,60 35,50" stroke="#22d3ee" strokeWidth="0.8" fill="#22d3ee" fillOpacity="0.1" />
            <line x1="40" y1="35" x2="60" y2="60" stroke="#22d3ee" strokeWidth="0.3" />
          </g>
        );
      default:
        return (
          <g opacity="0.5">
            <circle cx="50" cy="50" r="15" stroke="#22d3ee" strokeWidth="0.6" fill="none" strokeDasharray="2 1" />
            <circle cx="50" cy="50" r="8" stroke="#22d3ee" strokeWidth="0.4" fill="none" />
          </g>
        );
    }
  };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="debrisBlur">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      <g filter="url(#debrisBlur)">{renderContent()}</g>
    </svg>
  );
}
