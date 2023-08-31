import { ContactListStyle, ContactItemStyle } from "./ContactsList.styled"
import { ButtonStyle } from 'components/App.styled';
import { getFilter } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPhoneBookValue } from "redux/phoneBookSlice";
import { delContactThunk, getContactsThunk } from "services/fetchContacts";
import { useEffect } from "react";

export const ContactsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContactsThunk())
    }, [dispatch]);

    const phoneBook = useSelector(getPhoneBookValue);
    const filterPhoneBook = useSelector(getFilter);

    const lowerFilter = filterPhoneBook.toLowerCase();
    const visibleContacts = phoneBook.filter(({ name }) =>
        (name.toLowerCase().includes(lowerFilter)));
  
    const deleteContact = (contactId) => {
        dispatch(delContactThunk(contactId))
    };
    
    return (
        <ContactListStyle>
            {visibleContacts.map(({ name, number, id }) => (
                <ContactItemStyle key={id}>
                    <p>{name}: {number}</p>
                    <ButtonStyle type="button" onClick={() => deleteContact(id)}>Delete</ButtonStyle>
                </ContactItemStyle>))}
        </ContactListStyle>
    );
};