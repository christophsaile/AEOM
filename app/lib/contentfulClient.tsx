import { EntryCollection, ContentfulClientApi } from 'contentful';
// @ts-ignore
import { CONTENTFUL_SPACEID, CONTENTFUL_TOKEN } from '@env';
// @ts-ignore
import { createClient } from 'contentful/dist/contentful.browser.min.js';

export const client: ContentfulClientApi = createClient({
  space: CONTENTFUL_SPACEID,
  accessToken: CONTENTFUL_TOKEN,
});
