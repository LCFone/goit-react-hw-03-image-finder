import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './SearchBar/Searchbar';  
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';

import { requestHits } from 'services/api';

export class App extends Component {

  state = {
    modal: {
      isOpen: false,
      modalData: null
    },
    hits: [],
    isLoading: false,
    error: null,
    tags: '',
    page: 1,
    query: '',
    showLoadMore: false
  };

  fetchHits = async () => {
    try {
      this.setState({ isLoading: true });

      const response = await requestHits(this.state.query, this.state.page);

      if (response.hits.length === 0) {
        toast.error('No results found for this search. Please try again.');
        return;
      }

      if (this.state.page === 1) {
        this.setState({
          hits: response.hits,
          showLoadMore: true
        });
      } else {
        this.setState({
          hits: [...this.state.hits, ...response.hits],
          showLoadMore: true 
        });
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchHits();
    }
  }

  handleSubmit = tags => {
    this.setState({ query: tags, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        modalData: modalData
      }
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        modalData: null
      }
    });
  };

  render() {
    return (
      <>
        <Searchbar 
          onInputChange={this.onInputChange}
          onSubmit={this.handleSubmit} 
        />
        
        <ToastContainer autoClose={4000} />

        <ImageGallery 
          hits={this.state.hits}
          onOpenModal={this.onOpenModal} 
        />

        <Loader 
          loading={this.state.isLoading}
          error={this.state.error} 
        />

        {this.state.hits.length > 0 && (
          <LoadMore
            handleLoadMore={this.handleLoadMore}
            showLoadMore={this.state.showLoadMore}  
          />
        )}

        <Modal
          onCloseModal={this.onCloseModal}
          data={this.state.modal.modalData}
          isOpen={this.state.modal.isOpen}
        />
      </>
    );
  }

}