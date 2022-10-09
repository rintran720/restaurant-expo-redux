import { useRoute } from '@react-navigation/native';
import { productsSelector } from '@state/product/selector';
import { Product } from '@state/product/types';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../state/store';
import { tableActions } from '../../state/table';
import { tablesSelector } from '../../state/table/selector';
import { PickedProduct, Table } from '../../state/table/types';
import { getTableName } from '../../utils/getTableName';
import { styles } from './styles';

const generateHtml = (products: PickedProduct[]) => {
  const time = moment();
  const code = time.format('HHmmss');
  const timeDisplay = time.format('YYYY:MM:DD HH:mm:ss');
  let totalCost = 0;
  products.forEach((p) => (totalCost = totalCost + p.cost * p.qty));
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>@page { size: A5 }</style>
      <style>
      body {
          /* to centre page on screen*/
          // padding: 20mm;
          display: flex;
          flex-direction: column;
      }
      #head-title{
        width: 100%;
        display: flex;
        justify-content: center;
        font-weigth: bold;
        font-size: 26px
      }
      #content{
        font-size: 20px;
        margin-top:20px;
      }
      #product-title{
        text-align: left;
        font-size: 20px;
        font-family: Helvetica Neue;
        font-weight: normal;
      }
      #p-info{
        flex:1;
      }
      #p-cost{
        min-width: 20%;
        text-align: right;
      }
      #cost{
      	text-align: right;
      }
      .wtotal{
      	margin-top: 20px;
        text-align: right;
        
      }
      .item{
      	display: flex;
        flex-direction: row;
      }
      .bold{
        font-weight: bold;
      }
      
      </style>
    </head>
    <body class="A5">
      <div id="head-title">
        Mr Wasabi Restaurant
      </div>
      <div id="content">
        ${products.map(
          (p) => `<div class="item">
                    <div id="p-info">
                      <text class="bold">${p.qty} X</text>
                      <text>------</text>
                      <text>${p.name}</text>
                    </div>
                    <div id="p-cost">
                      <text id="cost" class="bold">${p.cost} €</text>
                  	</div>
                  </div>`,
        )}
        <div class="wtotal">
         <text id="total" class="bold">----------------------</text>
         </div>
        <div class="wtotal">
         <text id="total" class="bold">Total: ${totalCost} €</text>
         </div>
      </div>
    </body>
  </html>
`;
};

const TableScreen = () => {
  const { params } = useRoute<any>();
  const { table } = useMemo(() => {
    return params;
  }, [params]);

  const products = useSelector(productsSelector);
  const tables = useSelector(tablesSelector);
  const [text, onChangeText] = React.useState('');
  const [discount, onChangeDiscount] = React.useState('');

  const productsOfTable = useMemo(
    () =>
      (tables as Table[]).find((t) => t.tableId === table.tableId)?.products ||
      [],
    [table.tableId, tables],
  );

  const calculateCost = useMemo(() => {
    let cost = 0;
    if (productsOfTable?.length > 0) {
      productsOfTable?.forEach((pp: PickedProduct) => {
        cost = pp.cost * pp.qty + cost;
      });
    }
    let _discount = Number(discount);
    if (_discount > 100 || _discount < 0) {
      _discount = 0;
    }
    return (cost * (100 - _discount)) / 100;
  }, [discount, productsOfTable]);

  const calculateTotalItem = useMemo(() => {
    let total = 0;
    if (productsOfTable?.length > 0) {
      productsOfTable?.forEach((pp: PickedProduct) => {
        total = pp.qty + total;
      });
    }
    return total;
  }, [productsOfTable]);

  const foundedProduct = useMemo(() => {
    if (text.length === 0) {
      return null;
    } else {
      return (products as Product[]).find((p) => p.productId === text);
    }
  }, [products, text]);

  const dispatch = useAppDispatch();

  const onAddItem = useCallback(
    (item: Product | null | undefined) => {
      if (item) {
        dispatch(
          tableActions.addProduct({
            id: table.tableId,
            product: item,
          }),
        );
      }
    },
    [dispatch, table.tableId],
  );

  const onRemoveItem = useCallback(
    (item: Product) => {
      if (item) {
        dispatch(
          tableActions.removeProduct({
            id: table.tableId,
            product: item,
          }),
        );
      }
    },
    [dispatch, table.tableId],
  );

  const onCheckout = useCallback(() => {
    Alert.alert(
      `Checkout table ${getTableName(table)}`,
      'When you checkout this table current orders will be deleted',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            dispatch(tableActions.checkoutTable({ id: table.tableId })),
        },
      ],
    );
  }, [dispatch, table]);

  // For print
  const [selectedPrinter, setSelectedPrinter] = React.useState<any>();

  const print = useCallback(async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const printer: any = { html: generateHtml(productsOfTable) };
    if (Platform.OS === 'ios') {
      printer.printerUrl = selectedPrinter?.url; // iOS only
    }
    await Print.printAsync(printer);
  }, [productsOfTable, selectedPrinter?.url]);

  const printToFile = useCallback(async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: generateHtml(productsOfTable),
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }, [productsOfTable]);

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  if (table) {
    return (
      <View style={styles.container}>
        {productsOfTable?.length > 0 && (
          <FlatList<PickedProduct>
            style={{ flex: 1, backgroundColor: '#ccc', paddingVertical: 5 }}
            data={productsOfTable}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#eee',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={item.name}
                onPress={() => {}}
              >
                <View
                  style={{
                    height: '100%',
                    width: 60,
                    backgroundColor: '#72BDA3',
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{item.productId}</Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700' }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '200',
                      marginTop: 5,
                      fontStyle: 'italic',
                    }}
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
                    onPress={() => onRemoveItem(item)}
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
                    onPress={() => onAddItem(item)}
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
              </TouchableOpacity>
            )}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {/* <Text
            style={{ fontSize: 20, color: '#F19A3E', fontWeight: 'bold' }}
          >{`Item: ${
            productsOfTable.length || 0
          } of ${calculateTotalItem}`}</Text> */}

          <Text
            style={{
              width: '100%',
              textAlign: 'right',
              fontSize: 30,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {'Total: '.concat(calculateCost.toFixed(2))} €
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder={'Code'}
            value={text}
            onSubmitEditing={() => {
              onAddItem(foundedProduct);
              onChangeText('');
            }}
          />
          <Text style={styles.nameOfProduct}>
            {foundedProduct?.name || '----'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onAddItem(foundedProduct);
              onChangeText('');
            }}
            style={styles.addProduct}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>Discount</Text>
          <TouchableOpacity
            onPress={() => onChangeDiscount('10')}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#555',
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          >
            <Text>10</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.discount}
            onChangeText={onChangeDiscount}
            placeholder={'Value from 0 to 100'}
            value={discount}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              marginHorizontal: 10,
              backgroundColor: '#eee',
            }}
            onPress={print}
          >
            <Text style={{ fontSize: 16 }}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCheckout}
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
