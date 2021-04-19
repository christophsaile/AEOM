import { ContentfulClientApi } from 'contentful';
import { CONTENTFUL_SPACEID, CONTENTFUL_TOKEN, CONTENTFUL_ENVIRONMENT } from '@env';
// @ts-ignore
import { createClient } from 'contentful/dist/contentful.browser.min.js';

export const client: ContentfulClientApi = createClient({
  space: CONTENTFUL_SPACEID,
  accessToken: CONTENTFUL_TOKEN,
  environment: CONTENTFUL_ENVIRONMENT,
});
