import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PokemonComponent} from '../Components';
import {useGetAllPokemonQuery} from '../Services/PokemonApi';

const HomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {data, isFetching, refetch} = useGetAllPokemonQuery({
    limit: 20,
    offset: offset,
  });
  useEffect(() => {
    if (!isFetching && data?.results?.length > 0) {
      setPokemonData((prevData: any) => [...prevData, ...data.results]);
      setOffset(offset + 20);
    }
  }, [data?.results]);

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="red" /> : null;
  };

  const handleEndReached = () => {
    if (!loading && !isFetching) {
      setLoading(true);
      refetch().then(() => setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'red'} />
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.pokeDexText}>Pokedex</Text>
        </View>
      </View>
      <View style={styles.pokeBox}>
        <FlatList
          data={pokemonData}
          numColumns={2}
          renderItem={({item}) => <PokemonComponent data={item} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainContainer: {
    backgroundColor: 'red',
    height: '5%',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  pokeDexText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  pokeBox: {
    paddingHorizontal: 13,
    marginTop: 10,
  },
});
