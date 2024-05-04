import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact, editContact } from "./contacts-operation";

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
        [editContact.pending]: store => {
            store.loading = true;
            store.error = null;
        },
        [editContact.fulfilled]: (store, { payload }) => {
            store.loading = false;
            // Оновити значення поля у відповідному елементі
            store.items = store.items.map(item => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
        },
        [editContact.rejected]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
    }
})

export default contactsSlice.reducer