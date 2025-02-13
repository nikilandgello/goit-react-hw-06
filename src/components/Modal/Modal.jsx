import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <svg onClick={onClose} className={css.closeIcon} width={25} height={25}>
          <use href="sprite.svg#icon-close"></use>
        </svg>
        {children}
      </div>
    </div>
  );
};

export default Modal;
