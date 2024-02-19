// import { render } from '@testing-library/react';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape' && this.props.isOpen) {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { isOpen, data, tags } = this.props;
    return (
      isOpen && (
        <div className="Overlay" onClick={this.handleOverlayClick}>
          <div className="Modal">
            <img src={data} alt={tags} />
          </div>
        </div>
      )
    );
  }
}
