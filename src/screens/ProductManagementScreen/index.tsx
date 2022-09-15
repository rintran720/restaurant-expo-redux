import { tablesSelector } from '@state/table/selector';
import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { navigate } from '../../navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { tableActions } from '../../state/table';
import { Table } from '../../state/table/types';
import { getTableName } from '../../utils/getTableName';

const ProductManagementScreen = () => {
  const tables: Table[] = useAppSelector(tablesSelector);
  const sortedTables = useMemo(
    () => [...tables].sort((a, b) => a.tableId - b.tableId),
    [tables],
  );

  const dispatch = useAppDispatch();

  const onCreateTable = useCallback(() => {
    navigate('TableDetail', {
      action: 'CREATE',
    });
  }, []);

  const onEditTable = useCallback((table: Table) => {
    navigate('TableDetail', {
      action: 'EDIT',
      table,
    });
  }, []);

  const onDeleteTable = useCallback(
    (table: Table) => {
      Alert.alert(
        `Delete table ${getTableName(table)}`,
        'When you delete this table current orders will be deleted',
        [
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              dispatch(tableActions.deleteTable({ id: table.tableId })),
          },
        ],
      );
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.create_w}>
        <TouchableOpacity style={styles.create} onPress={onCreateTable}>
          <Text style={{ fontSize: 16 }}>Create</Text>
        </TouchableOpacity>
      </View>
      <FlatList<Table>
        data={sortedTables}
        horizontal={false}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              flex: 1,
            }}
            key={item.name}
          >
            <View
              style={{
                flex: 1,
                height: 80,
                borderRadius: 10,
                backgroundColor: '#eee',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, marginTop: 4 }}>
                {getTableName(item)}
              </Text>
              <View style={{ flexDirection: 'row', height: 32, marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    onEditTable(item);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    backgroundColor: '#ddd',
                    borderColor: '#44CFCB',
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#44CFCB' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onDeleteTable(item);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    backgroundColor: '#ddd',
                    borderColor: '#D56062',
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#D56062' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    height: 44,
  },
  table_count: {
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
});

export default ProductManagementScreen;
