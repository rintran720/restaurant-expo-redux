import * as Clipboard from 'expo-clipboard';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useCallback } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { productActions } from '../../state/product';
import { productsSelector } from '../../state/product/selector';
import { Product } from '../../state/product/types';
import { useAppDispatch, useAppSelector } from '../../state/store';

const ImportExportScreen = () => {
  const dispatch = useAppDispatch();
  const importProductJson = useCallback(() => {
    DocumentPicker.getDocumentAsync({
      multiple: false,
      type: 'application/json',
    })
      .then(({ type, uri }: any) => {
        if (type === 'success') {
          FileSystem.readAsStringAsync(uri)
            .then((content) => {
              try {
                const data: Product[] = JSON.parse(content);
                if (data?.length > 0) {
                  dispatch(productActions.importProduct({ data }));
                  Alert.alert('Import success!');
                }
              } catch (e) {
                Alert.alert('Can not import this file');
              }
            })
            .catch((e) => Alert.alert('Can not import'));
        }
      })
      .catch(console.log);
  }, [dispatch]);

  const products = useAppSelector(productsSelector);
  const exportProductJson = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(JSON.stringify(products));
      Alert.alert('Copy success', 'Paste this data to a editor');
    } catch (e: any) {
      Alert.alert('Copy error', e.message);
    }
  }, [products]);

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: '#fff' }}
        onPress={importProductJson}
      >
        <Text>Import file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: '#fff', marginTop: 20 }}
        onPress={exportProductJson}
      >
        <Text>Export file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportExportScreen;
