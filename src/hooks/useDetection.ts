import { useState, useCallback } from 'react';
import { detections, Detection } from '@/data/detections';

export function useDetection() {
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(
    detections[0]
  );
  const [filteredDetections, setFilteredDetections] = useState<Detection[]>(detections);
  const [showDetections, setShowDetections] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showSonarImage, setShowSonarImage] = useState(true);
  const [sensitivity, setSensitivity] = useState(75);

  const selectDetection = useCallback((detection: Detection) => {
    setSelectedDetection(detection);
  }, []);

  const filterByType = useCallback((typeId: string | null) => {
    if (!typeId) {
      setFilteredDetections(detections);
    } else {
      setFilteredDetections(detections.filter((d) => d.typeId === typeId));
    }
  }, []);

  const filterByPriority = useCallback((priority: string | null) => {
    if (!priority) {
      setFilteredDetections(detections);
    } else {
      setFilteredDetections(detections.filter((d) => d.priority === priority));
    }
  }, []);

  const searchDetections = useCallback((query: string) => {
    if (!query.trim()) {
      setFilteredDetections(detections);
    } else {
      const lower = query.toLowerCase();
      setFilteredDetections(
        detections.filter(
          (d) =>
            d.id.toLowerCase().includes(lower) ||
            d.type.toLowerCase().includes(lower) ||
            d.sector.toLowerCase().includes(lower)
        )
      );
    }
  }, []);

  return {
    selectedDetection,
    selectDetection,
    filteredDetections,
    filterByType,
    filterByPriority,
    searchDetections,
    showDetections,
    setShowDetections,
    showLabels,
    setShowLabels,
    showSonarImage,
    setShowSonarImage,
    sensitivity,
    setSensitivity,
  };
}
