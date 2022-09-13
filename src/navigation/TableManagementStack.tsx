import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getTableName } from '@utils/getTableName';

import TableDetailScreen from '../screens/TableDetailScreen';
import TableManagement from '../screens/TableManagementScreen';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function TableManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TableManagement"
        component={TableManagement}
        options={{ headerShown: true, title: 'Table CMS' }}
      />
      <Stack.Screen
        name="TableDetail"
        component={TableDetailScreen}
        options={({ route }) => {
          return {
            title:
              route?.params?.action === 'CREATE'
                ? 'Create new table'
                : route?.params?.action === 'EDIT'
                ? getTableName(route?.params?.table)
                : 'Table detail',
            headerShown: true,
          };
        }}
      />
    </Stack.Navigator>
  );
}
