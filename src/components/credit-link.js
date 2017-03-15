import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const CreditLink = (props) => {
  const { id = 'english', translateText } = props;
  if (!id.includes('english')) {
    return (
      <div className="credit-link">
        <a href="/">
          <em>Comments Plugin</em>
        </a>
        <em className="translate-text pull-right">{translateText} <i className="flag-icon flag-icon-us" /></em>
      </div>
    );
  }
  return (
    <div className="credit-link">
      <a href="/">
        <em>Comments Plugin</em>
      </a>
    </div>
  );
};

CreditLink.propTypes = {
  id: PropTypes.string,
  translateText: PropTypes.string,
};

const mapStateToProps = state => ({
  ...state.sectionInfo,
});

export default connect(mapStateToProps)(CreditLink);
