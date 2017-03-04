import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as commentActions from '../actions/comments';

class Header extends Component {

  getCurrentSortBy() {
    const { sortBy } = this.props;
    const keys = Object.keys(sortBy);
    const [currentKey] = keys.filter(key => sortBy[key]);
    return currentKey || '';
  }

  handleSortBy(e) {
    e.preventDefault();
    const { changeSortBy } = this.props;
    const sortby = e.currentTarget.getAttribute('data-sortby');
    changeSortBy(sortby);
  }

  buildSortByMenu() {
    const { sortBy } = this.props;

    const buildListItems = () => {
      const keys = Object.keys(sortBy);
      return keys.map(key =>
        <li key={key}>
          <a onClick={e => this.handleSortBy(e)} data-sortby={key} className={sortBy[key] ? 'active' : ''} href={`${key}`}>{`${key}`}</a>
        </li>,
      );
    };

    return (
      <ul role="menu">
        {buildListItems()}
      </ul>
    );
  }

  render() {
    const { commentCount } = this.props;
    return (
      <div className="row header">
        <div className="comment-count pull-left">
          <em>{ commentCount } Comment{commentCount !== 1 ? 's' : '' }</em>
        </div>
        <div className="dropdown sort-by pull-right">
          <em>Sort by </em>
          <button className="dropdown-toggle" type="button" id="sort-by-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span> {this.getCurrentSortBy()} </span>
            <i className="down-arrow-icon" />
          </button>
          <div className="dropdown-menu" aria-labelledby="sort-by-dropdown">
            {this.buildSortByMenu()}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  commentCount: PropTypes.number,
  sortBy: PropTypes.shape({}),
  changeSortBy: PropTypes.func,
};

const mapStateToProps = state => ({
  commentCount: Object.keys(state.comments.list).length,
  sortBy: state.sortBy,
});

export default connect(mapStateToProps, commentActions)(Header);
