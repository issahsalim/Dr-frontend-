import { useState, useEffect } from 'react';
import { api } from '../api/service';
import LoadingSpinner from './LoadingSpinner';

export default function StatsSection() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats).catch(() => setStats({
      research_count: 0,
      publications_count: 0,
      projects_count: 0,
      awards_count: 0,
      gallery_count: 0,
    }));
  }, []);

  if (!stats) {
    return (
      <section className="section stats" id="stats">
        <div className="container">
          <h2 className="section-title">Work at a Glance</h2>
          <LoadingSpinner message="Loading stats…" variant="section" />
        </div>
      </section>
    );
  }

  const items = [
    { label: 'Research', value: stats.research_count, icon: '📚' },
    { label: 'Publications', value: stats.publications_count, icon: '📄' },
    { label: 'Projects', value: stats.projects_count, icon: '🔬' },
    { label: 'Awards', value: stats.awards_count, icon: '🏆' },
  ];

  return (
    <section className="section stats" id="stats">
      <div className="container">
        <h2 className="section-title">Work at a Glance</h2>
        <div className="stats-grid">
          {items.map(({ label, value, icon }) => (
            <div key={label} className="stat-card">
              <span className="stat-icon">{icon}</span>
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div> 
      </div>
    </section>
  );
}


