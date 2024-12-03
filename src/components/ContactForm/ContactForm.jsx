import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { selectContacts } from '../../redux/contactsSlice';
import { addContact, editContact } from '../../redux/contactsOps';
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

export const ContactForm = ({
  initialValues = {
    name: '',
    number: '',
  },
  onCloseModal,
}) => {
  // const initialValues = {
  //   name: '',
  //   number: '',
  // };
  const nameId = nanoid();
  const numberId = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  // const handleSubmit = (values, actions) => {
  //   const isInContacts = contacts.some(
  //     ({ name }) => name.toLowerCase() === values.name.toLowerCase()
  //   );
  //   // if (isInContacts) {
  //   //   toast.error(`${values.name} is already in contacts.`);
  //   //   actions.resetForm();
  //   //   return;
  //   // }
  //   initialValues.name === ''
  //     ? dispatch(addContact({ ...values }))
  //     : dispatch(editContact({ ...values }));
  //   initialValues.name === ''
  //     ? toast.success('New contact has been added to your phonebook')
  //     : toast.success(`Contact ${values.name} is updated to your phonebook`);
  //   actions.resetForm();
  // };

  const handleSubmitAdding = (values, actions) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      toast.error(`${values.name} is already in contacts.`);
      actions.resetForm();
      return;
    }
    dispatch(addContact({ ...values }));
    toast.success('New contact has been added to your phonebook');
    actions.resetForm();
  };

  const handleSubmitEditing = (values, actions) => {
    dispatch(editContact({ ...values }));
    toast.success(`Contact ${values.name} is updated to your phonebook`);
    actions.resetForm();
    onCloseModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={
        initialValues.name === '' ? handleSubmitAdding : handleSubmitEditing
      }
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
        {initialValues.name === '' ? (
          <button type="submit">Add contact</button>
        ) : (
          <button type="submit">Edit</button>
        )}
      </Form>
    </Formik>
  );
};
