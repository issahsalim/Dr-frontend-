import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://dr-haruna-gado.netlify.app';
const DEFAULT_IMAGE = `${SITE_URL}/8.jpg`;

export default function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  structuredData,
}) { 
  const fullTitle = title
    ? `${title} | Dr. Haruna Gado Yakubu`
    : 'Dr. Haruna Gado Yakubu | Lecturer, University of Cape Coast';
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullDescription =
    description ||
    'Dr. Haruna Gado Yakubu - Lecturer and researcher at the University of Cape Coast. Explore research, publications, projects, and academic achievements.';

  const defaultKeywords = [
    'Dr. Haruna Gado Yakubu',
    'Haruna Gado',
    'Dr. Gado',
    'Dr Haruna Gado',
    'Yakubu Haruna Gado',
    'University of Cape Coast',
    'UCC Lecturer',
    'UCC lectures',
    'UCC faculty',
    'Cape Coast University',
    'Ghana lecturer',
    'academic researcher',
    'research publications',
  ];

  const allKeywords = keywords
    ? [...defaultKeywords, ...keywords.split(',').map((k) => k.trim())]
    : defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content="Dr. Haruna Gado Yakubu" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Dr. Haruna Gado Yakubu" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Cape Coast" />
      <meta name="geo.position" content="5.1315;-1.2795" />
      <meta name="ICBM" content="5.1315, -1.2795" />
 
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <> 
          {Array.isArray(structuredData) ? (
            structuredData.map((schema, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(schema)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
          )}
        </>
      )}
    </Helmet>
  );
}
