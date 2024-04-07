import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

type pokemonData = {
  data: {
    name: string;
    url: string;
  };
};

const PokemonComponent = ({data}: pokemonData) => {
  const parts = data?.url?.split('/');
  const index = parts[parts.length - 2];
  const [backgroundColor, setBackgroundColor] = useState<any>(null);
  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${index}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        setBackgroundColor(data?.color?.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchColor();
  }, [index]);

  return (
    <View style={[styles.pokeMonContainer, {backgroundColor: backgroundColor}]}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`,
        }}
        style={styles.image}
        alt="pokeImage"
        resizeMode="contain"
      />
      <Text style={styles.pokemonText}>{data?.name}</Text>
    </View>
  );
};

export default PokemonComponent;

const styles = StyleSheet.create({
  pokeMonContainer: {
    width: Dimensions.get('window').width / 2.5,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  pokemonText: {
    color: 'white',
  },
  image: {
    height: 120,
    width: '100%',
  },
});
