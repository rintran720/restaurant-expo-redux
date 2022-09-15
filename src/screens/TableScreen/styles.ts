import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#ddd',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {
    width: 80,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  nameOfProduct: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addProduct: {
    height: 40,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f09d51',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
