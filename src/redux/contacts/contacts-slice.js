import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./contacts-operation";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: {
        [fetchContacts.pending]: store => {
            store.loading = true;
            store.error = null;
        },
        [fetchContacts.fulfilled]: (store, { payload }) => {
            store.loading = false;
            store.items = payload;
        },
        [fetchContacts.rejected]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
        [addContact.pending]: store => {
            store.loading = true;
            store.error = null;
        },
        [addContact.fulfilled]: (store, { payload }) => {
            store.loading = false;
            store.items.push(payload);
        },
        [addContact.rejected]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
        [deleteContact.pending]: store => {
            store.loading = true;
            store.error = null;
        },
        [deleteContact.fulfilled]: (store, { payload }) => {
            store.loading = false;
            store.items = store.items.filter(item => item.id !== payload);
        },
        [deleteContact.rejected]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
    }
})

export default contactsSlice.reducer