import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function PageHeader({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-sonar-cyan/60" />
        <h1 className="text-xl lg:text-2xl font-bold text-abyss-50 tracking-tight">{title}</h1>
        {badge && (
          <span className="badge badge-low">{badge}</span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-abyss-300 ml-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  color = 'sonar-cyan',
  delay = 0,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: any;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="panel p-4 relative overflow-hidden group hover:border-abyss-600/50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-label mb-1.5">{label}</div>
          <div className="flex items-baseline gap-1">
            <span className="stat-value">{value}</span>
            {unit && <span className="text-xs font-mono text-abyss-400">{unit}</span>}
          </div>
        </div>
        {Icon && (
          <div className={`w-8 h-8 rounded-sm bg-${color}/10 border border-${color}/20 flex items-center justify-center`}>
            <Icon className={`w-4 h-4 text-${color}`} />
          </div>
        )}
      </div>
      <div className={`absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-${color}/40 to-transparent`} />
    </motion.div>
  );
}

export function DemoBadge({ label = 'DEMO DATA' }: { label?: string }) {
  return (
    <span className="badge badge-low">
      <span className="w-1 h-1 rounded-full bg-status-warn" />
      {label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'HIGH') return <span className="badge badge-high">HIGH</span>;
  if (priority === 'MEDIUM') return <span className="badge badge-medium">MEDIUM</span>;
  return <span className="badge badge-low">LOW</span>;
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px bg-abyss-700/40 flex-1" />
      {label && <span className="text-label-sm text-abyss-400">{label}</span>}
      <div className="h-px bg-abyss-700/40 flex-1" />
    </div>
  );
}
