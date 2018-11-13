import { https } from 'firebase-functions';

import { createHandler } from './build/ssr-build/ssr-bundle';
import { default as template } from './build/index.html';

const handler = createHandler(template);
export const app = https.onRequest(handler);
