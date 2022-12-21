import React from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native';

import { useTheme } from '~/hooks';
import { layout } from '~/constants';

interface LinkProps extends TouchableWithoutFeedbackProps {
  text: string;
}

export const Link = ({ text, ...props }: LinkProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      hitSlop={layout.hitSlop}
      activeOpacity={0.5}
      //
      {...props}
    >
      <Text style={{ color: colors.accent }}>{text}</Text>
    </TouchableOpacity>
  );
};
