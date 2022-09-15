import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { productActions } from '../../state/product';
import { productsSelector } from '../../state/product/selector';
import { Product } from '../../state/product/types';
import { useAppDispatch } from '../../state/store';

const ProductDetailScreen = () => {
  const navigator = useNavigation();
  const { params } = useRoute<any>();
  const { product, action } = useMemo(() => {
    return params;
  }, [params]);

  const [no, onChangeNo] = React.useState(
    product?.productId !== undefined ? product.productId.toString() : '',
  );
  const [name, onChangeName] = React.useState(
    product?.name !== undefined ? product.name : '',
  );
  const [cost, onChangeCost] = React.useState(
    product?.cost !== undefined ? product.cost : '',
  );
  const products = useSelector(productsSelector);
  const dispatch = useAppDispatch();

  const onCreateProduct = useCallback(() => {
    switch (action) {
      case 'CREATE': {
        const parsedProductId = no;
        const parsedCost = parseInt(cost, 10);
        if (!parsedProductId) {
          Alert.alert('Have to enter code of product');
        } else if (parsedCost < 0) {
          Alert.alert('Have to enter cost of product');
        } else if (
          !products.find((t: Product) => t.productId === parsedProductId)
        ) {
          dispatch(
            productActions.createProduct({
              productId: parsedProductId,
              cost: parsedCost,
              name,
            }),
          );
          navigator.goBack();
        } else {
          Alert.alert('The number of product is used');
        }
        break;
      }
      case 'EDIT': {
        const parsedProductId = no;
        const parsedCost = parseInt(cost, 10);
        if (!parsedProductId) {
          Alert.alert('Have to enter number of product' + parsedProductId);
        } else if (parsedCost < 0) {
          Alert.alert('Have to enter cost of product');
        } else if (
          products.find((t: Product) => t.productId === product?.productId)
        ) {
          dispatch(
            productActions.updateProduct({
              id: product?.productId,
              productId: parsedProductId,
              name,
              cost: parsedCost,
            }),
          );
          navigator.goBack();
        } else {
          Alert.alert('The number of product is not supported');
        }
        break;
      }
      default: {
        navigator.goBack();
      }
    }
  }, [
    action,
    cost,
    dispatch,
    name,
    navigator,
    no,
    product?.productId,
    products,
  ]);

  console.log(cost);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>No.</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNo}
        value={no}
        placeholder="No., ex: 1,2,3"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Name of the product</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name of product, maybe empty"
      />
      <Text style={styles.label}>Name of the product</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCost}
        value={cost.toString()}
        keyboardType="numeric"
        placeholder="Cost of a product, ex: 12.30"
      />
      <View style={styles.create_w}>
        <TouchableOpacity style={styles.create} onPress={onCreateProduct}>
          <Text style={{ fontSize: 16 }}>
            {action === 'CREATE'
              ? 'Create'
              : action === 'EDIT'
              ? 'Update'
              : 'Done'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product_count: {
    fontSize: 16,
    fontWeight: '700',
    padding: 10,
    textAlign: 'center',
    color: '#F19A3E',
  },
  div: { height: 1, backgroundColor: '#ddd' },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
  },
  label: {
    padding: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 10,
  },
  create_w: { width: '100%', paddingHorizontal: 10, paddingTop: 20 },
  create: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#44CFCB',
  },
});

export default ProductDetailScreen;
