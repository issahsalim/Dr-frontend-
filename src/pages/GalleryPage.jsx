import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../api/service';
import Pagination from '../components/Pagination';

const PER_PAGE = 12;

export default function GalleryPage() {
  const [data, setData] = useState({ results: [], count: 0, total_pages: 1, current_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getGallery(page, PER_PAGE).then(setData).catch(() =>
      setData({ results: [], count: 0, total_pages: 1, current_page: 1 })
    ).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="page gallery-page">
      <SEO
        title="Gallery - Dr. Haruna Gado Yakubu"
        description="Photo gallery showcasing moments, events, and activities of Dr. Haruna Gado Yakubu, Lecturer at University of Cape Coast."
        keywords="Dr. Haruna Gado gallery, Haruna Gado photos, UCC lecturer photos, University of Cape Coast gallery"
        url="/gallery"
      />
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">A glimpse of life and moments</p>
        </header>
        {loading ? (
          <LoadingSpinner message="Loading gallery…" variant="page" />
        ) : data.results?.length ? (
          <>
            <div className="gallery-grid">
              {data.results.map((item) => (
                <figure key={item.id} className="gallery-item">
                  <img src={item.image} alt={item.title || 'Gallery'} loading="lazy" />
                  {item.title && <figcaption>{item.title}</figcaption>}
                </figure>
              ))}
            </div>
            {data.total_pages > 1 && (
              <Pagination
                currentPage={data.current_page}
                totalPages={data.total_pages}
                onPageChange={setPage}
              />
            )}
          </>
        ) : (
          <p className="gallery-empty">No images in the gallery yet.</p>
        )}
      </div>
    </div>
  );
}
