import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/service';
import LoadingSpinner from './LoadingSpinner';

const HOME_LIMIT = 3;

export default function ProjectsSection() {
  const [data, setData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProjects(1, HOME_LIMIT).then(setData).catch(() => setData({ results: [], count: 0 })).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section projects" id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <LoadingSpinner message="Loading projects…" variant="section" />
        </div>
      </section>
    );
  }
  if (!data.results?.length) return null;

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <ul className="work-list">
          {data.results.map((item) => (
            <li key={item.id} className="work-item">
              <h3 className="work-item-title">{item.title}</h3>
              {item.description && <p className="work-item-desc">{item.description}</p>}
              {item.link_url && (
                <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="work-item-link">
                  {item.link_text}
                </a>
              )}
            </li>
          ))}
        </ul>
        {data.count >= HOME_LIMIT && (
          <p className="section-more">
            <Link to="/projects" className="work-item-link">Read more → View all projects</Link>
          </p>
        )}
      </div>
    </section>
  );
}
