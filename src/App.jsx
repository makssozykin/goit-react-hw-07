import Title from './components/Title/Title';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from './components/ContactForm/ContactForm';
import { SearchBox } from './components/SearchBox/SearchBox';
import { ContactList } from './components/ContactList/ContactList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Title title="Phonebook" />
      <ContactForm />
      <SearchBox />
      <ContactList />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
