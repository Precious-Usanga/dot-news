import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;
const BASE_URL_VERSION = environment.BASE_URL_VERSION.v2;

export const Endpoint = {
  EVERYTHING: `${BASE_URL}/${BASE_URL_VERSION}/everything`,
  TOP_HEADLINES: `${BASE_URL}/${BASE_URL_VERSION}/top-headlines`,
  SOURCES: `${BASE_URL}/${BASE_URL_VERSION}/top-headlines/sources`,
}
