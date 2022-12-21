import React from 'react';
import { ColorValue, TouchableWithoutFeedbackProps } from 'react-native';

export interface TouchableProps extends TouchableWithoutFeedbackProps {
  rippleColor?: ColorValue;
  activeOpacity?: number;
}

export declare const Touchable: React.FunctionComponent<TouchableProps>;
