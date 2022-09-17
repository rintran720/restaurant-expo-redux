import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImportExportScreen from '../screens/ImportExportScreen';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function TableManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImportExport"
        component={ImportExportScreen}
        options={{ headerShown: true, title: 'Import/Export' }}
      />
    </Stack.Navigator>
  );
}
