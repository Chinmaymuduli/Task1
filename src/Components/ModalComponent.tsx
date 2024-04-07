import {StyleSheet, Animated, Easing, View, ScrollView} from 'react-native';
import React, {useRef, useEffect} from 'react';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  SlideWidth?: any;
}

const ModalComponent: React.FC<Props> = ({isVisible, children, SlideWidth}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        {transform: [{translateX: slideRight}], width: SlideWidth},
      ]}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{
          //   paddingBottom: '20%',
          // }}
        >
          {children}
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
});

export default ModalComponent;
