import { motion } from 'framer-motion';
import { Detection } from '@/data/detections';
import { useState, useRef, useEffect } from 'react';

interface SonarPanelProps {
  detections?: Detection[];
  selectedDetection?: Detection | null;
  onSelectDetection?: (d: Detection) => void;
  showDetections?: boolean;
  showLabels?: boolean;
  showSonarImage?: boolean;
  height?: string;
  showSweep?: boolean;
  showScanLine?: boolean;
  sensitivity?: number;
}

export function SonarPanel({
  detections = [],
  selectedDetection = null,
  onSelectDetection,
  showDetections = true,
  showLabels = true,
  showSonarImage = true,
  height = 'h-full',
  showSweep = true,
  showScanLine = true,
  sensitivity = 75,
}: SonarPanelProps) {
  return (
    <div className={`relative ${height} bg-abyss-950 overflow-hidden rounded-sm`}>
      {/* Sonar background texture */}
      {showSonarImage && (
        <div className="absolute inset-0">
          <SonarTexture />
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-fine opacity-40" />

      {/* Scan line animation */}
      {showScanLine && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sonar-cyan/60 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 10px rgba(0,229,255,0.4)' }}
          />
        </div>
      )}

      {/* Sonar sweep */}
      {showSweep && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SonarSweep />
        </div>
      )}

      {/* Detection overlays */}
      {showDetections &&
        detections.map((det, idx) => (
          <DetectionBox
            key={det.id}
            detection={det}
            isSelected={selectedDetection?.id === det.id}
            showLabel={showLabels}
            onClick={() => onSelectDetection?.(det)}
            delay={idx * 0.15}
            sensitivity={sensitivity}
          />
        ))}

      {/* Corner labels */}
      <div className="absolute top-3 left-3 text-[9px] font-mono text-abyss-400 uppercase tracking-widest pointer-events-none">
        Side-Scan Sonar
      </div>
      <div className="absolute top-3 right-3 text-[9px] font-mono text-abyss-400 uppercase tracking-widest pointer-events-none">
        DEMO DATA
      </div>
      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-abyss-400 uppercase tracking-widest pointer-events-none">
        Port │ Starboard
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-abyss-400 uppercase tracking-widest pointer-events-none">
        Range: 50m
      </div>

      {/* Crosshair center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-6 h-px bg-sonar-cyan/20" />
        <div className="h-6 w-px bg-sonar-cyan/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

function SonarTexture() {
  return (
    <div className="absolute inset-0">
      {/* Base dark seabed */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950 via-abyss-900 to-abyss-950" />

      {/* Sonar noise texture */}
      <div className="absolute inset-0 sonar-noise opacity-60" />

      {/* Simulated seafloor texture - port side */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="sonarReturn" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <filter id="blur1">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          {/* Nadir line (center) */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#22d3ee" strokeWidth="0.15" opacity="0.3" />
          {/* Seafloor texture - port */}
          <ellipse cx="25" cy="60" rx="15" ry="8" fill="#1d5070" opacity="0.2" filter="url(#blur1)" />
          <ellipse cx="35" cy="40" rx="10" ry="6" fill="#2d6a85" opacity="0.15" filter="url(#blur1)" />
          {/* Seafloor texture - starboard */}
          <ellipse cx="70" cy="55" rx="18" ry="10" fill="#1d5070" opacity="0.2" filter="url(#blur1)" />
          <ellipse cx="80" cy="35" rx="12" ry="7" fill="#2d6a85" opacity="0.15" filter="url(#blur1)" />
          {/* Bright returns */}
          <ellipse cx="30" cy="50" rx="3" ry="2" fill="#22d3ee" opacity="0.4" filter="url(#blur1)" />
          <ellipse cx="72" cy="45" rx="4" ry="2.5" fill="#22d3ee" opacity="0.35" filter="url(#blur1)" />
          {/* Acoustic shadows */}
          <rect x="32" y="52" width="4" height="15" fill="#061220" opacity="0.5" filter="url(#blur1)" />
          <rect x="74" y="47" width="5" height="18" fill="#061220" opacity="0.5" filter="url(#blur1)" />
        </svg>
      </div>

      {/* Subtle horizontal bands (scan lines) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(34,211,238,0.05) 3px, rgba(34,211,238,0.05) 4px)',
        }}
      />
    </div>
  );
}

function SonarSweep() {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sonar-cyan/5 to-transparent" />
    </motion.div>
  );
}

function DetectionBox({
  detection,
  isSelected,
  showLabel,
  onClick,
  delay,
  sensitivity,
}: {
  detection: Detection;
  isSelected: boolean;
  showLabel: boolean;
  onClick: () => void;
  delay: number;
  sensitivity: number;
}) {
  const { bbox, priority, confidence, depth, id, type } = detection;

  const color =
    priority === 'HIGH'
      ? 'border-status-crit'
      : priority === 'MEDIUM'
        ? 'border-status-warn'
        : 'border-sonar-cyan';

  const glowColor =
    priority === 'HIGH'
      ? 'shadow-[0_0_15px_rgba(248,113,113,0.3)]'
      : priority === 'MEDIUM'
        ? 'shadow-[0_0_15px_rgba(251,191,36,0.3)]'
        : 'shadow-[0_0_15px_rgba(0,229,255,0.3)]';

  const visible = confidence >= sensitivity - 20;

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`absolute cursor-pointer ${color} ${glowColor} ${isSelected ? 'border-2' : 'border'}`}
      style={{
        left: `${bbox.x}%`,
        top: `${bbox.y}%`,
        width: `${bbox.w}%`,
        height: `${bbox.h}%`,
        borderRadius: '2px',
        background: isSelected
          ? priority === 'HIGH'
            ? 'rgba(248,113,113,0.08)'
            : priority === 'MEDIUM'
              ? 'rgba(251,191,36,0.08)'
              : 'rgba(0,229,255,0.08)'
          : 'transparent',
      }}
      onClick={onClick}
    >
      {/* Corner markers */}
      <span className={`absolute -top-px -left-px w-2 h-2 border-t border-l ${color}`} />
      <span className={`absolute -top-px -right-px w-2 h-2 border-t border-r ${color}`} />
      <span className={`absolute -bottom-px -left-px w-2 h-2 border-b border-l ${color}`} />
      <span className={`absolute -bottom-px -right-px w-2 h-2 border-b border-r ${color}`} />

      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
          className={`absolute -top-7 left-0 whitespace-nowrap text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
            priority === 'HIGH'
              ? 'bg-status-crit/20 text-status-crit border border-status-crit/40'
              : priority === 'MEDIUM'
                ? 'bg-status-warn/20 text-status-warn border border-status-warn/40'
                : 'bg-sonar-cyan/20 text-sonar-cyan border border-sonar-cyan/40'
          }`}
        >
          {id} │ {type}
        </motion.div>
      )}

      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-12 left-0 whitespace-nowrap panel px-2 py-1.5 space-y-0.5"
        >
          <div className="text-[9px] font-mono text-abyss-200">
            <span className="text-abyss-400">CONF:</span> {confidence}%
          </div>
          <div className="text-[9px] font-mono text-abyss-200">
            <span className="text-abyss-400">DEPTH:</span> {depth}m
          </div>
          <div className="text-[9px] font-mono text-abyss-200">
            <span className="text-abyss-400">ID:</span> {id}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function CircularSonar({ size = 320 }: { size?: number }) {
  const [sweepAngle, setSweepAngle] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let last = 0;
    const animate = (time: number) => {
      if (time - last > 16) {
        setSweepAngle((prev) => (prev + 1.5) % 360);
        last = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const targets = [
    { angle: 45, dist: 0.35, label: 'GHOST NET', conf: '94%', delay: 0 },
    { angle: 135, dist: 0.5, label: 'FISHING ROPE', conf: '91%', delay: 800 },
    { angle: 220, dist: 0.3, label: 'FISHING TRAP', conf: '88%', delay: 1600 },
    { angle: 310, dist: 0.55, label: 'BUOY', conf: '86%', delay: 2400 },
  ];

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="circularSonarBg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#0a2838" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#061220" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="url(#circularSonarBg)" stroke="#163d57" strokeWidth="0.3" />

        {/* Range rings */}
        {[12, 24, 36, 48].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#163d57"
            strokeWidth="0.15"
            opacity="0.5"
          />
        ))}

        {/* Crosshair lines */}
        <line x1="2" y1="50" x2="98" y2="50" stroke="#163d57" strokeWidth="0.15" opacity="0.4" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="#163d57" strokeWidth="0.15" opacity="0.4" />

        {/* Bearing marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 46 * Math.cos(rad);
          const y1 = 50 + 46 * Math.sin(rad);
          const x2 = 50 + 48 * Math.cos(rad);
          const y2 = 50 + 48 * Math.sin(rad);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#22d3ee"
              strokeWidth="0.3"
              opacity="0.4"
            />
          );
        })}

        {/* Sweep beam */}
        <g transform={`rotate(${sweepAngle} 50 50)`}>
          <path d="M 50 50 L 98 50 A 48 48 0 0 0 50 2 Z" fill="url(#sweepGrad)" opacity="0.3" />
          <line x1="50" y1="50" x2="98" y2="50" stroke="#00e5ff" strokeWidth="0.4" opacity="0.8" />
        </g>

        {/* Detection targets */}
        {targets.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 50 + t.dist * 48 * Math.cos(rad);
          const y = 50 + t.dist * 48 * Math.sin(rad);
          const angleDiff = ((sweepAngle - t.angle + 360) % 360);
          const visible = angleDiff < 60 || angleDiff > 300;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="1.5"
                fill={i === 0 ? '#f87171' : i === 3 ? '#4cc7de' : '#fbbf24'}
                opacity={visible ? 0.9 : 0.3}
                className="transition-opacity duration-500"
              />
              <circle
                cx={x}
                cy={y}
                r="2.5"
                fill="none"
                stroke={i === 0 ? '#f87171' : i === 3 ? '#4cc7de' : '#fbbf24'}
                strokeWidth="0.2"
                opacity={visible ? 0.6 : 0.15}
                className="transition-opacity duration-500"
              />
            </g>
          );
        })}
      </svg>

      {/* Labels */}
      {targets.map((t, i) => {
        const rad = (t.angle * Math.PI) / 180;
        const x = 50 + t.dist * 48 * Math.cos(rad);
        const y = 50 + t.dist * 48 * Math.sin(rad);
        const angleDiff = ((sweepAngle - t.angle + 360) % 360);
        const visible = angleDiff < 60 || angleDiff > 300;
        const color = i === 0 ? 'text-status-crit' : i === 3 ? 'text-sonar-cyan' : 'text-status-warn';
        return (
          <div
            key={i}
            className="absolute pointer-events-none transition-opacity duration-500"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: visible ? 1 : 0,
            }}
          >
            <div className={`text-[8px] font-mono uppercase tracking-wider ${color} whitespace-nowrap`}>
              {t.label} {t.conf}
            </div>
          </div>
        );
      })}

      {/* Center indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rounded-full bg-sonar-cyan animate-sonar-pulse" />
      </div>
    </div>
  );
}
