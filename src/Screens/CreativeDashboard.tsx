import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ModalComponent} from '../Components';
import {useAppContext} from '../Contexts';

const CreativeDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [selectColor, setSelectColor] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [subTitleValue, setSubTitleValue] = useState('');
  const [allColor, setAllColor] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const {allBoxData, setAllBoxData} = useAppContext();
  const getColor = async () => {
    try {
      const response = await fetch(
        `https://random-flat-colors.vercel.app/api/random?count=6`,
        {
          method: 'GET',
        },
      );
      const res = await response.json();
      setAllColor(res?.colors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getColor();
  }, []);
  const handelSubmit = () => {
    setAllBoxData([
      ...allBoxData,
      {
        color: selectColor,
        title: titleValue,
        subTitle: subTitleValue,
      },
    ]);
    setIsModalVisible(false);
    setSubTitleValue('');
    setTitleValue('');
    setSelectColor('');
  };

  const handelFilter = () => {
    if (filterColor || search) {
      setIsFilter(true);
      const data = allBoxData.filter(
        (i: any) =>
          i.color === filterColor ||
          i.title === search ||
          i.subTitle === search,
      );
      setFilterData(data);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          <View style={styles.filterBox}>
            <View style={{marginTop: 10}}>
              <View style={styles.filterView}>
                <Text style={styles.filterText}>Filter By</Text>
              </View>
              <View style={styles.colorView}>
                <View style={styles.marginBox}>
                  <Text style={styles.text}>Color :</Text>
                  <View style={styles.colorContainer}>
                    {allColor?.map((color, index) => (
                      <Pressable
                        key={index}
                        onPress={() => setFilterColor(color)}
                        style={[
                          styles.colorBox,
                          {backgroundColor: color},
                        ]}></Pressable>
                    ))}
                  </View>
                </View>
                <View style={styles.marginBox}>
                  <Text style={styles.text}>Title/SubTitle :</Text>
                  <View style={{marginTop: 4}}>
                    <TextInput
                      placeholder="search across title or subtitle"
                      style={[styles.inputBox, {height: 40}]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.filterBtn,
                    {marginVertical: 10, justifyContent: 'space-between'},
                  ]}>
                  <Pressable
                    style={[
                      styles.addBtn,
                      {
                        backgroundColor:
                          search || filterColor ? '#9a031e' : 'gray',
                      },
                    ]}
                    onPress={
                      search || filterColor ? () => handelFilter() : () => {}
                    }>
                    <Text style={{color: 'white'}}>Apply Filter</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.addBtn,
                      {
                        backgroundColor:
                          search || filterColor ? '#22577a' : 'gray',
                        marginLeft: 10,
                      },
                    ]}
                    onPress={
                      search || filterColor
                        ? () => {
                            setIsFilter(false),
                              setSearch(''),
                              setFilterColor('');
                          }
                        : () => {}
                    }>
                    <Text style={{color: 'white'}}>Clear</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => setIsModalVisible(true)}
            disabled={isModalVisible}
            style={[
              styles.addBtn,
              {backgroundColor: isModalVisible ? 'gray' : 'red', marginTop: 10},
            ]}>
            <Text
              style={[styles.add, {color: isModalVisible ? 'black' : 'white'}]}>
              + Add Creatives
            </Text>
          </Pressable>

          {isFilter ? (
            <View style={styles.creativeContainer}>
              {filterData?.map((item: any, index: any) => (
                <View
                  style={[styles.container, {backgroundColor: item?.color}]}
                  key={index}>
                  <Text>{item.title}</Text>
                  <Text>{item.subTitle}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.creativeContainer}>
              {allBoxData?.map((item: any, index: any) => (
                <View
                  style={[styles.container, {backgroundColor: item?.color}]}
                  key={index}>
                  <Text>{item.title}</Text>
                  <Text>{item.subTitle}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <ModalComponent isVisible={isModalVisible} SlideWidth={'70%'}>
        <View style={styles.modalHeader}>
          <Text>Creative Creation</Text>
          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>X</Text>
          </Pressable>
        </View>
        <View style={styles.modalContainer}>
          <View style={styles.marginBox}>
            <Text>Title :</Text>
            <View>
              <TextInput
                placeholder="Enter subtitle"
                style={styles.inputBox}
                value={titleValue}
                onChangeText={txt => setTitleValue(txt)}
              />
            </View>
          </View>
          <View style={styles.marginBox}>
            <Text>SubTitle :</Text>
            <View>
              <TextInput
                placeholder="Enter subtitle"
                style={styles.inputBox}
                value={subTitleValue}
                onChangeText={txt => setSubTitleValue(txt)}
              />
            </View>
          </View>
          <View style={styles.marginBox}>
            <Text>Background Colors :</Text>
            <View style={styles.colorContainer}>
              {allColor?.map((color, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectColor(color)}
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: color,
                      borderColor: selectColor.includes(color)
                        ? 'blue'
                        : 'black',
                    },
                  ]}></Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={
              titleValue && subTitleValue && selectColor
                ? () => handelSubmit()
                : () => {}
            }
            style={styles.doneBtn}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      </ModalComponent>
    </SafeAreaView>
  );
};

export default CreativeDashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  marginBox: {
    marginBottom: 10,
    marginTop: 5,
  },
  colorBox: {
    height: 22,
    width: 22,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 7,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 7,
  },
  addBtn: {
    paddingVertical: 10,
    width: '40%',
    borderRadius: 7,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    paddingHorizontal: 7,
  },
  modalHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'violet',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  modalContainer: {
    paddingHorizontal: 7,
    marginTop: 10,
  },
  doneBtn: {
    paddingVertical: 7,
    width: '80%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  doneText: {
    color: 'black',
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 7,
    height: 100,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creativeContainer: {
    marginTop: 10,
  },
  filterBox: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2,
    borderRadius: 5,
  },
  filterBtn: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '400',
  },
  colorView: {paddingHorizontal: 10, marginTop: 12},
  filterText: {
    paddingHorizontal: 10,
    marginVertical: 7,
    fontWeight: 'bold',
  },
  filterView: {borderBottomWidth: 1, justifyContent: 'center'},
});
