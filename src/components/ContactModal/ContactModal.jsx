import Modal from 'react-modal';
import { ContactForm } from '../ContactForm/ContactForm';
import { IoMdClose } from 'react-icons/io';
import s from './ContactModal.module.css';

export const ContactModal = ({ isOpenModal, onCloseModal }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.modalForm}>
        <button className={s.closeBtn} onClick={onCloseModal}>
          <IoMdClose className={s.closeBtnSvg} />
        </button>
        <ContactForm />
      </div>
    </Modal>
  );
};
