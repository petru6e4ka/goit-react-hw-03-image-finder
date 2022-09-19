import { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { api } from 'service/api';
import { Modal } from './Modal';

const INITIAL_STATE = {
  search: '',
  images: [],
  isLoading: false,
  isError: false,
  page: 1,
  isModalVisible: false,
  showImage: null,
};

export class App extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
    this.setSearch = this.setSearch.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.escapeHandler = this.escapeHandler.bind(this);
  }

  componentDidMount() {
    this.handleEscape();
  }

  async componentDidUpdate() {
    if (this.state.isLoading) {
      const response = await api.loadImages(this.state.search, this.state.page);

      this.setState(prevState => ({
        isLoading: response.isLoading,
        isError: response.isError,
        images: [
          ...prevState.images
            .concat(response.images)
            .sort()
            .filter((item, i, arr) => !i || item.id !== arr[i - 1].id),
        ],
      }));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeHandler);
  }

  setSearch(evt) {
    this.setState(() => ({ search: evt.target.value }));
  }

  loadImages(evt) {
    evt.preventDefault();

    this.setState(() => ({ isLoading: true, images: [], page: 1 }));
  }

  loadMore() {
    this.setState(prevState => ({ isLoading: true, page: prevState.page + 1 }));
  }

  openModal(showImage) {
    this.setState(() => ({
      isModalVisible: true,
      showImage,
    }));
  }

  closeModal() {
    this.setState(() => ({ isModalVisible: false }));
  }

  escapeHandler(evt) {
    if (evt.key === 'Escape') {
      this.closeModal();
    }
  }

  handleEscape() {
    document.addEventListener('keydown', this.escapeHandler);
  }

  render() {
    const { serach, images, isError, isLoading, isModalVisible, showImage } =
      this.state;

    return (
      <div className="App">
        <SearchBar
          value={serach}
          onChange={this.setSearch}
          onSubmit={this.loadImages}
        />
        {images.length ? (
          <>
            <ImageGallery images={images} onOpen={this.openModal} />
            {!isLoading && <Button onClick={this.loadMore} />}
          </>
        ) : (
          ''
        )}
        {isError ? <p className="Error">Please, try later</p> : ''}
        {isLoading ? <Loader /> : ''}
        <Modal
          isModalVisible={isModalVisible}
          onClose={this.closeModal}
          image={showImage}
        />
      </div>
    );
  }
}
