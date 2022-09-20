import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from '@screens/ProductDetailScreen';
import ProductManagementScreen from '@screens/ProductManagementScreen';

import DrawerMenuButton from '../container/DrawerMenuButton';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function ProductManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagementScreen}
        options={{
          headerShown: true,
          title: 'Product CMS',
          headerLeft: (p) => <DrawerMenuButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => {
          return {
            title:
              route?.params?.action === 'CREATE'
                ? 'Create new table'
                : route?.params?.action === 'EDIT'
                ? route?.params?.product.name
                : 'Product detail',
            headerShown: true,
          };
        }}
      />
    </Stack.Navigator>
  );
}
