export interface Mission {
  id: string;
  name: string;
  sector: string;
  status: string;
  areaScanned: number;
  startTime: string;
  duration: string;
  surveyType: string;
  coordinates: { lat: number; lng: number }[];
}

export const currentMission: Mission = {
  id: 'M07',
  name: 'Mission 07',
  sector: 'Coastal Sector B',
  status: 'AUTONOMOUS SURVEY ACTIVE',
  areaScanned: 24.8,
  startTime: '2026-09-07T07:00:00Z',
  duration: '01:42:18',
  surveyType: 'Side-Scan Sonar Survey',
  coordinates: [
    { lat: 15.2789, lng: 73.3950 },
    { lat: 15.2855, lng: 73.3982 },
    { lat: 15.2912, lng: 73.4033 },
    { lat: 15.2973, lng: 73.4116 },
    { lat: 15.3021, lng: 73.4198 },
    { lat: 15.3088, lng: 73.4251 },
    { lat: 15.3142, lng: 73.4385 },
    { lat: 15.3088, lng: 73.4380 },
    { lat: 15.3021, lng: 73.4310 },
    { lat: 15.2948, lng: 73.4230 },
    { lat: 15.2867, lng: 73.4150 },
    { lat: 15.2789, lng: 73.4050 },
  ],
};

export const missionStats = {
  areaScanned: 24.8,
  debrisDetected: 17,
  ghostNets: 8,
  highPriority: 5,
  mediumPriority: 7,
  lowPriority: 5,
};
