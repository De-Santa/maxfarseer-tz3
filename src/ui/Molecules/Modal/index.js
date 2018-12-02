import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import T from 'prop-types';
import { SvgSprite } from "../../Atoms/SvgSprite"
import bemHelper from 'utils/bem-helper';
import './styles.scss';

const cn = bemHelper('modal');
const modalRoot = document.getElementById('modal');

export class Modal extends Component {
  modalRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this._onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onClickOutside);
  }

  _onClickOutside = (e) => {
    !e.target.closest('.modal__window') && this.handleClose();
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { children } = this.props;

    const modal = (
      <div {...cn()}>
        <div {...cn('window')} ref={this.modalRef}>
          <SvgSprite
            mix={cn('close').className}
            use="cross"
            onClick={this.handleClose}
          />
          <div {...cn('content')}>
            {children}
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      modal,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: T.node.isRequired,
  onClose: T.func.isRequired
};
