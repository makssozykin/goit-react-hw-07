import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { useToggle } from './hooks/useToggle';
import Title from './components/Title/Title';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from './components/ContactForm/ContactForm';
import { SearchBox } from './components/SearchBox/SearchBox';
import { ContactList } from './components/ContactList/ContactList';
import { ContactModal } from './components/ContactModal/ContactModal';
import { Loader } from './components/Loader/Loader';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.contacts);
  const [contact, setContact] = useState('');
  const { isOpenModal, openModal, closeModal } = useToggle();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactInfo = contact => {
    setContact(contact);
  };

  return (
    <div className="app">
      <Title title="Phonebook" />
      <ContactForm />
      <SearchBox />
      {loading && !error && <Loader />}
      {error && <p>{error}</p>}
      {items.length > 0 && (
        <ContactList openModal={openModal} contactInfo={contactInfo} />
      )}
      <ContactModal
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
        contact={contact}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
