import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import DrawerNavigation from './DrawerNavigation';

const Root = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Root;
