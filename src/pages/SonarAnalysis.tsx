import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  Upload,
  ScanLine,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Crosshair,
  Download,
  RotateCcw,
  FileImage,
  Loader2,
  Layers,
  Target,
  MapPin,
  Activity,
} from 'lucide-react';
import { PageHeader, DemoBadge, PriorityBadge } from '@/components/common/PageComponents';
import { analyzeSonarImage, processingStages, processingStageDescriptions, AnalysisResult } from '@/services/aiService';

type Phase = 'idle' | 'processing' | 'result';

export default function SonarAnalysis() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentStage, setCurrentStage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    setPhase('processing');
    setCurrentStage(0);

    for (let i = 0; i < processingStages.length; i++) {
      setCurrentStage(i);
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));
    }

    const res = await analyzeSonarImage(null);
    setResult(res);
    setPhase('result');
  };

  const handleReset = () => {
    setPhase('idle');
    setResult(null);
    setFileName(null);
    setCurrentStage(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="AI Sonar Analysis"
        subtitle="Upload side-scan sonar imagery to identify potential fishing-related marine debris."
        badge="PROTOTYPE AI"
      >
        <div className="flex items-center gap-3 mt-3">
          <DemoBadge label="SIMULATED AI OUTPUT" />
          <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">
            No trained model connected — results are simulated for demonstration
          </span>
        </div>
      </PageHeader>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UploadArea
              onAnalyze={handleAnalyze}
              fileInputRef={fileInputRef}
              onFileSelect={handleFileSelect}
              fileName={fileName}
            />
          </motion.div>
        )}

        {phase === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProcessingView currentStage={currentStage} />
          </motion.div>
        )}

        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultView result={result} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UploadArea({
  onAnalyze,
  fileInputRef,
  onFileSelect,
  fileName,
}: {
  onAnalyze: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`relative panel p-12 lg:p-16 text-center transition-all duration-300 ${
          isDragging ? 'border-sonar-cyan/60 bg-sonar-cyan/5' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) {
            onFileSelect({ target: { files: [file] } } as any);
          }
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg-fine opacity-20 rounded-sm" />

        <div className="relative z-10">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 mx-auto mb-6 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center"
          >
            <Upload className="w-8 h-8 text-sonar-cyan" />
          </motion.div>

          <h3 className="text-xl font-bold text-abyss-50 uppercase tracking-wider mb-2">
            Drop Sonar Image Here
          </h3>
          <p className="text-sm text-abyss-300 mb-6">
            or upload sonar data for AI-powered fishing debris detection
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {['JPG', 'PNG', 'TIFF'].map((fmt) => (
              <span key={fmt} className="badge badge-low">{fmt}</span>
            ))}
            <span className="text-[10px] font-mono text-abyss-400">│</span>
            <span className="text-[10px] font-mono text-abyss-400 uppercase tracking-wider">Demo formats</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/tiff"
            onChange={onFileSelect}
            className="hidden"
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
            >
              <FileImage className="w-4 h-4" />
              Upload Sonar Data
            </button>
            <button onClick={onAnalyze} className="btn-primary">
              <ScanLine className="w-4 h-4" />
              Analyze Sonar
            </button>
          </div>

          {fileName && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <FileImage className="w-3.5 h-3.5 text-sonar-cyan" />
              <span className="text-xs font-mono text-abyss-200">{fileName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        {[
          { icon: Layers, title: 'Preprocessing', desc: 'Noise removal & feature enhancement' },
          { icon: Brain, title: 'AI Detection', desc: 'Fishing gear pattern recognition' },
          { icon: Target, title: 'Classification', desc: 'Debris type & confidence scoring' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="panel p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-sonar-cyan" />
                <span className="text-xs font-mono font-semibold text-abyss-100 uppercase tracking-wider">{item.title}</span>
              </div>
              <p className="text-xs text-abyss-300">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProcessingView({ currentStage }: { currentStage: number }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="panel p-8 lg:p-12">
        {/* Animated sonar visualization */}
        <div className="relative h-48 mb-8 bg-abyss-950 rounded-sm overflow-hidden">
          <div className="absolute inset-0 sonar-noise opacity-50" />
          <div className="absolute inset-0 grid-bg-fine opacity-30" />
          {/* Scanning effect */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sonar-cyan to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 20px rgba(0,229,255,0.5)' }}
          />
          {/* Center pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full border border-sonar-cyan/30"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="w-8 h-8 text-sonar-cyan animate-spin" />
            </div>
          </div>
          <div className="absolute top-3 left-3 text-[9px] font-mono text-sonar-cyan/60 uppercase tracking-widest">
            AI Pipeline Active
          </div>
        </div>

        {/* Stage progress */}
        <div className="space-y-2">
          {processingStages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: i <= currentStage ? 1 : 0.3 }}
              className={`flex items-center gap-3 p-2.5 rounded-sm transition-all duration-300 ${
                i === currentStage
                  ? 'bg-sonar-cyan/10 border border-sonar-cyan/20'
                  : i < currentStage
                    ? 'bg-status-safe/5 border border-status-safe/10'
                    : 'border border-transparent'
              }`}
            >
              <div className="flex-shrink-0">
                {i < currentStage ? (
                  <CheckCircle2 className="w-4 h-4 text-status-safe" />
                ) : i === currentStage ? (
                  <Loader2 className="w-4 h-4 text-sonar-cyan animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-abyss-700" />
                )}
              </div>
              <div className="flex-1">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  i <= currentStage ? 'text-abyss-100' : 'text-abyss-500'
                }`}>
                  {stage}
                </span>
                {i === currentStage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-abyss-400 mt-0.5"
                  >
                    {processingStageDescriptions[i]}
                  </motion.p>
                )}
              </div>
              <span className="text-[9px] font-mono text-abyss-500">
                {String(i + 1).padStart(2, '0')}/{String(processingStages.length).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-abyss-300 uppercase tracking-wider">Pipeline Progress</span>
            <span className="text-xs font-mono text-sonar-cyan">
              {Math.round(((currentStage + 1) / processingStages.length) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-abyss-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sonar-cyan/60 to-sonar-cyan"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStage + 1) / processingStages.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultView({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Result header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel"
      >
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-status-safe" />
            <span className="panel-title">Detection Result</span>
          </div>
          <DemoBadge label="PROTOTYPE / SIMULATED AI RESULT" />
        </div>
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sonar image with bounding box */}
            <div className="flex-1">
              <div className="relative h-64 lg:h-80 bg-abyss-950 rounded-sm overflow-hidden">
                <div className="absolute inset-0 sonar-noise opacity-50" />
                <div className="absolute inset-0 grid-bg-fine opacity-30" />
                {/* Simulated object */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="resultBlur">
                      <feGaussianBlur stdDeviation="0.8" />
                    </filter>
                  </defs>
                  {/* Simulated debris return */}
                  <g opacity="0.4" filter="url(#resultBlur)">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <line key={`h${i}`} x1={result.bbox.x + 2} y1={result.bbox.y + 2 + i * (result.bbox.h / 7)} x2={result.bbox.x + result.bbox.w - 2} y2={result.bbox.y + 2 + i * (result.bbox.h / 7)} stroke="#22d3ee" strokeWidth="0.4" />
                    ))}
                  </g>
                  {/* Bounding box */}
                  <motion.rect
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    x={result.bbox.x}
                    y={result.bbox.y}
                    width={result.bbox.w}
                    height={result.bbox.h}
                    fill="none"
                    stroke={result.priority === 'HIGH' ? '#f87171' : result.priority === 'MEDIUM' ? '#fbbf24' : '#00e5ff'}
                    strokeWidth="0.6"
                    strokeDasharray="3 1.5"
                  />
                  {/* Corner markers */}
                  {[
                    [result.bbox.x, result.bbox.y],
                    [result.bbox.x + result.bbox.w, result.bbox.y],
                    [result.bbox.x, result.bbox.y + result.bbox.h],
                    [result.bbox.x + result.bbox.w, result.bbox.y + result.bbox.h],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="0.8" fill={result.priority === 'HIGH' ? '#f87171' : result.priority === 'MEDIUM' ? '#fbbf24' : '#00e5ff'} />
                  ))}
                </svg>
                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-sonar-cyan/30"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute top-2 left-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                  Sonar Image + Detection
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                  DEMO DATA
                </div>
              </div>
            </div>

            {/* Result details */}
            <div className="flex-1 space-y-3">
              <div>
                <div className="stat-label mb-1">Detected Object</div>
                <div className="text-2xl font-bold text-abyss-50">{result.detectionType}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="panel p-3">
                  <div className="stat-label mb-1">Confidence</div>
                  <div className="text-lg font-mono font-bold text-sonar-cyan">{result.confidence}%</div>
                </div>
                <div className="panel p-3">
                  <div className="stat-label mb-1">Est. Depth</div>
                  <div className="text-lg font-mono font-bold text-abyss-100">{result.estimatedDepth} m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="stat-label mb-1">Category</div>
                  <div className="text-xs font-mono text-abyss-200">{result.category}</div>
                </div>
                <div>
                  <div className="stat-label mb-1">Priority</div>
                  <PriorityBadge priority={result.priority} />
                </div>
              </div>

              <div>
                <div className="stat-label mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-status-warn" />
                  <span className="text-xs font-mono text-status-warn">{result.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Object signature */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="panel"
      >
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-sonar-cyan" />
            <span className="panel-title">Object Signature</span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-abyss-200 leading-relaxed">{result.signature}</p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="panel p-4 border-status-warn/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-status-warn flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono text-status-warn uppercase tracking-wider mb-1">
              Prototype / Simulated AI Result
            </div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              This result is generated from simulated data for demonstration purposes.
              No trained AI model is currently connected. When a real model is deployed,
              this interface will display actual detection results from the backend
              inference pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={onReset} className="btn-secondary">
          <RotateCcw className="w-4 h-4" />
          Analyze Another Image
        </button>
        <button className="btn-secondary">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}
