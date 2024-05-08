import axios from "axios";

const instance = axios.create({
    baseURL: "https://631de489789612cd07b2575a.mockapi.io/W2_products"
})

export const getContacts = async () => {
    const { data } = await instance.get('/');
    return data;
};

export const addContact = async data => {
    const { data: result } = await instance.post('/', data);
    return result;
};

export const deleteContact = async id => {
    const { data: result } = await instance.delete(`/${id}`);
    return result;
};

export const editContact = async ({ id, quantity }) => {
    const { data: result } = await instance.put(`/${id}`, quantity);
    return result;
};