export const getPagedPayload =
  ({ list, pagedListLength, numToAdd = 0, defaultRepliesToShow }) => {
    // ensure we have a list that has replies paged for all entries
    let listWithPagedReplies = list;
    if (defaultRepliesToShow) {
      listWithPagedReplies = list.map((comment) => {
        const updatedComment = comment;
        const {
          replies,
          pagedReplies,
        } = updatedComment;
        // Only page replies if we haven't already
        if (replies && !pagedReplies) {
          const repliesArr = Object.keys(replies).map(key => replies[key]);
          updatedComment.pagedReplies = getPagedPayload({
            list: repliesArr,
            pagedListLength: 0,
            numToAdd: defaultRepliesToShow,
          });
        }
        return updatedComment;
      });
    }

    if (listWithPagedReplies.length < numToAdd) {
      return {
        pagedList: listWithPagedReplies,
        nextCountToLoad: 0,
      };
    }
    let pagedList = listWithPagedReplies.slice(0, pagedListLength);
    if (numToAdd > 0) {
      pagedList = listWithPagedReplies;
      if ((pagedListLength + numToAdd) < listWithPagedReplies.length) {
        pagedList = listWithPagedReplies.slice(0, (pagedListLength + numToAdd));
      }
    }

    const remainingToLoad = (listWithPagedReplies.length - pagedList.length);
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
