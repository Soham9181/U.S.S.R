import { useEffect, useRef, useState } from 'react';

export function useClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function formatUTC(date: Date): string {
  const h = String(date.getUTCHours()).padStart(2, '0');
  const m = String(date.getUTCMinutes()).padStart(2, '0');
  const s = String(date.getUTCSeconds()).padStart(2, '0');
  return `${h}:${m}:${s} UTC`;
}

export function useSimulatedTelemetry() {
  const [telemetry, setTelemetry] = useState({
    depth: 38.4,
    speed: 2.4,
    heading: 127,
    battery: 82,
    missionTime: '01:42:18',
    areaCovered: 24.8,
    sonarStatus: 'ACTIVE',
    gpsStatus: 'LOCKED',
    waterTemp: 18.3,
    salinity: 34.7,
  });

  const secondsRef = useRef(6138);

  useEffect(() => {
    const interval = setInterval(() => {
      secondsRef.current += 1;
      const h = Math.floor(secondsRef.current / 3600);
      const m = Math.floor((secondsRef.current % 3600) / 60);
      const s = secondsRef.current % 60;
      const missionTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      setTelemetry((prev) => ({
        ...prev,
        depth: Math.max(35, Math.min(45, prev.depth + (Math.random() - 0.5) * 0.4)),
        speed: Math.max(1.8, Math.min(3.0, prev.speed + (Math.random() - 0.5) * 0.1)),
        heading: Math.round((prev.heading + (Math.random() - 0.5) * 2 + 360) % 360),
        battery: Math.max(0, prev.battery - 0.001),
        missionTime,
        areaCovered: prev.areaCovered + 0.002,
        waterTemp: Math.max(17, Math.min(20, prev.waterTemp + (Math.random() - 0.5) * 0.05)),
        salinity: Math.max(33, Math.min(36, prev.salinity + (Math.random() - 0.5) * 0.02)),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return telemetry;
}

export function useDepthHistory(maxPoints = 30) {
  const [history, setHistory] = useState<{ time: string; depth: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prev) => {
        const now = new Date();
        const time = `${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
        const depth = 38 + Math.sin(Date.now() / 5000) * 3 + (Math.random() - 0.5) * 1.5;
        const next = [...prev, { time, depth: Math.round(depth * 10) / 10 }];
        return next.slice(-maxPoints);
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return history;
}

export function useSpeedHistory(maxPoints = 30) {
  const [history, setHistory] = useState<{ time: string; speed: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prev) => {
        const now = new Date();
        const time = `${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
        const speed = 2.4 + Math.sin(Date.now() / 4000) * 0.4 + (Math.random() - 0.5) * 0.2;
        const next = [...prev, { time, speed: Math.round(speed * 10) / 10 }];
        return next.slice(-maxPoints);
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return history;
}

export function useBatteryHistory(maxPoints = 30) {
  const [history, setHistory] = useState<{ time: string; battery: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prev) => {
        const now = new Date();
        const time = `${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
        const lastBattery = prev.length > 0 ? prev[prev.length - 1].battery : 82;
        const battery = Math.max(0, lastBattery - 0.05);
        const next = [...prev, { time, battery: Math.round(battery * 10) / 10 }];
        return next.slice(-maxPoints);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return history;
}
