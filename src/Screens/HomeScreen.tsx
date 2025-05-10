import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomProgressBar} from '../Components';

const HomeScreen = () => {
  const [colors, setColors] = useState<any>([]);
  const [filterColor, setFilterColor] = useState<any>([]);
  const [search, setSearch] = useState('');
  const COLORS_ARRAY = ['#000', '#e4e4e4', '#e4e', 'green', 'blue'];
  const getColors = async () => {
    try {
      const response = await fetch(
        `https://random-flat-colors.vercel.app/api/random?count=5`,
        {
          method: 'GET',
        },
      );
      const res = await response.json();
      console.log({res});
      //   setColors(res)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getColors();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 10, paddingHorizontal: 10}}>
        <Text style={styles.text}>Filter By :</Text>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Colors</Text>
          <View style={styles.colorContainer}>
            {COLORS_ARRAY?.map((color: any, index: any) => (
              <View
                key={index}
                style={[
                  styles.bgBox,
                  {
                    borderWidth: filterColor.includes(color) ? 2 : 0,
                    borderRadius: filterColor.includes(color) ? 60 : 0,
                  },
                ]}>
                <Pressable
                  key={index}
                  onPress={() => setFilterColor(color)}
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: color,
                    },
                  ]}></Pressable>
              </View>
            ))}
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.text}>Title/SubTitle :</Text>
          <View style={{marginTop: 4}}>
            <TextInput
              placeholder="search across title or subtitle"
              style={styles.inputBox}
              value={search}
              onChangeText={txt => setSearch(txt)}
            />
          </View>
        </View>
        <CustomProgressBar
          progress={50}
          barWidth={200}
          barHeight={20}
          barColor="lightgrey"
          fillColor="blue"
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
  },
  text: {fontWeight: '700'},
  colorBox: {
    height: 22,
    width: 22,
    borderRadius: 20,
    borderWidth: 1,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 7,
  },
  bgBox: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  mainContainer: {
    marginTop: 15,
  },
});
