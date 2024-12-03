import { useSelector } from 'react-redux';

import { selectFilteredContacts } from '../../redux/contactsSlice';
import { Contact } from '../Contact/Contact';

import css from './ContactList.module.css';

export const ContactList = ({ openModal, contactInfo }) => {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css['contact-list']}>
        {visibleContacts.length > 0 ? (
          visibleContacts.map(contact => (
            <li key={contact.id} className={css['contact-item']}>
              {/* <Contact contact={contact} /> */}
              <Contact
                contact={contact}
                onModal={openModal}
                contactInfo={contactInfo}
              />
            </li>
          ))
        ) : (
          <li className={css['contact-no-item']}>
            <p>Контакти вісутні</p>
          </li>
        )}
      </ul>
    </>
  );
};
