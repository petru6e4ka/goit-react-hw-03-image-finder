import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const stopPropagation = evt => {
  evt.stopPropagation();
};

export const Modal = ({ isModalVisible, image, onClose }) => {
  return isModalVisible
    ? createPortal(
        <div className="Overlay" onClick={onClose}>
          <div className="Modal" onClick={stopPropagation}>
            <img src={image.largeImageURL} alt={image.tags} />
          </div>
        </div>,
        document.body
      )
    : '';
};

Modal.propTypes = {
  isModalVisible: PropTypes.bool,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
