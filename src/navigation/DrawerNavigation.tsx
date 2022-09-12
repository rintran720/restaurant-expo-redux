import { createDrawerNavigator } from '@react-navigation/drawer';

import ReportScreen from '../screens/ReportScreen';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen name="Report" component={ReportScreen} />
    </Drawer.Navigator>
  );
}
