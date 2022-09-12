import { navigate } from '@navigation/Navigation';
import React from 'react';
import { Button } from 'react-native';

const HomeScreen = () => {
  return (
    <Button
      title="Go to Table page"
      onPress={() => {
        navigate('Table');
      }}
    />
  );
};

export default HomeScreen;
