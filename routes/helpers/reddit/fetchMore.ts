import { Listing, Submission } from 'snoowrap';

const fetchMore = async (response: Listing<Submission> | never[]) => {
  return await (response as Listing<Submission>).fetchMore({
    amount: 128,
    append: false,
  });
};

export default fetchMore;
