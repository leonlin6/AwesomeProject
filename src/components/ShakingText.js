import PropTypes from 'prop-types';
import React, { Component, useState, useEffect } from 'react';
import {
  Animated,
  Text
} from 'react-native';

const ShakingText = (props) => {

    const [shakedValue] = useState(new Animated.Value(0));
  

  const animatedStyle = 
    {
      transform: [
        {
          translateY: shakedValue.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 10, -15, 12, -9, 18, -7, 10, -11, 5, 0],
          }),
        },
        {
          translateX: shakedValue.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
          }),
        },
      ],
    };
  

  const shake = () => {
    shakedValue.setValue(0);
    Animated.spring(shakedValue, {
      toValue: 1,
      friction: 3,
      tension: 10,
    }).start(() => shakedValue.setValue(0));
  };

    return (
      <Animated.Text
        {...props}
        style={animatedStyle}
      />
    );
}

ShakingText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: Text.propTypes.style,
};

export default ShakingText;