import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

import { TouchableProps } from './Touchable';

export const Touchable = ({ rippleColor = 'transparent', ...props }: TouchableProps) => {
  const ripple = TouchableNativeFeedback.Ripple(rippleColor, false);

  return <TouchableNativeFeedback useForeground background={ripple} {...props} />;
};
