import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

const DrawerMenuButton = () => {
  const navigator = useNavigation();

  const handleDrawer = useCallback(() => {
    (navigator as any).toggleDrawer();
  }, [navigator]);

  return (
    <Ionicons
      onPress={handleDrawer}
      name="menu"
      size={32}
      color="green"
      style={{ marginRight: 10 }}
    />
  );
};

export default DrawerMenuButton;
