import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { useTheme } from '~/hooks';

interface LabelProps extends TextProps {
  l?: boolean;
  xl?: boolean;
  light?: boolean;
}

export const Label = ({ l, xl, light, style, children }: LabelProps) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        { color: light ? colors.lightText : colors.text },
        l && styles.l,
        xl && styles.xl,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  l: {
    fontSize: 18,
  },

  xl: {
    fontSize: 22,
  },
});
