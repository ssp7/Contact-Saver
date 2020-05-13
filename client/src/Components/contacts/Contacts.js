import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../Context/Contact/contactContext";
import Spinner from "../Layouts/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(()=>{
    getContacts();
    // eslint-disable-next-line
  },[])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (<TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              /* eslint-disable */
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>) : <Spinner />}
    </Fragment>
  );
};
export default Contacts;
