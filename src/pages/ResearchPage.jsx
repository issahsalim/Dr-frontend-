import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../api/service';
import Pagination from '../components/Pagination';

const PER_PAGE = 10;

export default function ResearchPage() {
  const [data, setData] = useState({ results: [], count: 0, total_pages: 1, current_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getResearch(page, PER_PAGE).then(setData).catch(() =>
      setData({ results: [], count: 0, total_pages: 1, current_page: 1 })
    ).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="page work-list-page">
      <SEO
        title="Research - Dr. Haruna Gado Yakubu"
        description="Research work and academic studies by Dr. Haruna Gado Yakubu, Lecturer at University of Cape Coast. Explore research projects, studies, and academic contributions."
        keywords="Dr. Haruna Gado research, Haruna Gado research, UCC research, University of Cape Coast research, academic research Ghana"
        url="/research"
      />
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Research</h1>
          <p className="page-subtitle">All research work</p>
          <Link to="/#research" className="page-back">← Back to Home</Link>
        </header>
        {loading ? (
          <LoadingSpinner message="Loading research…" variant="page" />
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
          <p className="work-list-empty">No research entries yet.</p>
        )}
      </div>
    </div>
  );
}
