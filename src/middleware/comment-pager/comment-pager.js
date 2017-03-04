export const getPagedPayload =
  ({
    list,
    pagedListLength,
    numToAdd = 0,
    defaultToLoadAtOnce,
  }) => {
    // ensure we have a list that has replies paged for all entries
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
    let nextCountToLoad = defaultToLoadAtOnce;
    if (remainingToLoad < defaultToLoadAtOnce) {
      nextCountToLoad = remainingToLoad;
    }

    return {
      pagedList,
      nextCountToLoad,
    };
  };

// args: comments reducer state, sorters functions, options
// return: sortedCommentList array
export const getSortedComments = ({ comments, user, sortBy, sorters }) => {
  const { list } = comments;
  let sortedCommentList = Object.keys(list).map(key => list[key]);
  try {
    const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);
    sortedCommentList = sorters[sortByKey]({
      user,
      list: comments.list,
    });
    return sortedCommentList;
  } catch (err) {
    return sortedCommentList;
  }
};
