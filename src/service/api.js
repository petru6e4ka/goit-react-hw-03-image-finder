const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const API_KEY = '30026441-2c163c7ce375dc3616a167dea';
const PER_PAGE = 12;

const loadImages = async (term, page) => {
  try {
    const response = await axios.get(
      `${URL}?q=${term}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );

    if (response.status === 200) {
      return { isLoading: false, isError: false, images: response.data.hits };
    }
  } catch (err) {
    return { isLoading: false, isError: true, images: [] };
  }
};

export const api = {
  loadImages,
};
