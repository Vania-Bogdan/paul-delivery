import AddForm from "./AddForm/AddForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Loader from "./Loader/Loader";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { fetchContacts, addContact, deleteContact } from "redux/contacts/contacts-operation";
import {setFilter} from "redux/filter/filter-slice";

import { getFilter, visibleContacts, getLoaderStatus} from '../../redux/selectors';

export default function Phonebook() {
    
    const contacts = useSelector(visibleContacts)
    const filter = useSelector(getFilter)
    const isLoaderActive = useSelector(getLoaderStatus);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContacts()) 
    }, [dispatch])

    const onAddContact = (payload) => {
        const isContact = contacts.find(item => item.name.toLowerCase() === payload.name.toLowerCase());
        if (isContact) {
            alert(`${payload.name} is already in contact`);
            return
        }
        const action = addContact(payload);
        dispatch(action)
    }

    const onRemoveContact = (payload) => {
        dispatch(deleteContact(payload))
    }

    const onSetFilter = (event) => {
        dispatch(setFilter(event.target.value))
    };

    return (
            <Book>
                <h1>Phonebook</h1>
                <AddForm onSubmit={onAddContact} />
                <h2>Contacts</h2>
                <Filter filter={filter} onSetFilter={onSetFilter} />
                {isLoaderActive && <Loader />}
                {contacts.length === 0 ?
                <p>No contacts found</p> : 
                <div>
                    <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
                </div>
                }
            </Book>
        );
};

const Book = styled.div`
    border: 5px solid #000000;
    border-radius: 20px;
    box-shadow: 10px 10px 8px 2px rgb(0 0 0 / 30%);
    color: #000000;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    margin: 100px auto;
    padding: 20px;
    width: 500px;
    background-color: #00cab9;
`