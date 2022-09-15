import { useAppSelector } from '@state/store';
import { tablesSelector } from '@state/table/selector';
import { PickedProduct, Table, TableStatus } from '@state/table/types';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { navigate } from '../../navigation/Navigation';
import { getTableName } from '../../utils/getTableName';
import { styles } from './styles';

const NumberButton = ({ num, onPress }: { num: string; onPress?: any }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{num}</Text>
    </TouchableOpacity>
  );
};
const HomeScreen = () => {
  const tables: Table[] = useAppSelector(tablesSelector);
  const sortedTables = useMemo(
    () => [...tables].sort((a, b) => a.tableId - b.tableId),
    [tables],
  );

  const [col, setCol] = useState(2);

  const calculateCost = useCallback((products: PickedProduct[]) => {
    let cost = 0;
    products?.forEach((g) => {
      cost = g.cost * g.qty + cost;
    });
    return cost;
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flexDirection: 'row' }}>
          <NumberButton
            num={'2 ◫'}
            onPress={() => {
              setCol(2);
            }}
          />
          <NumberButton
            num={'3 ◫'}
            onPress={() => {
              setCol(3);
            }}
          />
          <NumberButton
            num={'4 ◫'}
            onPress={() => {
              setCol(4);
            }}
          />
        </View>
        <FlatList<Table>
          key={col}
          data={sortedTables}
          horizontal={false}
          numColumns={col}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                flex: 1,
              }}
              key={item.name}
              onPress={() => {
                navigate('Table', { table: item, something: 'like this' });
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 80,
                  borderRadius: 10,
                  backgroundColor:
                    item.status === TableStatus.DEFAULT ? '#eee' : '#44CFCB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 15, marginTop: 4 }}>
                  {getTableName(item)}
                </Text>
                <Text style={{ fontSize: 20, marginTop: 10 }}>
                  {item.products
                    ? calculateCost(item.products).toFixed(2).concat(' €')
                    : '-'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default HomeScreen;
