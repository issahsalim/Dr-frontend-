const SITE_URL = 'https://boresa.netlify.app';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Haruna Gado Yakubu',
    alternateName: ['Haruna Gado', 'Dr. Gado', 'Dr Haruna Gado', 'Yakubu Haruna Gado'],
    jobTitle: 'Lecturer',
    worksFor: {
      '@type': 'Organization',
      name: 'University of Cape Coast',
      alternateName: ['UCC'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cape Coast',
        addressCountry: 'GH',
      },
    },
    url: SITE_URL,
    sameAs: [
      // Add social media profiles if available
      // 'https://linkedin.com/in/...',
      // 'https://twitter.com/...',
      // 'https://scholar.google.com/...',
    ],
    description:
      'Lecturer and researcher at the University of Cape Coast. Expert in academic research, publications, and educational projects.',
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dr. Haruna Gado Yakubu',
    url: SITE_URL,
    description: 'Official website of Dr. Haruna Gado Yakubu, Lecturer at University of Cape Coast',
    publisher: {
      '@type': 'Person',
      name: 'Dr. Haruna Gado Yakubu',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getCollectionPageSchema(type, items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${type} - Dr. Haruna Gado Yakubu`,
    url: `${SITE_URL}/${type.toLowerCase()}`,
    description: `Collection of ${type.toLowerCase()} by Dr. Haruna Gado Yakubu`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': type === 'Publications' ? 'ScholarlyArticle' : 'CreativeWork',
          name: item.title,
          description: item.description,
          url: item.link_url || undefined,
        },
      })),
    },
  };
}
