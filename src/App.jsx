import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import Title from './components/Title/Title';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from './components/ContactForm/ContactForm';
import { SearchBox } from './components/SearchBox/SearchBox';
import { ContactList } from './components/ContactList/ContactList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="app">
      <Title title="Phonebook" />
      <ContactForm />
      <SearchBox />
      {loading && !error && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {items.length > 0 && <ContactList />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
