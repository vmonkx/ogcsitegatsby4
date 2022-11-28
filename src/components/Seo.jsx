import React from "react";

import { useSiteMetaData } from "../hooks/useSiteMetadata";
import logo from "../images/logonew.svg";
import PropTypes from "prop-types";

const Seo = ({
  title,
  description,
  meta,
  cover,
  breadCrumbSchema,
  pathname,
  children,
}) => {
  const {
    siteMetadata: {
      title: defaultTitle,
      description: defaultDescription,
      author,
      url,
      lang,
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
    siteUrl: pathname ? `${url}${pathname}` : url,
    pageTitle: title,
    defaultTitle: siteName || defaultTitle,
    cover: cover
      ? `${url}${cover}`
      : `${url}${defaultSeo.shareImage.localFile.childImageSharp.resize.src}`,
    ogtype: "website",
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
    "@type": "Organization",
    name: `${seo.defaultTitle}`,
    logo: `${seo.url}${logo}`,
    url: `${seo.url}`,
    telephone: `${seo.telephone}`,
    sameAs: [
      "https://www.instagram.com/ogcclinic/",
      "https://www.youtube.com/channel/UCImB6JGxRVEkkBW1WhzOVUw",
    ],
  };

  return (
    <>
      <title>
        {seo.pageTitle
          ? `${seo.pageTitle} - ${defaultTitle}`
          : seo.defaultTitle}
      </title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.cover} />
      <meta
        name="og:title"
        itemProp="name"
        content={seo.pageTitle || seo.defaultTitle}
      />
      <meta name="og:image" itemProp="image" content={seo.cover} />
      <meta name="og:image:type" content="image/jpeg" />
      <meta
        property="og:image:alt"
        content={seo.pageTitle || seo.defaultTitle}
      />
      <meta property="og:description" content={seo.description} />
      <meta name="og:url" content={seo.url} />
      <meta name="og:type" content={seo.ogtype} />
      <meta name="og:locale" content={seo.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.pageTitle || seo.defaultTitle} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.cover} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="msapplication-TileImage" content={seo.cover} />
      <meta name="yandex-verification" content={seo.yandexVerf} />
      <meta name="facebook-domain-verification" content={seo.facebookVerf} />
      <link rel="canonical" href={`${seo.siteUrl}`} />
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      {breadCrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadCrumbSchema)}
        </script>
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

Seo.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  cover: PropTypes.string,
};
