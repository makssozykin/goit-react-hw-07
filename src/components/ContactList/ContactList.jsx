import { useSelector } from 'react-redux';
import { Contact } from '../Contact/Contact';
import css from './ContactList.module.css';

const getVisibleContacts = (contacts, filterName) => {
  if (filterName) {
    return contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(filterName.toLowerCase())
    );
  }
  return contacts;
};

export const ContactList = () => {
  const selectContacts = useSelector(state => state.contacts.items);
  const filterName = useSelector(state => state.filters.name);
  const visibleContacts = getVisibleContacts(selectContacts, filterName);
  return (
    <ul className={css['contact-list']}>
      {visibleContacts.length > 0 ? (
        visibleContacts.map(contact => (
          <li key={contact.id} className={css['contact-item']}>
            <Contact contact={contact} />
          </li>
        ))
      ) : (
        <li className={css['contact-no-item']}>
          <p>Контакти вісутні</p>
        </li>
      )}
    </ul>
  );
};
