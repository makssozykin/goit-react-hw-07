import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './contactsOps';
import { selectFilterNameContact } from './filtersSlice';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsReducer = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const item = state.items.find(item => item.id === action.payload.id);
        item.name = action.payload.name;
        item.number = action.payload.number;
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterNameContact],
  (items, name) =>
    name
      ? items.filter(item =>
          item.name.toLowerCase().startsWith(name.toLowerCase())
        )
      : items
);

export default contactsReducer.reducer;
