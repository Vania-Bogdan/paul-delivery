import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../../api/apiServise';

export const fetchContacts = createAsyncThunk(
    'contacts/fetch',
    async (_, thunkAPI) => {
        try {
            const data = await api.getContacts();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/add',
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.addContact(data);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/remove',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteContact(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editContact = createAsyncThunk(
    'contacts/edit',
    async (id, quantity, { rejectWithValue }) => {
        try {
            await api.editContact(id, quantity);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);