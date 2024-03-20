import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LikeIcon from '../assets/LikeIcon';
import {useDispatch} from 'react-redux';
import {
  setCharacters,
  setMaleLikes,
  setFemaleLikes,
  setOtherLikes,
  resetLikes,
} from './store/charactersSlice';
import {useCharactersStateSelector} from './store';

const API = (page: number) => `https://swapi.py4e.com/api/people/?page=${page}`;

const width = Dimensions.get('screen').width;

const List = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const {characters, maleLikes, femaleLikes, othersLikes} =
    useCharactersStateSelector();
  const allLikes = [...maleLikes, ...femaleLikes, ...othersLikes];

  const fetchCharacters = () => {
    return fetch(API(pageNumber)).then(res => res.json());
  };
  const {data, isLoading, isError, refetch, isSuccess, isFetching} = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  useEffect(() => {
    if (isSuccess && data.results) {
      dispatch(setCharacters(data.results));
    }
  }, [isSuccess, data, dispatch]);

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Something wrong! Pls try later!</Text>
      </View>
    );
  }

  const onLikePress = (gender: string, name: string) => {
    switch (gender) {
      case 'male':
        return dispatch(setMaleLikes(name));
      case 'female':
        return dispatch(setFemaleLikes(name));
      default:
        return dispatch(setOtherLikes(name));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => dispatch(resetLikes())}
          style={styles.clearContainer}>
          <Text>Clear fans</Text>
        </TouchableOpacity>
        <Text style={styles.fansText}>Fans</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statsTextContainer}>
            <Text style={styles.textCenter}>Female fans</Text>
            <Text>{femaleLikes.length}</Text>
          </View>
          <View style={styles.statsTextContainer}>
            <Text style={styles.textCenter}>Male fans</Text>
            <Text>{maleLikes.length}</Text>
          </View>
          <View style={styles.statsTextContainer}>
            <Text style={styles.textCenter}>Others</Text>
            <Text>{othersLikes.length}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search your favorite character"
            style={{height: 40, width: width}}
          />
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          onEndReachedThreshold={0.2}
          contentContainerStyle={{rowGap: 10}}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onEndReached={() => setPageNumber(prev => prev + 1)}
          ListFooterComponent={<ActivityIndicator animating={isFetching} />}
          data={characters.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Item', {item})}
              style={styles.itemStyle}>
              <TouchableOpacity
                onPress={() => onLikePress(item.gender, item.name)}
                hitSlop={10}>
                <LikeIcon filled={allLikes.includes(item.name)} />
              </TouchableOpacity>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginVertical: 15,
  },
  clearContainer: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  fansText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    marginVertical: 15,
  },
  statsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statsTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textInputStyle: {
    height: 40,
    width: width,
  },
});
