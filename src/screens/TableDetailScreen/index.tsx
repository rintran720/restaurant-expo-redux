import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '@state/store';
import { tableActions } from '@state/table';
import { tablesSelector } from '@state/table/selector';
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

import { Table } from '../../state/table/types';

const TableDetailScreen = () => {
  const navigator = useNavigation();
  const { params } = useRoute<any>();
  const { table, action } = useMemo(() => {
    return params;
  }, [params]);

  const [no, onChangeNo] = React.useState(
    table?.tableId !== undefined ? table.tableId.toString() : '',
  );
  const [name, onChangeName] = React.useState(
    table?.name !== undefined ? table.name : '',
  );
  const tables = useSelector(tablesSelector);
  const dispatch = useAppDispatch();

  const onCreateTable = useCallback(() => {
    switch (action) {
      case 'CREATE': {
        const parsedTableId = Number(no);
        if (!parsedTableId) {
          Alert.alert('Have to enter number of table');
        } else if (!tables.find((t: Table) => t.tableId === parsedTableId)) {
          dispatch(
            tableActions.createTable({
              tableId: parsedTableId,
              name,
              products: [],
            }),
          );
          navigator.goBack();
        } else {
          Alert.alert('The number of table is used');
        }
        break;
      }
      case 'EDIT': {
        const parsedTableId = Number(no);
        if (!parsedTableId) {
          Alert.alert('Have to enter number of table' + parsedTableId);
        } else if (tables.find((t: Table) => t.tableId === table?.tableId)) {
          dispatch(
            tableActions.updateTable({
              id: table?.tableId,
              tableId: parsedTableId,
              name,
              products: table.products || [],
            }),
          );
          navigator.goBack();
        } else {
          Alert.alert('The number of table is not supported');
        }
        break;
      }
      default: {
        navigator.goBack();
      }
    }
  }, [action, dispatch, name, navigator, no, table, tables]);

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
      <Text style={styles.label}>Name of the table</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name of table, maybe empty"
      />
      <View style={styles.create_w}>
        <TouchableOpacity style={styles.create} onPress={onCreateTable}>
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

export default TableDetailScreen;
