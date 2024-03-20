import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../assets/BackIcon';

const TableItem = ({title, text}: {title: string; text: string}) => (
  <View style={styles.itemContainer}>
    <Text>{title}</Text>
    <Text>{text}</Text>
  </View>
);

const Item = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.back, styles.flex]}>
          <BackIcon />
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.flex} />
      </View>
      <View style={styles.contentContainer}>
        <TableItem text={item.birth_year} title="Year of birth" />
        <TableItem text={item.eye_color} title="Eye color" />
        <TableItem text={item.hair_color} title="Hair color" />
        <TableItem text={item.height} title="Height" />
        <TableItem text={item.skin_color} title="Skin Color" />
        <TableItem text={item.mass} title="Mass" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  back: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    rowGap: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});
export default Item;
