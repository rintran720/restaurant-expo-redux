import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeStackScreens } from '../interfaces';
import HomeScreen from '../screens/HomeScreen';
import TableScreen from '../screens/TableScreen';

const Stack = createNativeStackNavigator<HomeStackScreens>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
    </Stack.Navigator>
  );
}
