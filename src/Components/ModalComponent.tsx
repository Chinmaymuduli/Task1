import {
  StyleSheet,
  Animated,
  Easing,
  View,
  ScrollView,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useAppContext} from '../Contexts';

interface Props {
  isVisible: boolean;
  SlideWidth?: any;
  allColor: any;
  setIsVisible: (isVisible: boolean) => void;
}

const ModalComponent: React.FC<Props> = ({
  isVisible,
  SlideWidth,
  allColor,
  setIsVisible,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [selectColor, setSelectColor] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [subTitleValue, setSubTitleValue] = useState('');
  const {allBoxData, setAllBoxData} = useAppContext();

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const slideRight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [370, 0],
  });
  const handelSubmit = () => {
    setAllBoxData([
      ...allBoxData,
      {
        color: selectColor,
        title: titleValue,
        subTitle: subTitleValue,
      },
    ]);
    setIsVisible(false);
    setSubTitleValue('');
    setTitleValue('');
    setSelectColor('');
  };
  return (
    <Animated.View
      style={[
        styles.modalContainer,
        {transform: [{translateX: slideRight}], width: SlideWidth},
      ]}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalHeader}>
            <Text>Creative Creation</Text>
            <Pressable
              onPress={() => setIsVisible(false)}
              style={styles.crossSign}>
              <Text style={{color: 'white'}}>X</Text>
            </Pressable>
          </View>
          <View style={styles.modalContainer2}>
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
                {allColor?.map(
                  (color: any, index: React.Key | null | undefined) => (
                    <View
                      key={index}
                      style={[
                        styles.bgBox,
                        {
                          borderWidth: selectColor.includes(color) ? 2 : 0,
                          borderRadius: selectColor.includes(color) ? 60 : 0,
                        },
                      ]}>
                      <Pressable
                        key={index}
                        onPress={() => setSelectColor(color)}
                        style={[
                          styles.colorBox,
                          {
                            backgroundColor: color,
                          },
                        ]}></Pressable>
                    </View>
                  ),
                )}
              </View>
            </View>

            <Pressable
              onPress={
                titleValue && subTitleValue && selectColor
                  ? () => handelSubmit()
                  : () => {}
              }
              style={[
                styles.doneBtn,
                {
                  backgroundColor:
                    titleValue && subTitleValue && selectColor
                      ? 'blue'
                      : 'white',
                },
              ]}>
              <Text
                style={{
                  color:
                    titleValue && subTitleValue && selectColor
                      ? 'white'
                      : 'black',
                }}>
                Done
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
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
  modalContainer2: {
    paddingHorizontal: 7,
    marginTop: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
  },
  marginBox: {
    marginBottom: 10,
    marginTop: 5,
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
  crossSign: {
    padding: 7,
    backgroundColor: 'red',
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgBox: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default ModalComponent;
