import React from "react";

import { useSiteMetaData } from "../hooks/useSiteMetadata";
import logo from "../images/logonew.svg";
import PropTypes from "prop-types";

const Seo = ({
  title,
  description = "",
  meta = [],
  cover,
  breadCrumbSchema,
  pathname,
  children,
  lang = "ru",
  ogtype = "website",
  articleSchema,
  customSchema,
  publishedAt,
  updatedAt,
  authorName,
}) => {
  const {
    siteMetadata: {
      title: defaultTitle,
      description: defaultDescription,
      author,
      url,
      lang: siteLang,
      locale,
      telephone,
      yandexVerf,
      facebookVerf,
      themeColor,
    },
    strapi: { siteName, defaultSeo },
  } = useSiteMetaData();

  const seo = {
    description: description || defaultSeo.description || defaultDescription,
    url: url,
    pageUrl: pathname ? `${url}${pathname}` : url,
    pageTitle: title,
    defaultTitle: siteName || defaultTitle,
    cover: cover
      ? cover.startsWith("http")
        ? cover
        : `${url}${cover}`
      : `${url}${defaultSeo?.shareImage?.localFile?.childImageSharp?.resize?.src}`,
    ogtype: ogtype,
    meta: meta.length > 0 ? meta : defaultSeo.meta,
    author,
    lang,
    locale,
    themeColor,
    facebookVerf,
    yandexVerf,
    telephone,
  };

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalClinic", "LocalBusiness"],
    name: `${seo.defaultTitle}`,
    logo: `${seo.url}${logo}`,
    image: `${seo.cover}`,
    url: `${seo.url}`,
    telephone: `${seo.telephone}`,
    priceRange: "₽₽₽",
    address: {
      "@type": "PostalAddress",
      "addressLocality": "Казань",
      "streetAddress": "ул. Николая Ершова, 57г",
      "addressCountry": "RU"
    },
    contactPoint: {
      "@type": "ContactPoint",
      "telephone": `${seo.telephone}`,
      "contactType": "customer service"
    },
    geo: {
      "@type": "GeoCoordinates",
      "latitude": 55.795155,
      "longitude": 49.173873
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    sameAs: [
      "https://t.me/+oLVdYQH2LDplYWQy",
      "https://vk.com/ogcclinic",
      "https://facebook.com/ogcclinic",
      "https://www.instagram.com/ogcclinic/",
      "https://www.youtube.com/channel/UCImB6JGxRVEkkBW1WhzOVUw",
    ],
  };

  return (
    <>
      <title>
        {seo.pageTitle
          ? seo.pageTitle.includes(defaultTitle)
            ? seo.pageTitle
            : `${seo.pageTitle} - ${defaultTitle}`
          : seo.defaultTitle}
      </title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.cover} />
      <meta
        property="og:title"
        itemProp="name"
        content={seo.pageTitle || seo.defaultTitle}
      />
      <meta property="og:image" itemProp="image" content={seo.cover} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="og:image:alt"
        content={seo.pageTitle || seo.defaultTitle}
      />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={seo.ogtype} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={seo.defaultTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.pageTitle || seo.defaultTitle} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.cover} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="msapplication-TileImage" content={seo.cover} />
      <meta name="yandex-verification" content={seo.yandexVerf} />
      <meta name="facebook-domain-verification" content={seo.facebookVerf} />

      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      {breadCrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadCrumbSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {customSchema && (
        <script type="application/ld+json">
          {JSON.stringify(customSchema)}
        </script>
      )}
      {seo.ogtype === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {seo.ogtype === "article" && updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {seo.ogtype === "article" && authorName && (
        <meta property="article:author" content={authorName} />
      )}
      {seo.meta &&
        seo.meta.map((tag) => {
          return <meta name={tag.name} content={tag.content} key={tag.id} />;
        })}
      {children}
    </>
  );
};

export default Seo;

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  cover: PropTypes.string,
};
