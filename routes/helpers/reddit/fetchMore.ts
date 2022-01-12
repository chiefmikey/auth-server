import { Listing, Submission } from 'snoowrap';

const fetchMore = (response: Listing<Submission> | any[]) => {
  return (response as Listing<Submission>).fetchMore({
    amount: 128,
    append: false,
  });
};

export default fetchMore;
