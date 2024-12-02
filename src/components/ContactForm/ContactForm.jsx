import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required')
    .matches(nameRegex, {
      message:
        "Invalid name. Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.",
    }),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Number is required')
    .matches(numberRegex, {
      message:
        'Invalid number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
    }),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const nameId = nanoid();
  const numberId = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const handleSubmit = (values, actions) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      toast.error(`${values.name} is already in contacts.`);
      actions.resetForm();
      return;
    }
    dispatch(addContact({ id: nanoid(), ...values }));
    toast.success('New contact has been added to your phonebook');
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameId} className={css.label}>
          <span>Name</span>
        </label>
        <Field
          id={nameId}
          className={css.input}
          type="text"
          name="name"
          placeholder="Введіть ім'я"
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label htmlFor={numberId} className={css.label}>
          <span>Number</span>
        </label>
        <Field
          id={numberId}
          className={css.input}
          type="text"
          name="number"
          placeholder="Введіть телефон"
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
