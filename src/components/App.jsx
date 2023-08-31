import { Form } from "./Form/Form";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { Loader } from "./Loader/Loader";
import { Error } from "./Error/Error";
import { Container } from "./App.styled";
import { useSelector } from "react-redux";
import { getError, getIsLoading, getPhoneBookValue } from "redux/phoneBookSlice";

export const App = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const phoneBook = useSelector(getPhoneBookValue);

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      {phoneBook.length === 0 && !error && !isLoading ? "You don't have any contacts yet" : <Filter />}
      {isLoading && <Loader />}
      {error ? <Error /> : <ContactsList />}
    </Container>
  )
};