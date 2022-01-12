import { Listing, Submission } from 'snoowrap';

const fetchMore = async (response: Listing<Submission> | never[]) => {
  try {
    return await (response as Listing<Submission>).fetchMore({
      amount: 128,
      append: false,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchMore;
