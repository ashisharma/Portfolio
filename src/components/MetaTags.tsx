import React, { useEffect } from 'react';

export interface SeoMetadata {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: string;
  siteName?: string;
  structuredData?: Record<string, unknown>;
}

export const DEFAULT_SEO: SeoMetadata = {
  title: "Ashish | HELLO AS16",
  description:
    "Portfolio of Ashish - Java Developer and Software Engineer building practical software solutions like SPARS.",
  image: 'og-portfolio.svg',
  imageAlt: "Ashish - HELLO AS16 Portfolio",
  siteName: "Ashish Portfolio",
  type: "website",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ashish",
    "jobTitle": "Java Developer & Software Engineer",
    "knowsAbout": ["Java", "Backend Development", "Web Development", "React", "SQL", "Firebase", "SPARS"],
    "description": "Java Developer and Software Engineer building practical software solutions."
  }
};

/**
 * Returns tailored SeoMetadata for any given project item.
 */
export function getProjectSeo(project: {
  id: string;
  title: string;
  fullName: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
}): SeoMetadata {
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname.replace(/\/+$/, '')}/#project-${project.id}`
    : `https://ashisharma.github.io/Portfolio/#project-${project.id}`;

  return {
    title: project.ogTitle || `${project.title} | ${project.fullName} - by Ashish`,
    description: project.ogDescription || project.description,
    image: project.ogImage || 'og-portfolio.svg',
    imageAlt: project.ogImageAlt || `${project.title} - ${project.fullName}`,
    url: url,
    type: 'article',
    siteName: 'Ashish Portfolio',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": project.title,
      "alternateName": project.fullName,
      "description": project.description,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "author": {
        "@type": "Person",
        "name": "Ashish"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };
}

/**
 * Resolves a relative image/path to an absolute URL suitable for Open Graph crawlers.
 */
export function toAbsoluteUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // Strip trailing slash from pathname, and strip leading slash from pathOrUrl
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const cleanPath = pathOrUrl.replace(/^\/+/, '');
    return `${origin}${pathname ? pathname : ''}/${cleanPath}`;
  }
  return pathOrUrl;
}

/**
 * Updates or creates a <meta> tag in the document <head>.
 */
function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates or creates a <link rel="canonical"> tag in the document <head>.
 */
function setCanonicalLink(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Injects or updates dynamic JSON-LD structured data.
 */
function setJsonLd(structuredData?: Record<string, unknown>) {
  if (typeof document === 'undefined') return;
  const scriptId = 'dynamic-seo-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  
  if (!structuredData) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  try {
    script.textContent = JSON.stringify(structuredData);
  } catch (err) {
    console.error('Failed to stringify JSON-LD data', err);
  }
}

/**
 * Directly updates document title, standard meta descriptions, and OpenGraph tags.
 */
export function applySeoMetadata(meta: SeoMetadata) {
  if (typeof document === 'undefined') return;

  const title = meta.title || DEFAULT_SEO.title || '';
  const description = meta.description || DEFAULT_SEO.description || '';
  const rawImage = meta.image || DEFAULT_SEO.image || '';
  const image = toAbsoluteUrl(rawImage);
  const imageAlt = meta.imageAlt || title;
  const siteName = meta.siteName || DEFAULT_SEO.siteName || 'Ashish Portfolio';
  const type = meta.type || 'website';
  
  const currentUrl = typeof window !== 'undefined' 
    ? (meta.url || window.location.href)
    : (meta.url || '');

  // 1. Page Title
  document.title = title;

  // 2. Standard Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', description);

  // 3. OpenGraph / Facebook
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteName);
  if (currentUrl) {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setCanonicalLink(currentUrl);
  }
  if (image) {
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', imageAlt);
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/svg+xml');
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
  }

  // 4. Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  if (image) {
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', imageAlt);
  }

  // 5. Structured Data
  if (meta.structuredData) {
    setJsonLd(meta.structuredData);
  }
}

/**
 * Custom React hook for dynamic meta tags management.
 */
export function useMetaTags(meta: SeoMetadata) {
  useEffect(() => {
    applySeoMetadata(meta);
  }, [
    meta.title,
    meta.description,
    meta.image,
    meta.imageAlt,
    meta.url,
    meta.type,
    meta.siteName,
    meta.structuredData,
  ]);
}

/**
 * React Component for declarative Meta & OpenGraph injection.
 */
export const MetaTags: React.FC<SeoMetadata> = (props) => {
  useMetaTags(props);
  return null;
};
