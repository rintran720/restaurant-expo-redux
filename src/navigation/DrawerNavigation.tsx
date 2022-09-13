import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack';
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
    </Drawer.Navigator>
  );
}
