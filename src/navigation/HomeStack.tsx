import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import TableScreen from '@screens/TableScreen';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
    </Stack.Navigator>
  );
}
