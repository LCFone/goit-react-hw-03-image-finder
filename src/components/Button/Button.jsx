import React, { Component } from 'react';

export class LoadMore extends Component {
  render() {
    const { showLoadMore, handleLoadMore } = this.props;

    return (
      <div>
        {showLoadMore && (
          <button onClick={handleLoadMore} className="Button">
            Load More
          </button>
        )}
      </div>
    );
  }
}
