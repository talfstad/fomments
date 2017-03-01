export const getPagedPayload =
  ({ list, pagedListLength, numToAdd }) => {
    if (list.length < numToAdd) {
      return {
        pagedList: list,
        nextCountToLoad: 0,
      };
    }

    let pagedList = list.slice(0, pagedListLength);

    if (numToAdd > 0) {
      pagedList = list;
      if ((pagedListLength + numToAdd) < list.length) {
        pagedList = list.slice(0, (pagedListLength + numToAdd));
      }
    }

    const remainingToLoad = (list.length - pagedList.length);
    let nextCountToLoad = numToAdd;

    if (remainingToLoad < numToAdd) {
      nextCountToLoad = remainingToLoad;
    }

    return {
      pagedList,
      nextCountToLoad,
    };
  };

// args: comments reducer state, sorters functions, options
// return: sortedCommentList array
export const getSortedComments = ({ comments, sorters }) => {
  const { list, sortBy } = comments;
  let sortedCommentList = Object.keys(list).map(key => list[key]);
  try {
    const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);
    sortedCommentList = sorters[sortByKey](comments);

    // Return the sorted comments and sorted replies
    return sortedCommentList.map((comment) => {
      const commentWithSortedReplies = comment;
      const { replies } = commentWithSortedReplies;
      commentWithSortedReplies.replies = sorters.oldest(replies);
      return commentWithSortedReplies;
    });
  } catch (err) {
    return sortedCommentList;
  }
};
