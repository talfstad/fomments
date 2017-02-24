import React, { Component, PropTypes } from 'react';
import { messageResponder } from '../iframe-messaging';
import * as messageActions from '../actions/iframe';

class Iframe extends Component {
  render() {
    const { sectionId, src } = this.props;

    return (
      <iframe
        ref={(c) => { this.el = c; }}
        id={sectionId}
        src={src}
        marginHeight="50"
        width="100%"
        frameBorder="0"
      />
    );
  }
}

Iframe.propTypes = {
  sectionId: PropTypes.string,
  src: PropTypes.string,
};

export default messageResponder(messageActions)(Iframe);
