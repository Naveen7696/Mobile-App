import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getContacts} from '../../actions';
import Async from '../Async/Async';
import ContactStyles from './ContactStyles';
import ContactBox from './ContactBox';
import {AppStore, ContactTypes} from '../../types';

const ContactDisplayScreen = () => {
  const contacts = useSelector(
    (state: AppStore) => state.contactsReducer.contacts,
  );
  const asyncState = useSelector(
    (state: AppStore) => state.contactsReducer.asyncState,
  );
  const error = useSelector((state: AppStore) => state.contactsReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  },[]);

  return (
    <Async
      uiState={asyncState}
      onSuccess={() => {
        return (
          <ScrollView>
            <View style={ContactStyles.container}>
              {contacts.map((contact: ContactTypes) => (
                <ContactBox key={contact.email} contact={contact} />
              ))}
            </View>
          </ScrollView>
        );
      }}
      error={error}
    />
  );
};

export default ContactDisplayScreen;
