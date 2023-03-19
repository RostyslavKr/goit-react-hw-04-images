export const getImages = (searchText, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchText}&page=${page}&key=32888012-43d6bfcd82cdab993f3e07c85&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        'There are no images for this request, please try another one!!!'
      )
    );
  });
};
