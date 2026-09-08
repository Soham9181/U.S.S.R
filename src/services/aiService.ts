export interface AnalysisResult {
  detectionType: string;
  typeId: string;
  confidence: number;
  estimatedDepth: number;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
  description: string;
  signature: string;
  bbox: { x: number; y: number; w: number; h: number };
}

const mockResults: AnalysisResult[] = [
  {
    detectionType: 'Ghost Fishing Net',
    typeId: 'ghost-net',
    confidence: 94.2,
    estimatedDepth: 38.4,
    category: 'Marine Debris / Fishing Gear',
    priority: 'HIGH',
    status: 'POTENTIAL GHOST GEAR',
    description:
      'Extended linear acoustic return with associated shadow pattern consistent with submerged netting.',
    signature:
      'Extended linear acoustic return with associated shadow pattern consistent with submerged netting. Estimated extent 12-15 meters. Mesh-like patterns visible in high-resolution scan.',
    bbox: { x: 30, y: 25, w: 40, h: 30 },
  },
  {
    detectionType: 'Fishing Rope',
    typeId: 'rope-line',
    confidence: 91.7,
    estimatedDepth: 42.1,
    category: 'Marine Debris / Fishing Gear',
    priority: 'MEDIUM',
    status: 'CONFIRMED DEBRIS',
    description: 'Thin elongated linear return with coiled pattern.',
    signature:
      'Thin elongated linear return with coiled configuration. Narrow shadow trail consistent with rope-like debris. Estimated length 6-8 meters.',
    bbox: { x: 55, y: 45, w: 25, h: 15 },
  },
  {
    detectionType: 'Fishing Trap',
    typeId: 'fishing-trap',
    confidence: 88.4,
    estimatedDepth: 31.7,
    category: 'Marine Debris / Fishing Gear',
    priority: 'MEDIUM',
    status: 'CONFIRMED DEBRIS',
    description: 'Compact geometric return with rectangular edges.',
    signature:
      'Compact geometric return with defined edges. Rectangular shape producing sharp well-defined shadow. Consistent with fishing trap structure.',
    bbox: { x: 20, y: 50, w: 18, h: 18 },
  },
  {
    detectionType: 'Fishing Cage',
    typeId: 'fishing-cage',
    confidence: 87.6,
    estimatedDepth: 33.9,
    category: 'Marine Debris / Fishing Gear',
    priority: 'HIGH',
    status: 'CONFIRMED DEBRIS',
    description: 'Large structured return with grid-like patterns.',
    signature:
      'Large structured return with grid-like framework pattern. Complex multi-part shadow indicating internal structure consistent with fishing cage.',
    bbox: { x: 35, y: 25, w: 30, h: 35 },
  },
];

let resultIndex = 0;

export async function analyzeSonarImage(
  _imageData: File | null
): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const result = mockResults[resultIndex % mockResults.length];
  resultIndex++;

  return { ...result };
}

export function resetAnalysisIndex(): void {
  resultIndex = 0;
}

export const processingStages = [
  'INITIALIZING AI ENGINE',
  'PREPROCESSING SONAR IMAGE',
  'REMOVING ACOUSTIC NOISE',
  'ENHANCING SONAR FEATURES',
  'EXTRACTING OBJECT FEATURES',
  'RUNNING FISHING GEAR DETECTION',
  'CLASSIFYING DEBRIS',
  'ESTIMATING DETECTION CONFIDENCE',
  'ANALYSIS COMPLETE',
];

export const processingStageDescriptions = [
  'Loading detection model weights and initializing inference pipeline...',
  'Normalizing acoustic return data and applying sonar-specific corrections...',
  'Applying adaptive filtering to reduce acoustic noise and reverberation artifacts...',
  'Enhancing edge features and contrast for object boundary detection...',
  'Extracting morphological and texture features from candidate regions...',
  'Running object detection model on processed sonar imagery...',
  'Classifying detected objects against fishing gear category database...',
  'Computing detection confidence scores and priority assessment...',
  'Analysis pipeline complete. Results ready for review.',
];
