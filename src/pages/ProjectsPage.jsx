import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../api/service';
import Pagination from '../components/Pagination';

const PER_PAGE = 10;

export default function ProjectsPage() {
  const [data, setData] = useState({ results: [], count: 0, total_pages: 1, current_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProjects(page, PER_PAGE).then(setData).catch(() =>
      setData({ results: [], count: 0, total_pages: 1, current_page: 1 })
    ).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="page work-list-page">
      <SEO
        title="Projects - Dr. Haruna Gado Yakubu"
        description="Academic and research projects by Dr. Haruna Gado Yakubu, Lecturer at University of Cape Coast. Explore educational projects, research initiatives, and academic work."
        keywords="Dr. Haruna Gado projects, Haruna Gado academic projects, UCC projects, University of Cape Coast projects, educational projects Ghana"
        url="/projects"
      />
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">All projects</p>
          <Link to="/#projects" className="page-back">← Back to Home</Link>
        </header>
        {loading ? (
          <LoadingSpinner message="Loading projects…" variant="page" />
        ) : data.results?.length ? (
          <>
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
            {data.total_pages > 1 && (
              <Pagination
                currentPage={data.current_page}
                totalPages={data.total_pages}
                onPageChange={setPage}
              />
            )}
          </>
        ) : (
          <p className="work-list-empty">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
