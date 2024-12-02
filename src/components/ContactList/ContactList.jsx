import { useSelector } from 'react-redux';
// import { useToggle } from '../../hooks/useToggle';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { Contact } from '../Contact/Contact';
// import { ContactModal } from '../ContactModal/ContactModal';
import css from './ContactList.module.css';

export const ContactList = () => {
  // const { isOpenModal, openModal, closeModal } = useToggle();
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css['contact-list']}>
        {visibleContacts.length > 0 ? (
          visibleContacts.map(contact => (
            <li key={contact.id} className={css['contact-item']}>
              <Contact contact={contact} />
              {/* <Contact contact={contact} onModal={openModal} /> */}
            </li>
          ))
        ) : (
          <li className={css['contact-no-item']}>
            <p>Контакти вісутні</p>
          </li>
        )}
      </ul>
      {/* <ContactModal isOpenModal={isOpenModal} onCloseModal={closeModal} /> */}
    </>
  );
};
