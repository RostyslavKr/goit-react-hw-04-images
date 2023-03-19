import { useEffect } from 'react';
import { BackDrop, ModalWindow } from './Modal.styled';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <BackDrop onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </BackDrop>
  );
}
