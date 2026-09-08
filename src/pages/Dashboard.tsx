import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Activity,
  Map,
  Target,
  AlertTriangle,
  Radio,
  Eye,
  EyeOff,
  Tag,
  Gauge,
  Crosshair,
  ArrowRight,
  Filter,
  Search,
  Download,
} from 'lucide-react';
import { useState } from 'react';
import { SonarPanel } from '@/components/sonar/SonarPanel';
import { PageHeader, StatCard, DemoBadge, PriorityBadge } from '@/components/common/PageComponents';
import { detections, Detection } from '@/data/detections';
import { missionStats, currentMission } from '@/data/missions';
import { useDetection } from '@/hooks/useDetection';

export default function Dashboard() {
  const {
    selectedDetection,
    selectDetection,
    filteredDetections,
    showDetections,
    setShowDetections,
    showLabels,
    setShowLabels,
    showSonarImage,
    setShowSonarImage,
    sensitivity,
    setSensitivity,
  } = useDetection();

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Mission Control"
        subtitle="Autonomous survey active — Coastal Sector B"
        badge="LIVE"
      >
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-safe animate-blink" />
            <span className="text-[10px] font-mono text-status-safe uppercase tracking-wider">System Online</span>
          </div>
          <span className="text-abyss-600">│</span>
          <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">{currentMission.name}</span>
          <span className="text-abyss-600">│</span>
          <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">{currentMission.surveyType}</span>
          <span className="text-abyss-600">│</span>
          <span className="text-[10px] font-mono text-status-crit uppercase tracking-wider">{currentMission.status}</span>
          <DemoBadge />
        </div>
      </PageHeader>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Area Scanned" value={missionStats.areaScanned} unit="km²" icon={Map} delay={0} />
        <StatCard label="Debris Detected" value={missionStats.debrisDetected} icon={Target} color="status-warn" delay={0.1} />
        <StatCard label="Ghost Nets" value={missionStats.ghostNets} icon={AlertTriangle} color="status-crit" delay={0.2} />
        <StatCard label="High Priority" value={missionStats.highPriority} icon={Activity} color="status-crit" delay={0.3} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sonar Panel - 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="panel">
            <div className="panel-header">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-sonar-cyan" />
                <span className="panel-title">Live Side-Scan Sonar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-status-safe animate-blink ml-1" />
              </div>
              <div className="flex items-center gap-1.5">
                <ToggleChip active={showSonarImage} onClick={() => setShowSonarImage(!showSonarImage)} icon={showSonarImage ? Eye : EyeOff} label="Image" />
                <ToggleChip active={showDetections} onClick={() => setShowDetections(!showDetections)} icon={Crosshair} label="Detections" />
                <ToggleChip active={showLabels} onClick={() => setShowLabels(!showLabels)} icon={Tag} label="Labels" />
              </div>
            </div>
            <div className="p-4">
              <div className="relative h-[400px] lg:h-[500px]">
                <SonarPanel
                  detections={filteredDetections}
                  selectedDetection={selectedDetection}
                  onSelectDetection={selectDetection}
                  showDetections={showDetections}
                  showLabels={showLabels}
                  showSonarImage={showSonarImage}
                  sensitivity={sensitivity}
                />
              </div>

              {/* Sensitivity slider */}
              <div className="mt-4 flex items-center gap-4">
                <Gauge className="w-4 h-4 text-abyss-300 flex-shrink-0" />
                <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider flex-shrink-0">Sensitivity</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="flex-1 accent-sonar-cyan"
                />
                <span className="text-xs font-mono text-sonar-cyan w-10 text-right">{sensitivity}%</span>
              </div>
            </div>
          </div>

          {/* Selected Detection Detail */}
          {selectedDetection && (
            <motion.div
              key={selectedDetection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="panel"
            >
              <div className="panel-header">
                <span className="panel-title">Detection Detail — {selectedDetection.id}</span>
                <DemoBadge />
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="stat-label mb-1">Type</div>
                    <div className="text-sm font-mono text-abyss-50">{selectedDetection.type}</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Confidence</div>
                    <div className="text-sm font-mono text-sonar-cyan">{selectedDetection.confidence}%</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Depth</div>
                    <div className="text-sm font-mono text-abyss-100">{selectedDetection.depth} m</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Priority</div>
                    <PriorityBadge priority={selectedDetection.priority} />
                  </div>
                  <div>
                    <div className="stat-label mb-1">Sector</div>
                    <div className="text-sm font-mono text-abyss-100">{selectedDetection.sector}</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Status</div>
                    <div className="text-sm font-mono text-status-warn">{selectedDetection.status}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="stat-label mb-1">Object Signature</div>
                    <p className="text-xs text-abyss-300 leading-relaxed">{selectedDetection.signature}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="/mission-map" className="btn-secondary text-xs">
                    <Map className="w-3.5 h-3.5" />
                    View on Map
                  </Link>
                  <Link to="/sonar-analysis" className="btn-secondary text-xs">
                    <Crosshair className="w-3.5 h-3.5" />
                    Analyze Further
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Detection Feed - 1 col */}
        <div className="space-y-4">
          <DetectionFeed
            detections={filteredDetections}
            selectedId={selectedDetection?.id}
            onSelect={selectDetection}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleChip({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-colors ${
        active
          ? 'bg-sonar-cyan/15 text-sonar-cyan border border-sonar-cyan/30'
          : 'bg-abyss-800/30 text-abyss-400 border border-abyss-700/30 hover:text-abyss-200'
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

function DetectionFeed({
  detections: dets,
  selectedId,
  onSelect,
}: {
  detections: Detection[];
  selectedId?: string;
  onSelect: (d: Detection) => void;
}) {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const filtered = dets.filter((d) => {
    if (search && !d.id.toLowerCase().includes(search.toLowerCase()) && !d.type.toLowerCase().includes(search.toLowerCase())) return false;
    if (priorityFilter && d.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sonar-cyan" />
          <span className="panel-title">Recent Detections</span>
        </div>
        <span className="text-[10px] font-mono text-abyss-400">{filtered.length} ITEMS</span>
      </div>

      <div className="p-3 space-y-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-abyss-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search detections..."
            className="w-full bg-abyss-900/50 border border-abyss-700/40 rounded-sm pl-8 pr-3 py-1.5 text-xs font-mono text-abyss-100 placeholder:text-abyss-500 focus:outline-none focus:border-sonar-cyan/40"
          />
        </div>

        {/* Priority filter */}
        <div className="flex gap-1.5">
          {['HIGH', 'MEDIUM', 'LOW'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(priorityFilter === p ? null : p)}
              className={`flex-1 px-2 py-1 rounded-sm text-[9px] font-mono uppercase tracking-wider transition-colors ${
                priorityFilter === p
                  ? p === 'HIGH'
                    ? 'bg-status-crit/15 text-status-crit border border-status-crit/30'
                    : p === 'MEDIUM'
                      ? 'bg-status-warn/15 text-status-warn border border-status-warn/30'
                      : 'bg-sonar-cyan/15 text-sonar-cyan border border-sonar-cyan/30'
                  : 'bg-abyss-800/30 text-abyss-400 border border-abyss-700/30 hover:text-abyss-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="h-px bg-abyss-700/30" />

        {/* Detection list */}
        <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
          {filtered.map((det, i) => (
            <motion.button
              key={det.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onSelect(det)}
              className={`w-full text-left p-2.5 rounded-sm border transition-all duration-200 ${
                selectedId === det.id
                  ? 'bg-sonar-cyan/10 border-sonar-cyan/30'
                  : 'bg-abyss-900/30 border-abyss-700/20 hover:border-abyss-600/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-abyss-300">{det.id}</span>
                <PriorityBadge priority={det.priority} />
              </div>
              <div className="text-xs font-medium text-abyss-50 mb-1">{det.type}</div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-abyss-400">
                <span>{det.confidence}%</span>
                <span>│</span>
                <span>{det.depth}m</span>
                <span>│</span>
                <span>{det.sector}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
