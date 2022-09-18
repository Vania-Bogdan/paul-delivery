export const getFilter = ({ filter }) => filter;

export const visibleContacts = ({ filter, contacts }) => {
    if (!filter) {
        return contacts.items;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.items.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
};

export const getLoaderStatus = ({ contacts }) => contacts.loading;