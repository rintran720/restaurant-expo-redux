import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

const HomeScreen = () => {
  const navigator = useNavigation();
  return (
    <Button
      title="Go to Table page"
      onPress={() => {
        navigator.navigate('Table');
      }}
    />
  );
};

export default HomeScreen;
