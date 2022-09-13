import { useAppDispatch } from '@state/store';
import { tablesSelector } from '@state/table/selector';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { navigate } from '../../navigation/Navigation';
import { TableStatus } from '../../state/table/types';

const TableManagement = () => {
  const [no, onChangeNo] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const tables = useSelector(tablesSelector);
  const dispatch = useAppDispatch();

  const onCreateTable = useCallback(() => {
    navigate('TableDetail', {
      // action: 'EDIT',
      // table: {
      //   no: '2',
      //   name: 'Drink 2',
      //   status: TableStatus.DEFAULT,
      // },
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.create_w}>
        <TouchableOpacity style={styles.create} onPress={onCreateTable}>
          <Text style={{ fontSize: 16 }}>Create</Text>
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

export default TableManagement;
