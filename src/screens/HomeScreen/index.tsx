import { useAppSelector } from '@state/store';
import { tablesSelector } from '@state/table/selector';
import { Table, TableStatus } from '@state/table/types';
import React from 'react';
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

const HomeScreen = () => {
  const tables: Table[] = useAppSelector(tablesSelector);
  console.log('a', tables);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* <TouchableOpacity>Add new Table</TouchableOpacity> */}
        <FlatList<Table>
          data={tables}
          horizontal={false}
          numColumns={2}
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
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
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
                <Text style={{ fontSize: 22, marginTop: 10 }}>
                  {item.cost ? Number(item.cost).toFixed(2).concat(' €') : '-'}
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
