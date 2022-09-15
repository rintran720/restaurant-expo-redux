import { AppRootParamsList } from '@interfaces/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductManagementScreen from '@screens/ProductManagementScreen';
import ProductDetailScreen from '@screens/TableDetailScreen';
import { getTableName } from '@utils/getTableName';

const Stack = createNativeStackNavigator<AppRootParamsList>();

export default function ProductManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagementScreen}
        options={{ headerShown: true, title: 'Product CMS' }}
      />
      <Stack.Screen
        name="TableDetail"
        component={ProductDetailScreen}
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
