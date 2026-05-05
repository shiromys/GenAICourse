/**
 * SEOHelmet — Centralised SEO component for GenAI Course
 *
 * Usage:
 *   <SEOHelmet
 *     title="Page Title"                 // appended with " | GenAI Course"
 *     description="Page description"
 *     canonical="/path"                  // relative path, becomes full URL
 *     ogImage="https://..."              // defaults to og-banner.png
 *     ogType="website"                   // or "article"
 *     noIndex={false}                    // true for auth/admin pages
 *     schema={schemaObject}              // primary JSON-LD object
 *     breadcrumb={breadcrumbArray}       // [{name, url}, ...] — auto-builds BreadcrumbList
 *   />
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME   = 'GenAI Course';
const BASE_URL    = 'https://genaicourse.io';
const DEFAULT_OG  = `${BASE_URL}/logo-large.png`;
const TWITTER_HANDLE = '@genaicourse';

const SEOHelmet = ({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG,
    ogType = 'website',
    noIndex = false,
    schema = null,
    breadcrumb = null,   // [{name: 'Home', url: '/'}, {name: 'Courses', url: '/courses'}]
}) => {
    const fullTitle    = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} — Learn Generative AI Online with Certification`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : null;

    // Build BreadcrumbList schema from the shorthand array
    const breadcrumbSchema = breadcrumb
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumb.map((item, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: item.name,
                item: `${BASE_URL}${item.url}`,
            })),
        }
        : null;

    return (
        <Helmet>
            {/* ── Primary ─────────────────────────────────────────── */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            {noIndex
                ? <meta name="robots" content="noindex, nofollow" />
                : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            }

            {/* ── OpenGraph ────────────────────────────────────────── */}
            <meta property="og:site_name"   content={SITE_NAME} />
            <meta property="og:type"        content={ogType} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:image"       content={ogImage} />
            <meta property="og:image:width"  content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt"    content={`${SITE_NAME} — ${title || 'Learn AI Online'}`} />
            <meta property="og:locale"      content="en_US" />

            {/* ── Twitter Cards ────────────────────────────────────── */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:site"        content={TWITTER_HANDLE} />
            <meta name="twitter:creator"     content={TWITTER_HANDLE} />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image"       content={ogImage} />

            {/* ── Primary JSON-LD Schema ───────────────────────────── */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {/* ── BreadcrumbList Schema ────────────────────────────── */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHelmet;
