import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR
} from "../Types";
import { disconnect } from "mongoose";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res =  await axios.post('api/contacts', contact,config);
      
    dispatch({ 
      type: ADD_CONTACT,
      payload: res.data });

    } catch (err) {
      dispatch({ 
         type: CONTACT_ERROR,
         payload: err.response.msg });
    }
  };

  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts');
      
    dispatch({ 
      type: GET_CONTACT,
      payload: res.data });

    } catch (err) {
      dispatch({ 
         type: CONTACT_ERROR,
         payload: err.response.msg });
    }
  };
  // Update Contact (Full CRUD)
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res =  await axios.put(`api/contacts/${contact._id}`, contact,config);
      
    dispatch({ 
      type: UPDATE_CONTACT,
      payload: res.data });

    } catch (err) {
      dispatch({ 
         type: CONTACT_ERROR,
         payload: err.response.msg });
    }
  };
  // Clear Contact 
  const clearContact = (id) => {
    dispatch({ type: CLEAR_CONTACTS });
  }; 
  // Delete Contact
  const deleteContact = async (id) => {
    try {
     await axios.delete(`api/contacts/${id}`);
      
    dispatch({ 
      type: DELETE_CONTACT,
      payload: id });

    } catch (err) {
      dispatch({ 
         type: CONTACT_ERROR,
         payload: err.response.msg });
    }
  };  
  // Set Current Contact
  const setCurrent = (contact) => {

    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contact
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
