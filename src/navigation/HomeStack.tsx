import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import TableScreen from '@screens/TableScreen';
import { getTableName } from '@utils/getTableName';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="Table"
        component={TableScreen}
        options={({ route }) => {
          return { title: getTableName(route?.params?.table).toString() };
        }}
      />
    </Stack.Navigator>
  );
}
