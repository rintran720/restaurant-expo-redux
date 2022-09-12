import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import TableScreen from '@screens/TableScreen';
import { getTableName } from '@utils/getTableName';
import { Button } from 'react-native';

import { navigate } from './Navigation';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigate('Report', {})}
              title="Add"
              color="#44CFCB"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Table"
        component={TableScreen}
        options={({ route }) => {
          return { title: getTableName(route?.params?.table) };
        }}
      />
    </Stack.Navigator>
  );
}
