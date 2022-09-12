import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

const TableScreen = () => {
  const navigator = useNavigation();
  return <Button title="This is Table page" />;
};

export default TableScreen;
