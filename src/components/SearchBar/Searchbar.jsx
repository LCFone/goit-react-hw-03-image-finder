import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    tags: '',
  };

  onInputChange = event => {
    const inputValue = event.target.value.toLowerCase();
    this.setState({ tags: inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.tags);
    if (!this.state.tags.trim() === '') {
      toast.error('Введіть щось у поле');
      return;
    }
    this.setState({ tags: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button ">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.tags}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
