import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableManagementScreen from '@screens/TableManagementScreen';

import DrawerMenuButton from '../container/DrawerMenuButton';
import TableDetailScreen from '../screens/TableDetailScreen';
import { getTableName } from '../utils/getTableName';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function TableManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TableManagement"
        component={TableManagementScreen}
        options={{
          headerShown: true,
          title: 'Table CMS',
          headerLeft: () => <DrawerMenuButton />,
        }}
      />
      <Stack.Screen
        name="TableDetail"
        component={TableDetailScreen}
        options={({ route }) => {
          return {
            title:
              route?.params?.action === 'CREATE'
                ? 'Create new product'
                : route?.params?.action === 'EDIT'
                ? getTableName(route?.params?.table).toString()
                : 'Table detail',
            headerShown: true,
          };
        }}
      />
    </Stack.Navigator>
  );
}
