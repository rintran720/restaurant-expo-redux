import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack';
import ImportExportStack from './ImportExportStack';
import ProductManagementStack from './ProductManagementStack';
import TableManagementStack from './TableManagementStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen
        name="TableManagement"
        component={TableManagementStack}
        options={{ headerShown: false, title: 'Table Management' }}
      />
      <Drawer.Screen
        name="ProductManagement"
        component={ProductManagementStack}
        options={{ headerShown: false, title: 'Product Management' }}
      />
      <Drawer.Screen
        name="ImportExportStack"
        component={ImportExportStack}
        options={{ headerShown: false, title: 'Import/Export' }}
      />
    </Drawer.Navigator>
  );
}
