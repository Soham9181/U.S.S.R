import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import SonarAnalysis from '@/pages/SonarAnalysis';
import DebrisLibrary from '@/pages/DebrisLibrary';
import MissionMap from '@/pages/MissionMap';
import AUVMonitor from '@/pages/AUVMonitor';
import Analytics from '@/pages/Analytics';
import About from '@/pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sonar-analysis" element={<SonarAnalysis />} />
          <Route path="/debris-library" element={<DebrisLibrary />} />
          <Route path="/mission-map" element={<MissionMap />} />
          <Route path="/auv-monitor" element={<AUVMonitor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
