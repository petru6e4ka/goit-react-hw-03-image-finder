import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onOpen }) => {
  const openMore = () => {
    onOpen(image);
  };

  return (
    <li className="ImageGalleryItem" onClick={openMore}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItemImage"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onOpen: PropTypes.func.isRequired,
};
