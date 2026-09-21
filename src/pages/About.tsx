import { motion } from 'framer-motion';
import {
  Radio,
  Waves,
  Brain,
  Crosshair,
  MapPin,
  Target,
  AlertTriangle,
  ArrowRight,
  Camera,
  Eye,
  Cpu,
  Database,
  GitBranch,
  ShieldAlert,
  Layers,
} from 'lucide-react';
import { PageHeader, DemoBadge, SectionDivider } from '@/components/common/PageComponents';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="About Marine Vision"
        subtitle="The technology behind AI-powered fishing debris detection using side-scan sonar."
        badge="TECHNOLOGY"
      />

      {/* What is side-scan sonar */}
      <Section id="what-is-sonar" icon={Radio} title="What is Side-Scan Sonar?">
        <p className="text-sm text-abyss-200 leading-relaxed mb-4">
          Side-scan sonar is an acoustic imaging system that uses sound waves to create
          detailed images of the seafloor. Unlike optical cameras, sonar works in complete
          darkness, turbid water, and at any depth. A side-scan sonar transducer is typically
          towed behind or mounted on an underwater vehicle, sending acoustic pulses outward
          to both sides (port and starboard).
        </p>
        <p className="text-sm text-abyss-200 leading-relaxed">
          When these pulses hit the seafloor or objects on it, they bounce back. The strength
          and timing of the returning echoes create an image — brighter areas indicate hard
          surfaces or objects, while shadows behind objects reveal their shape and height.
          This creates a continuous strip image of the seafloor as the vehicle moves forward.
        </p>
      </Section>

      {/* How sonar creates imagery */}
      <Section id="how-imagery" icon={Waves} title="How Sonar Creates Imagery">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="panel p-4">
            <div className="text-label text-sonar-cyan mb-2">ACOUSTIC PULSE</div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              The sonar transducer sends a fan-shaped acoustic pulse toward the seafloor on
              each side. The pulse spreads outward and downward, covering a wide swath.
            </p>
          </div>
          <div className="panel p-4">
            <div className="text-label text-sonar-cyan mb-2">RETURN ECHO</div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              When the pulse hits an object or the seafloor, acoustic energy reflects back.
              Hard surfaces produce strong returns; soft sediment produces weaker returns.
            </p>
          </div>
          <div className="panel p-4">
            <div className="text-label text-sonar-cyan mb-2">SHADOW FORMATION</div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              Objects that rise above the seafloor block the acoustic pulse behind them,
              creating a shadow. The shadow length reveals the object's height.
            </p>
          </div>
          <div className="panel p-4">
            <div className="text-label text-sonar-cyan mb-2">IMAGE CONSTRUCTION</div>
            <p className="text-xs text-abyss-300 leading-relaxed">
              As the vehicle moves forward, successive pulse returns are assembled into a
              continuous strip image of the seafloor — a sonogram.
            </p>
          </div>
        </div>
      </Section>

      {/* Why fishing gear appears in sonar */}
      <Section id="why-gear-appears" icon={Crosshair} title="Why Fishing Gear Appears in Sonar">
        <p className="text-sm text-abyss-200 leading-relaxed mb-4">
          Fishing gear is often detectable in sonar imagery because it has physical properties
          that differ from the natural seafloor:
        </p>
        <div className="space-y-2">
          {[
            { label: 'ACOUSTIC CONTRAST', desc: 'Metal hooks, chains, and hardware produce very bright returns compared to sediment.' },
            { label: 'GEOMETRIC PATTERNS', desc: 'Net mesh, trap frames, and cage structures create regular geometric patterns not found in nature.' },
            { label: 'EXTENDED SHAPES', desc: 'Ropes, lines, and nets form long linear or sheet-like features across the sonar swath.' },
            { label: 'SHADOW SIGNATURES', desc: 'Traps and cages cast distinct shadows that reveal their three-dimensional structure.' },
            { label: 'TEXTURE DIFFERENCES', desc: 'Netting produces a characteristic texture that differs from rocky or sedimentary seabed.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 panel p-3"
            >
              <div className="w-1 h-1 rounded-full bg-sonar-cyan mt-2 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-sonar-cyan uppercase tracking-wider">{item.label}</span>
                <p className="text-xs text-abyss-300 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How AI detects debris */}
      <Section id="how-ai-detects" icon={Brain} title="How AI Detects Marine Debris">
        <p className="text-sm text-abyss-200 leading-relaxed mb-4">
          Marine Vision is designed to use computer vision and machine learning to analyze sonar
          imagery for fishing-related debris. The AI pipeline involves:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: Layers, title: 'Preprocessing', desc: 'Noise reduction, contrast enhancement, and normalization of sonar imagery.' },
            { icon: Cpu, title: 'Feature Extraction', desc: 'Morphological and texture features extracted from candidate regions.' },
            { icon: Crosshair, title: 'Detection', desc: 'Object detection model identifies candidate debris regions.' },
            { icon: Brain, title: 'Classification', desc: 'Classifier estimates the type of fishing debris in each detection.' },
            { icon: Target, title: 'Confidence', desc: 'Confidence score computed for each detection based on model certainty.' },
            { icon: MapPin, title: 'Localization', desc: 'Detection is geo-referenced using survey position and depth estimates.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="panel p-4"
              >
                <Icon className="w-5 h-5 text-sonar-cyan mb-2" />
                <div className="text-xs font-mono font-semibold text-abyss-100 uppercase tracking-wider mb-1">{item.title}</div>
                <p className="text-xs text-abyss-300">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Detection to localization pipeline */}
      <Section id="pipeline" icon={GitBranch} title="Detection → Localization → Prioritization">
        <div className="flex flex-col gap-2">
          {[
            'SURVEY VEHICLE',
            'SIDE-SCAN SONAR',
            'SONAR IMAGE',
            'PREPROCESSING',
            'AI MODEL',
            'FISHING GEAR DETECTION',
            'LOCATION',
            'MISSION RESPONSE',
          ].map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-sonar-cyan">{i + 1}</span>
              </div>
              <div className="flex-1 panel px-4 py-2.5">
                <span className="text-sm font-mono font-medium text-abyss-100 uppercase tracking-wider">{stage}</span>
              </div>
              {i < 7 && <ArrowRight className="w-3 h-3 text-abyss-600 rotate-90" />}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Future model architecture */}
      <Section id="future-models" icon={Database} title="Future AI Model Architecture">
        <p className="text-sm text-abyss-200 leading-relaxed mb-4">
          Marine Vision is designed to accommodate future AI model integration. The UI is compatible
          with architectures such as:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Object Detection', desc: 'YOLO or similar detection architecture for real-time debris localization.', models: 'YOLOv8, RT-DETR' },
            { title: 'Classification', desc: 'CNN-based classifiers for debris type identification.', models: 'ResNet, EfficientNet' },
            { title: 'Segmentation', desc: 'Pixel-level segmentation for debris boundary mapping.', models: 'U-Net, DeepLab' },
            { title: 'Anomaly Detection', desc: 'Unsupervised detection of unusual seafloor features.', models: 'Autoencoder, VAE' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="panel p-4"
            >
              <div className="text-xs font-mono font-semibold text-abyss-100 uppercase tracking-wider mb-1">{item.title}</div>
              <p className="text-xs text-abyss-300 mb-2">{item.desc}</p>
              <div className="text-[10px] font-mono text-sonar-cyan/60 uppercase tracking-wider">{item.models}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 panel p-3 border-status-warn/20">
          <p className="text-[10px] font-mono text-status-warn uppercase tracking-wider">
            Note: No AI model is currently connected. These are candidate architectures for future deployment.
          </p>
        </div>
      </Section>

      {/* Limitations */}
      <Section id="limitations" icon={ShieldAlert} title="Limitations">
        <div className="space-y-2">
          {[
            'Sonar imagery can contain noise from acoustic interference, vessel motion, and environmental conditions.',
            'Rocks and natural seabed structures may visually resemble fishing debris, leading to false positives.',
            'Different seabed types (rocky, sandy, muddy) can significantly change how debris appears in sonar.',
            'Fishing gear may be partially buried in sediment, reducing its acoustic signature.',
            'Detection confidence depends heavily on image quality, sonar frequency, and survey speed.',
            'Training data availability for fishing debris in sonar imagery is a major challenge.',
            'Exact object identification may require additional sensors (optical, multibeam) or human verification.',
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 panel p-3"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-status-warn flex-shrink-0 mt-0.5" />
              <p className="text-xs text-abyss-300 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Future development */}
      <Section id="future-dev" icon={ArrowRight} title="Future Development">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Integration with a trained PyTorch/TensorFlow model for real debris detection.',
            'Real-time onboard AUV processing for autonomous debris flagging.',
            'Multi-sensor fusion combining sonar, optical, and multibeam data.',
            'Collaborative debris database for cross-mission data sharing.',
            'Automated debris removal mission planning and routing.',
            'Integration with fisheries authorities and environmental agencies.',
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 panel p-3"
            >
              <div className="w-1 h-1 rounded-full bg-sonar-cyan mt-2 flex-shrink-0" />
              <p className="text-xs text-abyss-300">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link to="/dashboard" className="btn-primary">
          <Crosshair className="w-4 h-4" />
          Enter Mission Control
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function Section({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/30 flex items-center justify-center">
          <Icon className="w-4 h-4 text-sonar-cyan" />
        </div>
        <h2 className="text-lg lg:text-xl font-bold text-abyss-50 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="ml-11">{children}</div>
    </motion.section>
  );
}
