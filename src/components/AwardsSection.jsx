import { useState, useEffect } from 'react';
import { api } from '../api/service';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const PER_PAGE = 5;

export default function AwardsSection() {
  const [data, setData] = useState({ results: [], count: 0, total_pages: 1, current_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getAwards(page, PER_PAGE).then(setData).catch(() => setData({ results: [], count: 0, total_pages: 1, current_page: 1 })).finally(() => setLoading(false));
  }, [page]);

  if (loading && page === 1) {
    return (
      <section className="section awards" id="awards">
        <div className="container">
          <h2 className="section-title">Awards & Achievements</h2>
          <LoadingSpinner message="Loading awards…" variant="section" />
        </div>
      </section>
    );
  }
  if (!data.results?.length) return null;

  return (
    <section className="section awards" id="awards">
      <div className="container">
        <h2 className="section-title">Awards & Achievements</h2>
        <div className="awards-grid">
          {data.results.map((item) => (
            <article key={item.id} className="award-card">
              {item.image && (
                <div className="award-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
              )}
              <div className="award-card-body">
                <h3 className="award-card-title">{item.title}</h3>
                {item.description && <p className="award-card-desc">{item.description}</p>}
              </div>
            </article>
          ))}
        </div>
        {data.total_pages > 1 && (
          <Pagination
            currentPage={data.current_page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
}
