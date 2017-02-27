import commentPagerReducer from './reducer';
import { SET_PAGED_COMMENT_LIST } from './types';

export const reducer = commentPagerReducer;

export default (sorters = {}) => store => next => (action) => {
  const { dispatch } = store;
  const { pageComments } = action;

  // If no listChanged attr do nothing
  if (!pageComments) return next(action);

  function handleListChanged() {
    const state = store.getState();
    const { comments, commentPager } = state;
    const {
      defaultCommentsToShow,
      defaultCommentsToLoadAtOnce,
      sortBy,
    } = comments;
    const {
      pagedList,
    } = commentPager;

    const [sortByKey] = Object.keys(sortBy).filter(key => sortBy[key]);

    try {
      const sortedList = sorters[sortByKey](comments);

      if (sortedList.length < defaultCommentsToShow) {
        dispatch({
          type: SET_PAGED_COMMENT_LIST,
          payload: {
            pagedList: sortedList,
            nextCountToLoad: 0,
          },
        });
      } else {
        let pagedSortedList = sortedList;

        if ((pagedList.length + defaultCommentsToLoadAtOnce) < sortedList.length) {
          pagedSortedList = sortedList.slice(0, (pagedList.length + defaultCommentsToLoadAtOnce));
        }

        const remainingToLoad = (sortedList.length - pagedSortedList.length);
        let nextCountToLoad = defaultCommentsToLoadAtOnce;

        if (remainingToLoad < defaultCommentsToLoadAtOnce) {
          nextCountToLoad = remainingToLoad;
        }

        dispatch({
          type: SET_PAGED_COMMENT_LIST,
          payload: {
            pagedList: pagedSortedList,
            nextCountToLoad,
          },
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  next(action);
  return handleListChanged();
};
