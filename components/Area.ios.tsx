import React from 'react';
import { View } from 'react-native';

import { useLayout } from '~/hooks';

import { AreaProps } from './Area';

export const Area = ({ flex, style, ...props }: AreaProps) => {
  const { margins } = useLayout();

  return (
    <View
      style={[{ flex, marginBottom: margins.default }, style]}
      {...props}
      //
    />
  );
};
