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

import { Table, TableStatus } from '../../state/table/types';

const TableDetailScreen = () => {
  const navigator = useNavigation();
  const { params } = useRoute<any>();
  const { table, action } = useMemo(() => {
    return params;
  }, [params]);

  const [no, onChangeNo] = React.useState(
    table?.no !== undefined ? table.no : '',
  );
  const [name, onChangeName] = React.useState(
    table?.name !== undefined ? table.name : '',
  );
  const tables = useSelector(tablesSelector);
  const dispatch = useAppDispatch();

  const onCreateTable = useCallback(() => {
    if (action === 'CREATE') {
      if (no.length === 0) {
        Alert.alert('Have to enter number of table');
      } else if (!tables.find((t: Table) => t.no === no)) {
        dispatch(
          tableActions.createTable({
            no,
            name,
            status: TableStatus.DEFAULT,
          }),
        );
      } else {
        Alert.alert('The number of table is used');
      }
    } else if (action === 'EDIT') {
      if (no.length === 0) {
        Alert.alert('Have to enter number of table');
      } else if (tables.find((t: Table) => t.no === table?.no)) {
        dispatch(
          tableActions.updateTable({
            id: table?.no,
            no,
            name,
            status: TableStatus.DEFAULT,
          }),
        );
      } else {
        Alert.alert('The number of table is not existed');
      }
    } else {
      navigator.goBack();
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
