import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TouchableProps } from './Touchable';

export const Touchable = ({ activeOpacity = 0.8, ...props }: TouchableProps) => {
  return <TouchableOpacity activeOpacity={activeOpacity} {...props} />;
};
