import { combineReducers } from 'redux';
import comments from './comments';
import { reducer as commentPager } from '../middleware/comment-pager';

const rootReducer = combineReducers({
  comments,
  commentPager,
});

export default rootReducer;
