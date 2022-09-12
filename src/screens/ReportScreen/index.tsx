import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

const ReportScreen = () => {
  const navigator = useNavigation();
  return <Button title="This is Report page" />;
};

export default ReportScreen;
