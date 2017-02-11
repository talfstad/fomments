import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../main';

class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'fomments-modal';
    document.body.appendChild(this.modalTarget);
    this.renderer();
  }

  componentWillUpdate() {
    this.renderer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  renderer() {
    const { marginTop } = this.props;

    ReactDOM.render(
      <Provider store={store}>
        <div>
          <div className="fomments-modal-bg" />
          <div style={{ marginTop }} className="fomments-modal-content">
            {this.props.children}
          </div>
        </div>
      </Provider>,
      this.modalTarget);
  }

  render() {
    return <noscript />;
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  marginTop: PropTypes.number,
};

export default Modal;
