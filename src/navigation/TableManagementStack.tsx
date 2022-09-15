import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableManagementScreen from '@screens/TableManagementScreen';

import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function TableManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TableManagement"
        component={TableManagementScreen}
        options={{ headerShown: true, title: 'Table CMS' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => {
          return {
            title:
              route?.params?.action === 'CREATE'
                ? 'Create new product'
                : route?.params?.action === 'EDIT'
                ? route?.params?.product?.name
                : 'Product detail',
            headerShown: true,
          };
        }}
      />
    </Stack.Navigator>
  );
}