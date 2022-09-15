import { productsSelector } from '@state/product/selector';
import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { navigate } from '../../navigation/Navigation';
import { productActions } from '../../state/product';
import { Product } from '../../state/product/types';
import { useAppDispatch, useAppSelector } from '../../state/store';

const ProductManagementScreen = () => {
  const [text, onChangeText] = React.useState('');

  const products: Product[] = useAppSelector(productsSelector);
  const sortedProducts = useMemo(() => {
    if (text.length !== 0) {
      return [...products]
        .filter((p) => p.productId.includes(text))
        .sort((a, b) => b.productId.localeCompare(a.productId));
    } else {
      return products;
    }
  }, [products, text]);

  const dispatch = useAppDispatch();

  const onCreateProduct = useCallback(() => {
    navigate('ProductDetail', {
      action: 'CREATE',
    });
  }, []);

  const onEditProduct = useCallback((product: Product) => {
    navigate('ProductDetail', {
      action: 'EDIT',
      product,
    });
  }, []);

  const onDeleteProduct = useCallback(
    (product: Product) => {
      Alert.alert(
        `Delete product ${product.name}`,
        'When you delete this product current orders will be deleted',
        [
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              dispatch(productActions.deleteProduct({ id: product.productId })),
          },
        ],
      );
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <FlatList<Product>
        data={sortedProducts}
        horizontal={false}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              margin: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: '#eee',
            }}
            key={item.name}
          >
            <View
              style={{
                height: '100%',
                minWidth: 36,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#72BDA3', fontWeight: 'bold' }}>
                {item.productId}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: 10,
              }}
            >
              <Text style={{ fontSize: 16, marginTop: 4 }}>{item.name}</Text>
              <Text style={{ fontSize: 14, marginTop: 4 }}>
                {item.cost.toFixed(2).toString().concat(' €')}
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity
                onPress={() => {
                  onEditProduct(item);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#ddd',
                  borderColor: '#44CFCB',
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontSize: 16, color: '#44CFCB' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDeleteProduct(item);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#ddd',
                  borderColor: '#D56062',
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 16, color: '#D56062' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <KeyboardAvoidingView>
        <View style={styles.create_w}>
          <TouchableOpacity style={styles.create} onPress={onCreateProduct}>
            <Text style={{ fontSize: 16 }}>Create</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.create_w}>
          <TextInput
            style={styles.search}
            onChangeText={onChangeText}
            placeholder={'Code'}
            value={text}
            onSubmitEditing={() => {
              console.log(text);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ddd',
  },
  item: {
    padding: 10,
    fontSize: 18,
    display: 'flex',
    flexDirection: 'row',
  },
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
  create_w: { width: '100%', padding: 10 },
  create: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#44CFCB',
  },
  search: {
    width: '100%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#777',
  },
});

export default ProductManagementScreen;
