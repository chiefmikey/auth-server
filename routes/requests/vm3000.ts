import Router from '@koa/router';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import fetchMore from '../helpers/reddit/fetchMore';
import {
  getControversialSubmissions,
  getHotSubmissions,
  getNewSubmissions,
  getRisingSubmissions,
  getTopSubmissions,
  getUserSubmissions,
} from '../helpers/reddit/submissions';
import token from '../helpers/reddit/token';

let response: Listing<Submission> | never[] = [];

const router = new Router({ prefix: '/vm3000' });

router.get(
  '/user',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getUserSubmissions(r, context.request.query.subName);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/hot',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getHotSubmissions(r, context.request.query.subName);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/rising',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getRisingSubmissions(r, context.request.query.subName);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/controversial',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getControversialSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/new',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getNewSubmissions(r, context.request.query.subName);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/top',
  async (context: {
    request: { query: { subName: string; time: Timespan } };
    response: { status: number; body: string };
  }) => {
    try {
      const apiToken = await token();
      const r = new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: apiToken,
      });
      response = await getTopSubmissions(
        r,
        context.request.query.subName,
        context.request.query.time,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/more',
  async (context: { response: { status: number; body: string } }) => {
    try {
      response = await fetchMore(response);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 200;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

export default router;
