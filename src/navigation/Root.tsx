import { NavigationContainer } from '@react-navigation/native';
import { store } from '@state/store';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import DrawerNavigation from './DrawerNavigation';
import { navigationRef } from './Navigation';

const persistor = persistStore(store);
const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef}>
          <DrawerNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Root;
