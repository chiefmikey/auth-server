import { Listing, Submission } from 'snoowrap';

const fetchMore = (response: Listing<Submission>) => {
  return response.fetchMore({
    amount: 128,
    append: false,
  });
};

export default fetchMore;
