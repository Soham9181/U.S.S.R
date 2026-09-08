import { motion } from 'framer-motion';
import {
  Radio,
  Battery,
  Gauge,
  Compass,
  Clock,
  MapPin,
  Activity,
  Thermometer,
  Droplets,
  Waves,
  Anchor,
  Cpu,
  Wifi,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { PageHeader, StatCard, DemoBadge } from '@/components/common/PageComponents';
import {
  useSimulatedTelemetry,
  useDepthHistory,
  useSpeedHistory,
  useBatteryHistory,
} from '@/hooks/useSimulation';

export default function AUVMonitor() {
  const telemetry = useSimulatedTelemetry();
  const depthHistory = useDepthHistory(30);
  const speedHistory = useSpeedHistory(30);
  const batteryHistory = useBatteryHistory(30);

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="AUV Monitor"
        subtitle="Autonomous underwater vehicle telemetry and survey status."
        badge="CONNECTED"
      >
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-safe animate-blink" />
            <span className="text-[10px] font-mono text-status-safe uppercase tracking-wider">AUV-01 Connected</span>
          </div>
          <DemoBadge label="SIMULATED TELEMETRY" />
        </div>
      </PageHeader>

      {/* AUV illustration + key telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* AUV visual */}
        <div className="lg:col-span-1 panel p-6">
          <div className="panel-header px-0 pb-3 mb-4">
            <span className="panel-title">AUV-01 Vehicle</span>
          </div>
          <AUVIllustration />
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">Model</span>
              <span className="text-xs font-mono text-abyss-100">DeepSense Surveyor-1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">Sonar</span>
              <span className="text-xs font-mono text-status-safe">Side-Scan Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">GPS</span>
              <span className="text-xs font-mono text-status-safe">{telemetry.gpsStatus}</span>
            </div>
          </div>
        </div>

        {/* Key telemetry stats */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard label="Depth" value={telemetry.depth.toFixed(1)} unit="m" icon={Anchor} delay={0} />
          <StatCard label="Speed" value={telemetry.speed.toFixed(1)} unit="kn" icon={Gauge} delay={0.05} />
          <StatCard label="Heading" value={telemetry.heading} unit="°" icon={Compass} delay={0.1} />
          <StatCard label="Battery" value={telemetry.battery.toFixed(0)} unit="%" icon={Battery} color={telemetry.battery > 50 ? 'status-safe' : 'status-warn'} delay={0.15} />
          <StatCard label="Mission Time" value={telemetry.missionTime} icon={Clock} delay={0.2} />
          <StatCard label="Area Covered" value={telemetry.areaCovered.toFixed(1)} unit="km²" icon={MapPin} delay={0.25} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Depth chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Depth Profile</span>
            </div>
            <span className="text-[10px] font-mono text-abyss-400">METERS</span>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={depthHistory}>
                <defs>
                  <linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} domain={[30, 50]} />
                <Tooltip
                  contentStyle={{
                    background: '#0a1d2e',
                    border: '1px solid #163d57',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  labelStyle={{ color: '#80aab9' }}
                  itemStyle={{ color: '#00e5ff' }}
                />
                <Area type="monotone" dataKey="depth" stroke="#00e5ff" strokeWidth={1.5} fill="url(#depthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speed chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Speed Profile</span>
            </div>
            <span className="text-[10px] font-mono text-abyss-400">KNOTS</span>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={speedHistory}>
                <defs>
                  <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} domain={[1.5, 3.5]} />
                <Tooltip
                  contentStyle={{
                    background: '#0a1d2e',
                    border: '1px solid #163d57',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  labelStyle={{ color: '#80aab9' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Area type="monotone" dataKey="speed" stroke="#34d399" strokeWidth={1.5} fill="url(#speedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Battery chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Battery Discharge</span>
            </div>
            <span className="text-[10px] font-mono text-abyss-400">PERCENT</span>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={batteryHistory}>
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: '#0a1d2e',
                    border: '1px solid #163d57',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  labelStyle={{ color: '#80aab9' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Line type="monotone" dataKey="battery" stroke="#fbbf24" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Environmental sensors */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Environmental Sensors</span>
            </div>
            <DemoBadge />
          </div>
          <div className="p-4 space-y-4">
            <SensorRow icon={Thermometer} label="Water Temperature" value={telemetry.waterTemp.toFixed(1)} unit="°C" color="text-sonar-cyan" />
            <SensorRow icon={Droplets} label="Salinity" value={telemetry.salinity.toFixed(1)} unit="PSU" color="text-sonar-cyan" />
            <SensorRow icon={Waves} label="Sonar Status" value={telemetry.sonarStatus} unit="" color="text-status-safe" />
            <SensorRow icon={Wifi} label="GPS Lock" value={telemetry.gpsStatus} unit="" color="text-status-safe" />
            <SensorRow icon={Cpu} label="AI Engine" value="STANDBY" unit="" color="text-status-safe" />
            <SensorRow icon={Radio} label="Comms Link" value="ACOUSTIC" unit="" color="text-status-safe" />
          </div>
        </div>
      </div>

      {/* Mission coverage */}
      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sonar-cyan" />
            <span className="panel-title">Mission Coverage</span>
          </div>
          <DemoBadge />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="stat-label mb-1">Total Area</div>
              <div className="text-xl font-mono font-bold text-abyss-50">{telemetry.areaCovered.toFixed(1)} km²</div>
            </div>
            <div>
              <div className="stat-label mb-1">Survey Progress</div>
              <div className="text-xl font-mono font-bold text-sonar-cyan">68%</div>
            </div>
            <div>
              <div className="stat-label mb-1">Line Spacing</div>
              <div className="text-xl font-mono font-bold text-abyss-100">75 m</div>
            </div>
            <div>
              <div className="stat-label mb-1">Swath Width</div>
              <div className="text-xl font-mono font-bold text-abyss-100">50 m</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">Survey Progress</span>
              <span className="text-xs font-mono text-sonar-cyan">68%</span>
            </div>
            <div className="h-1.5 bg-abyss-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sonar-cyan/60 to-sonar-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '68%' }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorRow({ icon: Icon, label, value, unit, color }: { icon: any; label: string; value: string; unit: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-xs font-mono font-semibold ${color}`}>
        {value}{unit && ` ${unit}`}
      </span>
    </div>
  );
}

function AUVIllustration() {
  return (
    <div className="relative h-48 bg-abyss-950 rounded-sm overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-20" />
      <div className="absolute inset-0 sonar-noise opacity-30" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150">
        <defs>
          <linearGradient id="auvBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d6a85" />
            <stop offset="50%" stopColor="#1d5070" />
            <stop offset="100%" stopColor="#163d57" />
          </linearGradient>
          <linearGradient id="sonarBeamL" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sonarBeamR" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sonar beams */}
        <polygon points="100,75 20,30 20,120" fill="url(#sonarBeamL)" opacity="0.5" />
        <polygon points="100,75 180,30 180,120" fill="url(#sonarBeamR)" opacity="0.5" />

        {/* AUV body */}
        <ellipse cx="100" cy="75" rx="50" ry="15" fill="url(#auvBody)" stroke="#22d3ee" strokeWidth="0.5" opacity="0.9" />
        {/* Nose cone */}
        <ellipse cx="155" cy="75" rx="12" ry="10" fill="#1d5070" stroke="#22d3ee" strokeWidth="0.5" />
        {/* Tail */}
        <rect x="38" y="72" width="12" height="6" fill="#163d57" stroke="#22d3ee" strokeWidth="0.3" />
        {/* Fin */}
        <polygon points="44,72 50,60 56,72" fill="#163d57" stroke="#22d3ee" strokeWidth="0.3" />
        {/* Propeller */}
        <line x1="38" y1="68" x2="38" y2="82" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
        {/* Sensor dome */}
        <circle cx="155" cy="75" r="3" fill="#00e5ff" opacity="0.6" />
        {/* Side scan sonar fins */}
        <line x1="90" y1="60" x2="90" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
        <line x1="110" y1="60" x2="110" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
        <rect x="87" y="48" width="6" height="3" fill="#163d57" stroke="#22d3ee" strokeWidth="0.3" opacity="0.6" />
        <rect x="107" y="48" width="6" height="3" fill="#163d57" stroke="#22d3ee" strokeWidth="0.3" opacity="0.6" />

        {/* Depth indicator lines */}
        <line x1="10" y1="130" x2="190" y2="130" stroke="#163d57" strokeWidth="0.3" strokeDasharray="3 2" opacity="0.4" />
        <text x="15" y="128" fill="#4d88a0" fontSize="6" fontFamily="monospace">SEAFLOOR</text>

        {/* Animated sonar pulse */}
        <motion.circle
          cx="100"
          cy="75"
          r="5"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          animate={{ r: [5, 40, 5], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
        AUV-01 Schematic
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-sonar-cyan/60 uppercase tracking-widest">
        Side-Scan Active
      </div>
    </div>
  );
}
