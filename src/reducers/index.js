import { combineReducers } from 'redux';
import comments from './comments';
import sectionInfo from './section-info';
import sortBy from './sortby';
import user from './user';
import { reducer as commentPager } from '../middleware/comment-pager';

const rootReducer = combineReducers({
  comments,
  commentPager,
  sectionInfo,
  sortBy,
  user,
});

export default rootReducer;
