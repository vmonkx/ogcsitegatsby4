# Instagram feed via Facebook Login

This local Gatsby source replaces `gatsby-source-instagram-all`. It reads up to
15 Instagram posts at build time from `graph.facebook.com`, creates
`OgcInstagramContent` nodes and downloads image covers through Gatsby's file cache.
Video posts use `thumbnail_url`; carousel posts use the album cover.

Set these variables in `.env.development`, `.env.production`, or the build host:

```dotenv
INST_ACCESS_TOKEN=<Facebook Login token>
INSTAGRAM_ACCOUNT_ID=<Instagram professional account ID>
INSTAGRAM_API_VERSION=v25.0
```

The existing `INSTAGRAM_ID` is used if `INSTAGRAM_ACCOUNT_ID` is absent.
`INSTAGRAM_USER_ID` and `INSTAGRAM_TOKEN` are not used by this source.
Keep the token outside Git and never prefix it with `GATSBY_`.

The account must be Business or Creator, linked to a Facebook Page. The token
needs `instagram_basic` and `pages_read_engagement` with access to that account.
`pages_show_list` is needed to discover the linked account through `/me/accounts`.
For a Facebook **user** token, request:

```text
GET https://graph.facebook.com/v25.0/me/accounts?fields=id,name,instagram_business_account
Authorization: Bearer <token>
```

Use `instagram_business_account.id`, not the Facebook Page ID or Meta app ID.
If a Page token is already available, query the known Page ID for
`instagram_business_account` instead. Prefer a long-lived token for builds;
revocation, expiration, or loss of permissions requires a new token.

The token is sent only in the Authorization header to the fixed Meta API host.
It is read privately during sourcing, outside Gatsby plugin options, so Gatsby
error diagnostics cannot dump it with the plugin configuration. It is not copied
into content nodes or frontend data.
Pagination uses cursors rather than following token-bearing URLs.
Remote covers must be HTTPS URLs from Instagram/Facebook CDN domains.

If the API fails, Gatsby warns and builds without the feed. It does not publish
cached posts from an earlier successful build. Individual failed downloads are
skipped. The social section still links to the clinic's Instagram profile.
New posts appear after the next successful build, not live in the browser.

Run `npm run test:instagram` and `npm run build` after changes. Restart the Gatsby
development server after changing environment variables.

References:
- [Meta's Instagram API collection](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api?entity=request-23987686-894be833-d0b6-4877-859e-c61ae6474d64)
- [Gatsby local plugins](https://www.gatsbyjs.com/docs/creating-a-local-plugin/)

## Switching from the previous source on Vercel

The source owns `OgcInstagramContent` and uses a distinct `ogc-instagram-media-`
node ID prefix. This avoids ownership conflicts when a build cache still records
`InstagramContent` as belonging to `gatsby-source-instagram-all` or an earlier
version of this local source. The UI query aliases `allOgcInstagramContent` to
`allInstagramContent`, preserving the component's data contract.

Commit and deploy the plugin and query changes together. A cache reset is not
required for this type migration. Set `INST_ACCESS_TOKEN` in Vercel's server-side
build environment. Rotate a token if it has appeared in build logs.
