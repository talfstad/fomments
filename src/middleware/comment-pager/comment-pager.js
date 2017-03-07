import moment from 'moment';

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

export const setDateOnComment = (comment) => {
  const { date, relativeDate } = comment;

  if (!date && relativeDate) {
    // set relative date (used for all non-user comments)
    const now = (moment().unix()) * 1000;
    return now - relativeDate;
  }

  return date;
};

// Aggregate keys are keys in comments that are calculated
// and not stored.
// (date bases itself on relative date, etc.)
export const setAggregateKeys = ({ list }) =>
  Object.keys(list).map((key) => {
    const comment = list[key];

    // return new object with updated aggregates.
    return {
      ...comment,
      date: setDateOnComment(comment),
    };
  });

// args: comments reducer state, sorters functions, options
// return: sortedCommentList array
export const getSortedComments = ({ comments, user, sortBy, sorters }) => {
  const { list } = comments;
  const updatedList = setAggregateKeys({ list });
  try {
    const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);
    const sortedCommentList = sorters[sortByKey]({
      user,
      list: updatedList,
    });
    return sortedCommentList;
  } catch (err) {
    return updatedList;
  }
};
