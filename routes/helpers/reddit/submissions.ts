import Snoowrap from 'snoowrap';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

export const getUserSubmissions = async (r: Snoowrap, user: string) => {
  try {
    return await r.getUser(user).getSubmissions({ limit: 128 });
  } catch {
    return [];
  }
};

export const getTopSubmissions = async (
  r: Snoowrap,
  sub: string,
  time: Timespan,
) => {
  try {
    return await r.getSubreddit(sub).getTop({ time, limit: 128 });
  } catch {
    return [];
  }
};

export const getNewSubmissions = async (r: Snoowrap, sub: string) => {
  try {
    return await r.getSubreddit(sub).getNew({ limit: 128 });
  } catch {
    return [];
  }
};

export const getHotSubmissions = async (r: Snoowrap, sub: string) => {
  try {
    return await r.getSubreddit(sub).getHot({ limit: 128 });
  } catch {
    return [];
  }
};

export const getRisingSubmissions = async (r: Snoowrap, sub: string) => {
  try {
    return await r.getSubreddit(sub).getRising({ limit: 128 });
  } catch {
    return [];
  }
};

export const getControversialSubmissions = async (r: Snoowrap, sub: string) => {
  try {
    return await r.getSubreddit(sub).getControversial({ limit: 128 });
  } catch {
    return [];
  }
};

export const getSearchSubmissions = async (
  r: Snoowrap,
  keyword: string,
  sub: string,
  filter: 'relevance' | 'hot' | 'top' | 'new' | 'comments' | undefined,
) => {
  try {
    if (sub) {
      if (filter) {
        return await r.search({
          query: keyword,
          subreddit: sub,
          sort: filter,
          limit: 128,
          show: 'all',
        });
      }
      return await r.search({
        query: keyword,
        subreddit: sub,
        limit: 128,
        show: 'all',
      });
    }
    if (filter) {
      return await r.search({
        query: keyword,
        sort: filter,
        limit: 128,
        show: 'all',
      });
    }
    return await r.search({
      query: keyword,
      limit: 128,
      show: 'all',
    });
  } catch (error) {
    console.log('Submission error', error);
    return [];
  }
};
