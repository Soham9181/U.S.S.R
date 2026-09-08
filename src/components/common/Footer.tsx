import { Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-abyss-700/40 bg-abyss-950/80 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-sm bg-sonar-cyan/10 border border-sonar-cyan/40 flex items-center justify-center">
                <Waves className="w-4 h-4 text-sonar-cyan" />
              </div>
              <div>
                <div className="text-sm font-bold text-abyss-50 tracking-wider">DEEPSENSE</div>
                <div className="text-[9px] font-mono text-abyss-400 uppercase tracking-widest">
                  Underwater Marine Debris Intelligence
                </div>
              </div>
            </div>
            <p className="text-sm text-abyss-300 max-w-md leading-relaxed">
              AI-powered detection of lost fishing gear and marine debris using side-scan sonar imagery.
              Detect. Locate. Protect.
            </p>
          </div>

          <div>
            <div className="text-label text-abyss-400 mb-3">Platform</div>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Mission Control</Link></li>
              <li><Link to="/sonar-analysis" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Sonar Analysis</Link></li>
              <li><Link to="/mission-map" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Mission Map</Link></li>
              <li><Link to="/analytics" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-label text-abyss-400 mb-3">Resources</div>
            <ul className="space-y-2">
              <li><Link to="/debris-library" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Debris Library</Link></li>
              <li><Link to="/about" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">Technology</Link></li>
              <li><Link to="/auv-monitor" className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors">AUV Monitor</Link></li>
              <li><span className="text-sm text-abyss-200 hover:text-sonar-cyan transition-colors cursor-pointer">Research</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-abyss-700/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-abyss-400 uppercase tracking-wider">
            Prototype developed for Smart India Hackathon
          </p>
          <p className="text-xs font-mono text-abyss-400">
            DeepSense © 2026 │ Demo / Simulated Data
          </p>
        </div>
      </div>
    </footer>
  );
}
