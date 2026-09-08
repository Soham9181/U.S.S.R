import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Target, AlertTriangle, Fish, Anchor, Layers, BarChart3, Activity } from 'lucide-react';
import { PageHeader, StatCard, DemoBadge } from '@/components/common/PageComponents';
import { detections } from '@/data/detections';
import { debrisTypes } from '@/data/debrisTypes';

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: '#f87171',
  MEDIUM: '#fbbf24',
  LOW: '#00e5ff',
};

const DEBRIS_COLORS = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#34d399',
  '#22d3ee',
  '#818cf8',
  '#c084fc',
  '#94a3b8',
];

export default function Analytics() {
  // Debris by type
  const byType = debrisTypes.map((t) => {
    const count = detections.filter((d) => d.typeId === t.id).length;
    return { name: t.shortName, count };
  }).filter((d) => d.count > 0);

  // Detection distribution (pie)
  const distribution = byType.map((d, i) => ({
    name: d.name,
    value: d.count,
    color: DEBRIS_COLORS[i % DEBRIS_COLORS.length],
  }));

  // Detections over mission time
  const overTime = detections.map((d, i) => ({
    time: `T+${String(i * 15).padStart(2, '0')}m`,
    detections: i + 1,
  }));

  // Confidence distribution
  const confidenceBuckets = [
    { range: '70-80%', count: detections.filter((d) => d.confidence >= 70 && d.confidence < 80).length },
    { range: '80-85%', count: detections.filter((d) => d.confidence >= 80 && d.confidence < 85).length },
    { range: '85-90%', count: detections.filter((d) => d.confidence >= 85 && d.confidence < 90).length },
    { range: '90-95%', count: detections.filter((d) => d.confidence >= 90 && d.confidence < 95).length },
    { range: '95%+', count: detections.filter((d) => d.confidence >= 95).length },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'High', value: detections.filter((d) => d.priority === 'HIGH').length, color: '#f87171' },
    { name: 'Medium', value: detections.filter((d) => d.priority === 'MEDIUM').length, color: '#fbbf24' },
    { name: 'Low', value: detections.filter((d) => d.priority === 'LOW').length, color: '#00e5ff' },
  ];

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Detection Analytics"
        subtitle="Mission statistics and debris detection breakdown."
        badge="MISSION 07"
      >
        <div className="flex items-center gap-3 mt-3">
          <DemoBadge />
          <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">
            All data is simulated for demonstration
          </span>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Detections" value={detections.length} icon={Target} delay={0} />
        <StatCard label="Ghost Nets" value={detections.filter((d) => d.typeId === 'ghost-net').length} icon={AlertTriangle} color="status-crit" delay={0.1} />
        <StatCard label="Rope / Line" value={detections.filter((d) => d.typeId === 'rope-line' || d.typeId === 'longline').length} icon={Anchor} color="status-warn" delay={0.2} />
        <StatCard label="Traps" value={detections.filter((d) => d.typeId === 'fishing-trap' || d.typeId === 'fishing-cage').length} icon={Fish} color="status-warn" delay={0.3} />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Debris by type - bar chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Debris by Type</span>
            </div>
            <DemoBadge />
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byType} layout="vertical">
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#80aab9" fontSize={9} tickLine={false} axisLine={false} width={80} />
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
                  cursor={{ fill: 'rgba(0,229,255,0.05)' }}
                />
                <Bar dataKey="count" fill="#00e5ff" radius={[0, 2, 2, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detection distribution - donut */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Detection Distribution</span>
            </div>
            <DemoBadge />
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="#0a1d2e" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0a1d2e',
                    border: '1px solid #163d57',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  labelStyle={{ color: '#80aab9' }}
                  itemStyle={{ color: '#d9e6eb' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', color: '#80aab9' }}
                  iconType="circle"
                  iconSize={6}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detections over mission time - line chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Detections Over Mission Time</span>
            </div>
            <DemoBadge />
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overTime}>
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="time" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
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
                <Line type="monotone" dataKey="detections" stroke="#00e5ff" strokeWidth={2} dot={{ fill: '#00e5ff', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence distribution - bar chart */}
        <div className="panel">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-sonar-cyan" />
              <span className="panel-title">Confidence Distribution</span>
            </div>
            <DemoBadge />
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceBuckets}>
                <CartesianGrid stroke="#163d57" strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="range" stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4d88a0" fontSize={9} tickLine={false} axisLine={false} />
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
                  cursor={{ fill: 'rgba(52,211,153,0.05)' }}
                />
                <Bar dataKey="count" fill="#34d399" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Priority breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {priorityData.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="panel p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-label text-abyss-300">{p.name} Priority</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
            <div className="text-3xl font-mono font-bold" style={{ color: p.color }}>{p.value}</div>
            <div className="mt-3 h-1 bg-abyss-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: p.color }}
                initial={{ width: '0%' }}
                animate={{ width: `${(p.value / detections.length) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
            <div className="mt-2 text-[10px] font-mono text-abyss-400">
              {Math.round((p.value / detections.length) * 100)}% of total detections
            </div>
          </motion.div>
        ))}
      </div>

      {/* Demo priority model note */}
      <div className="panel mt-4 p-4 border-status-warn/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-status-warn flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono text-status-warn uppercase tracking-wider mb-1">
              Demo Priority Model
            </div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              Priority levels shown here are based on a simplified demo model using
              confidence scores and debris type. This is not an established scientific
              risk score. A real system would incorporate object size, location sensitivity,
              entanglement potential, and ecological context.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
