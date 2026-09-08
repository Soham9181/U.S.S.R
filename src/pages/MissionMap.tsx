import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Crosshair, Filter, Search, MapPin, Layers, Radio } from 'lucide-react';
import { PageHeader, DemoBadge, PriorityBadge } from '@/components/common/PageComponents';
import { detections, Detection } from '@/data/detections';
import { currentMission } from '@/data/missions';

import 'leaflet/dist/leaflet.css';

const markerColors: Record<string, string> = {
  HIGH: '#f87171',
  MEDIUM: '#fbbf24',
  LOW: '#00e5ff',
};

export default function MissionMap() {
  const [selected, setSelected] = useState<Detection | null>(detections[0]);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showPath, setShowPath] = useState(true);

  const filtered = detections.filter((d) => {
    if (search && !d.id.toLowerCase().includes(search.toLowerCase()) && !d.type.toLowerCase().includes(search.toLowerCase())) return false;
    if (priorityFilter && d.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Underwater Debris Map"
        subtitle="Geographic distribution of detected fishing-related marine debris."
        badge="LIVE MAP"
      >
        <div className="flex items-center gap-3 mt-3">
          <DemoBadge label="SIMULATED COORDINATES" />
          <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">
            Coastal Sector B — Survey Area
          </span>
        </div>
      </PageHeader>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          {[
            { color: '#f87171', label: 'High Priority', value: 'HIGH' },
            { color: '#fbbf24', label: 'Fishing Debris', value: 'MEDIUM' },
            { color: '#00e5ff', label: 'Low Concern', value: 'LOW' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setPriorityFilter(priorityFilter === item.value ? null : item.value)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border transition-colors ${
                priorityFilter === item.value
                  ? 'bg-abyss-800/50 border-abyss-600/50'
                  : 'border-abyss-700/30 hover:border-abyss-600/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-mono text-abyss-200 uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowPath(!showPath)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border transition-colors ${
            showPath
              ? 'bg-sonar-cyan/10 border-sonar-cyan/30 text-sonar-cyan'
              : 'border-abyss-700/30 text-abyss-400 hover:text-abyss-200'
          }`}
        >
          <Crosshair className="w-3 h-3" />
          <span className="text-[10px] font-mono uppercase tracking-wider">Survey Path</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <div className="panel">
            <div className="panel-header">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sonar-cyan" />
                <span className="panel-title">Mission Map — Sector B-07</span>
              </div>
              <DemoBadge />
            </div>
            <div className="relative h-[500px] lg:h-[600px]">
              <MapContainer
                center={[15.2973, 73.4116]}
                zoom={13}
                className="w-full h-full"
                zoomControl={true}
                attributionControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap'
                />

                {showPath && (
                  <Polyline
                    positions={currentMission.coordinates.map((c) => [c.lat, c.lng])}
                    pathOptions={{ color: '#00e5ff', weight: 2, opacity: 0.4, dashArray: '5 5' }}
                  />
                )}

                {filtered.map((det) => (
                  <CircleMarker
                    key={det.id}
                    center={[det.lat, det.lng]}
                    radius={det.priority === 'HIGH' ? 10 : det.priority === 'MEDIUM' ? 8 : 6}
                    pathOptions={{
                      color: markerColors[det.priority],
                      fillColor: markerColors[det.priority],
                      fillOpacity: 0.3,
                      weight: 1.5,
                    }}
                    eventHandlers={{ click: () => setSelected(det) }}
                  >
                    <Popup>
                      <div className="space-y-1">
                        <div className="text-xs font-mono font-bold text-abyss-50">{det.id}</div>
                        <div className="text-xs text-abyss-200">{det.type}</div>
                        <div className="text-[10px] font-mono text-abyss-400">CONF: {det.confidence}%</div>
                        <div className="text-[10px] font-mono text-abyss-400">DEPTH: {det.depth}m</div>
                        <div className="text-[10px] font-mono text-abyss-400">SECTOR: {det.sector}</div>
                        <div className="text-[10px] font-mono text-abyss-400">PRIORITY: {det.priority}</div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              {/* Overlay info */}
              <div className="absolute top-2 right-2 z-[1000] panel px-3 py-2 pointer-events-none">
                <div className="text-[9px] font-mono text-abyss-400 uppercase tracking-widest mb-1">Survey Area</div>
                <div className="text-xs font-mono text-abyss-100">{currentMission.sector}</div>
                <div className="text-[10px] font-mono text-abyss-300 mt-1">{filtered.length} detections shown</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detection list */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Detections</span>
            <span className="text-[10px] font-mono text-abyss-400">{filtered.length}</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-abyss-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-abyss-900/50 border border-abyss-700/40 rounded-sm pl-8 pr-3 py-1.5 text-xs font-mono text-abyss-100 placeholder:text-abyss-500 focus:outline-none focus:border-sonar-cyan/40"
              />
            </div>
            <div className="h-px bg-abyss-700/30" />
            <div className="space-y-1.5 max-h-[480px] overflow-y-auto">
              {filtered.map((det) => (
                <button
                  key={det.id}
                  onClick={() => setSelected(det)}
                  className={`w-full text-left p-2.5 rounded-sm border transition-all ${
                    selected?.id === det.id
                      ? 'bg-sonar-cyan/10 border-sonar-cyan/30'
                      : 'bg-abyss-900/30 border-abyss-700/20 hover:border-abyss-600/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-abyss-300">{det.id}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: markerColors[det.priority] }} />
                  </div>
                  <div className="text-xs font-medium text-abyss-50 mb-1">{det.type}</div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-abyss-400">
                    <span>{det.confidence}%</span>
                    <span>│</span>
                    <span>{det.depth}m</span>
                    <span>│</span>
                    <span>{det.sector}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected detection detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="panel mt-4"
          >
            <div className="panel-header">
              <span className="panel-title">Detection Detail — {selected.id}</span>
              <DemoBadge />
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
                  <div className="stat-label mb-1">ID</div>
                  <div className="text-sm font-mono text-abyss-50">{selected.id}</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Type</div>
                  <div className="text-sm font-mono text-abyss-50">{selected.type}</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Confidence</div>
                  <div className="text-sm font-mono text-sonar-cyan">{selected.confidence}%</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Depth</div>
                  <div className="text-sm font-mono text-abyss-100">{selected.depth} m</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Coordinates</div>
                  <div className="text-xs font-mono text-abyss-200">
                    {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                  </div>
                </div>
                <div>
                  <div className="stat-label mb-1">Priority</div>
                  <PriorityBadge priority={selected.priority} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="stat-label mb-1">Sector</div>
                  <div className="text-sm font-mono text-abyss-100">{selected.sector}</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Mission</div>
                  <div className="text-sm font-mono text-abyss-100">{selected.missionId}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
