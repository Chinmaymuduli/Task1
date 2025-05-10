import React from 'react';
import {View, StyleSheet} from 'react-native';

const CustomProgressBar = ({
  progress,
  barWidth,
  barHeight,
  barColor,
  fillColor,
}: any) => {
  return (
    <View
      style={[
        styles.container,
        {width: barWidth, height: barHeight, backgroundColor: barColor},
      ]}>
      <View
        style={[
          styles.fill,
          {width: `${progress}%`, backgroundColor: fillColor},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 5, // adjust as needed
  },
  fill: {
    height: '100%',
  },
});

export default CustomProgressBar;
