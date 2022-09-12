import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import DrawerNavigation from './DrawerNavigation';
import { navigationRef } from './Navigation';

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Root;
