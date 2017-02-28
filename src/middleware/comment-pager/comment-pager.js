export const getNumberCommentsToLoad = ({
  defaultCommentsToShow,
  defaultCommentsToLoadAtOnce,
  pagedList,
  showMore,
}) => {
  // determine number of comments to load
  let numberCommentsToLoad = 0;
  if (typeof showMore === 'number') {
    numberCommentsToLoad = showMore;
  } else if (showMore) {
    // If we already have loaded default #, use default load at once
    if (!pagedList.length) {
      numberCommentsToLoad = defaultCommentsToShow;
    } else {
      numberCommentsToLoad = defaultCommentsToLoadAtOnce;
    }
  }
  return numberCommentsToLoad;
};

export const getPagedPayload =
  (sortedCommentList, pagedList, numberCommentsToLoad) => {
    if (sortedCommentList.length < numberCommentsToLoad) {
      return {
        pagedList: sortedCommentList,
        nextCountToLoad: 0,
      };
    }

    let pagedSortedList = sortedCommentList.slice(0, pagedList.length);

    if (numberCommentsToLoad > 0) {
      pagedSortedList = sortedCommentList;
      if ((pagedList.length + numberCommentsToLoad) < sortedCommentList.length) {
        pagedSortedList = sortedCommentList.slice(0, (pagedList.length + numberCommentsToLoad));
      }
    }

    const remainingToLoad = (sortedCommentList.length - pagedSortedList.length);
    let nextCountToLoad = numberCommentsToLoad;

    if (remainingToLoad < numberCommentsToLoad) {
      nextCountToLoad = remainingToLoad;
    }

    return {
      pagedList: pagedSortedList,
      nextCountToLoad,
    };
  };

// args: comments reducer state, sorters functions, options
// return: sortedCommentList array
export const getSortedComments = ({ comments, sorters, options: { sort } }) => {
  const { list, sortBy } = comments;
  let sortedCommentList = Object.keys(list).map(key => list[key]);
  try {
    const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);
    if (sort) {
      sortedCommentList = sorters[sortByKey](comments);
    }
    return sortedCommentList;
  } catch (err) {
    return sortedCommentList;
  }
};
