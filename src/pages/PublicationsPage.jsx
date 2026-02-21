import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../api/service';
import Pagination from '../components/Pagination';

const PER_PAGE = 10;

export default function PublicationsPage() {
  const [data, setData] = useState({ results: [], count: 0, total_pages: 1, current_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getPublications(page, PER_PAGE).then(setData).catch(() =>
      setData({ results: [], count: 0, total_pages: 1, current_page: 1 })
    ).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="page work-list-page">
      <SEO
        title="Publications - Dr. Haruna Gado Yakubu"
        description="Academic publications and scholarly articles by Dr. Haruna Gado Yakubu, Lecturer at University of Cape Coast. Browse research papers, journal articles, and academic publications."
        keywords="Dr. Haruna Gado publications, Haruna Gado papers, UCC publications, University of Cape Coast publications, academic papers Ghana, scholarly articles"
        url="/publications"
      />
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Publications</h1>
          <p className="page-subtitle">All publications</p>
          <Link to="/#publications" className="page-back">← Back to Home</Link>
        </header>
        {loading ? (
          <LoadingSpinner message="Loading publications…" variant="page" />
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
          <p className="work-list-empty">No publications yet.</p>
        )}
      </div>
    </div>
  );
}
