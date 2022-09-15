import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { productsSelector } from '../../state/product/selector';
import { Product } from '../../state/product/types';
import { PickedProduct, Table } from '../../state/table/types';
import { styles } from './styles';

const TableScreen = () => {
  const { params } = useRoute<any>();
  const { table } = useMemo(() => {
    return params;
  }, [params]);

  const products = useSelector(productsSelector);

  const calculateCost = useMemo(() => {
    let cost = 0;
    if (table?.products?.length > 0) {
      table.products?.forEach((g: PickedProduct) => {
        cost = g.cost * g.qty + cost;
      });
    }
    return cost;
  }, [table]);

  const [text, onChangeText] = React.useState('');

  const foundedProduct = useMemo(() => {
    if (text.length === 0) {
      return null;
    } else {
      return (products as Product[]).find((g) => g.code === text);
    }
  }, [products, text]);

  if (table) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, color: '#F19A3E', fontWeight: 'bold' }}
          >{`Item: ${table?.products?.length || 0}`}</Text>
          <Text style={{ fontSize: 20, color: '#F19A3E', fontWeight: 'bold' }}>
            {'Total cost: '.concat(calculateCost.toFixed(2))} €
          </Text>
        </View>
        {table.products && table?.products?.length > 0 && (
          <FlatList<PickedProduct>
            style={{ flex: 1 }}
            data={(table as Table).products}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                key={item.name}
                onPress={() => {}}
              >
                <View
                  style={{
                    flex: 1,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: '#eee',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: '100%',
                      width: 30,
                      backgroundColor: '#72BDA3',
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700' }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: 12, fontWeight: '200', marginTop: 4 }}
                    >
                      {item.cost}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{item.qty || '-'}</Text>
                  </View>
                  <View
                    style={{
                      width: 64,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {(Number(item.qty) * Number(item.cost)).toFixed(2)} €
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#555',
                        borderRadius: 10,
                      }}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#555',
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder={'Code'}
            value={text}
            onSubmitEditing={() => {
              console.log(text);
            }}
          />
          <Text style={styles.nameOfProduct}>
            {foundedProduct?.name || '----'}
          </Text>
          <TouchableOpacity style={styles.addProduct}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
            marginTop: 10,
          }}
        >
          {/* <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              marginHorizontal: 10,
              backgroundColor: '#888',
            }}
          >
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              marginHorizontal: 10,
              backgroundColor: '#44CFCB',
            }}
          >
            <Text style={{ fontSize: 16 }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <Button title="This is Table page" />;
  }
};

export default TableScreen;
