import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerMenuButton from '../container/DrawerMenuButton';
import ImportExportScreen from '../screens/ImportExportScreen';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function TableManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImportExport"
        component={ImportExportScreen}
        options={{
          headerShown: true,
          title: 'Import/Export',
          headerLeft: () => <DrawerMenuButton />,
        }}
      />
    </Stack.Navigator>
  );
}
