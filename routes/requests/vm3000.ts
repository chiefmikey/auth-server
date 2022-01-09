import Router from '@koa/router';
import Snoowrap from 'snoowrap';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import auth from '../helpers/reddit/auth';
import {
  getControversialSubmissions,
  getHotSubmissions,
  getNewSubmissions,
  getRisingSubmissions,
  getTopSubmissions,
  getUserSubmissions,
} from '../helpers/reddit/submissions';

const router = new Router({ prefix: '/vm3000' });
let token: string;
let r: Snoowrap;

router.get(
  '/user',
  async (context: {
    request: { query: { subName: string } };
    response: { status: number; body: string };
  }) => {
    try {
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getUserSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
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
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getHotSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
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
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getRisingSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
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
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getControversialSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
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
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getNewSubmissions(
        r,
        context.request.query.subName,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
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
      if (!token) {
        token = await auth();
      }
      if (!r) {
        r = new Snoowrap({
          userAgent: 'View-Master 3000',
          accessToken: token,
        });
      }
      const response = await getTopSubmissions(
        r,
        context.request.query.subName,
        context.request.query.time,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

export default router;
