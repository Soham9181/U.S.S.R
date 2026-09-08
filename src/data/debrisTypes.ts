export interface DebrisType {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  sonarCharacteristics: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  riskColor: string;
  icon: string;
}

export const debrisTypes: DebrisType[] = [
  {
    id: 'ghost-net',
    number: '01',
    name: 'Ghost Net',
    shortName: 'Ghost Net',
    category: 'Ghost Gear',
    description:
      'Lost or abandoned fishing nets that continue trapping marine life without human control. The most destructive form of fishing debris.',
    sonarCharacteristics:
      'Extended linear acoustic returns with irregular mesh-like patterns. Often produces elongated shadows with diffuse edges.',
    riskLevel: 'HIGH',
    riskColor: '#f87171',
    icon: 'net',
  },
  {
    id: 'fishing-net',
    number: '02',
    name: 'Fishing Net',
    shortName: 'Fishing Net',
    category: 'Netting',
    description:
      'Discarded or lost fishing nets of various types including gillnets, trawl nets, and seine nets found on the seafloor.',
    sonarCharacteristics:
      'Sheet-like acoustic return with varying density. May show regular geometric patterns depending on mesh size.',
    riskLevel: 'HIGH',
    riskColor: '#f87171',
    icon: 'net',
  },
  {
    id: 'rope-line',
    number: '03',
    name: 'Rope / Line',
    shortName: 'Rope',
    category: 'Lines',
    description:
      'Submerged ropes and lines that can entangle wildlife and interfere with underwater operations and navigation.',
    sonarCharacteristics:
      'Thin elongated linear returns. May appear as curved or coiled patterns. Produces narrow but distinct shadows.',
    riskLevel: 'MEDIUM',
    riskColor: '#fbbf24',
    icon: 'rope',
  },
  {
    id: 'longline',
    number: '04',
    name: 'Longline',
    shortName: 'Longline',
    category: 'Lines',
    description:
      'Main fishing lines with multiple branch lines and hooks. Can extend for kilometers along the seafloor.',
    sonarCharacteristics:
      'Very long linear returns with periodic small features (hooks/swivels). Extended shadow trail along survey direction.',
    riskLevel: 'MEDIUM',
    riskColor: '#fbbf24',
    icon: 'line',
  },
  {
    id: 'fishing-trap',
    number: '05',
    name: 'Fishing Trap',
    shortName: 'Trap',
    category: 'Traps',
    description:
      'Lost traps and pots that continue to catch marine life. Can persist on the seafloor for years as persistent hazards.',
    sonarCharacteristics:
      'Compact geometric returns with defined edges. Rectangular or cylindrical shapes. Produces sharp, well-defined shadows.',
    riskLevel: 'MEDIUM',
    riskColor: '#fbbf24',
    icon: 'trap',
  },
  {
    id: 'fishing-cage',
    number: '06',
    name: 'Fishing Cage',
    shortName: 'Cage',
    category: 'Traps',
    description:
      'Fish cages and aquaculture equipment lost during storms or operational failures. Large persistent seabed hazards.',
    sonarCharacteristics:
      'Large structured returns with grid-like patterns. May show internal framework. Produces complex multi-part shadows.',
    riskLevel: 'HIGH',
    riskColor: '#f87171',
    icon: 'cage',
  },
  {
    id: 'hook-cluster',
    number: '07',
    name: 'Hook Cluster',
    shortName: 'Hooks',
    category: 'Metal',
    description:
      'Concentrations of fishing hooks, swivels, and metal hardware. Sharp metal returns that can injure marine life.',
    sonarCharacteristics:
      'Bright point-source returns with high acoustic reflectivity. Often clustered. Small but intense shadows.',
    riskLevel: 'LOW',
    riskColor: '#4cc7de',
    icon: 'hook',
  },
  {
    id: 'buoy-float',
    number: '08',
    name: 'Buoy / Float',
    shortName: 'Buoy',
    category: 'Floats',
    description:
      'Lost buoys, floats, and marker equipment. Can drift and create navigation hazards or contribute to microplastics.',
    sonarCharacteristics:
      'Rounded or spherical returns. May be partially buried. Moderate acoustic reflectivity with soft shadow edges.',
    riskLevel: 'LOW',
    riskColor: '#4cc7de',
    icon: 'buoy',
  },
  {
    id: 'metal-equipment',
    number: '09',
    name: 'Metal Fishing Equipment',
    shortName: 'Metal Gear',
    category: 'Metal',
    description:
      'Metal fishing equipment including anchors, chains, winches, and hardware. Highly reflective in sonar imagery.',
    sonarCharacteristics:
      'Very bright acoustic returns with hard edges. Irregular shapes. Produces strong, well-defined shadows.',
    riskLevel: 'MEDIUM',
    riskColor: '#fbbf24',
    icon: 'metal',
  },
  {
    id: 'other-debris',
    number: '10',
    name: 'Other Fishing Debris',
    shortName: 'Other',
    category: 'Miscellaneous',
    description:
      'Other fishing-related debris not fitting standard categories. Requires further investigation for classification.',
    sonarCharacteristics:
      'Variable acoustic returns. May combine features of multiple categories. Often requires human verification.',
    riskLevel: 'LOW',
    riskColor: '#4cc7de',
    icon: 'other',
  },
];

export const getDebrisTypeById = (id: string): DebrisType | undefined =>
  debrisTypes.find((d) => d.id === id);
