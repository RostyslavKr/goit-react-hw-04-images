import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getImages } from 'services/getImages';
import { ToastContainer, toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [textSearch, setTextSearch] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [totalHits, setTotlaHits] = useState(null);

  useEffect(() => {
    if (!textSearch) {
      return;
    }
    setStatus(Status.PENDING);

    getImages(textSearch, page)
      .then(images => {
        if (images.hits.length !== 0) {
          setImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
          setTotlaHits(images.totalHits);
          setStatus(Status.RESOLVED);
        } else {
          toast.warn(
            'There are no images for this request, please try another one!!!',
            { autoClose: 8000 }
          );
          setStatus(Status.IDLE);
          return;
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [textSearch]);
  useEffect(() => {
    if (page === 1) {
      return;
    }
    getImages(textSearch, page)
      .then(images => {
        if (images.hits.length !== 0) {
          setImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
          setTotlaHits(images.totalHits);
          setStatus(Status.RESOLVED);
        } else {
          toast.warn(
            'There are no images for this request, please try another one!!!',
            { autoClose: 8000 }
          );
          setStatus(Status.IDLE);
          return;
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);
  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onShowModal = id => {
    const image = images.find(image => image.id === id);
    setLargeImage(image.largeImageURL);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <div>
      <Searchbar onSearch={handleSubmit} />
      {status === Status.IDLE && <></>}
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <ImageGallery
          openModal={toggleModal}
          handleView={onShowModal}
          images={images}
        />
      )}
      {status === Status.REJECTED && <div>{error.message}</div>}

      {images.length > 0 && images.length !== totalHits && (
        <Button decrementPage={onLoadMore} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={textSearch} width={800} height={500} />
        </Modal>
      )}
    </div>
  );
}
