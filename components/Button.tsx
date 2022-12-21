import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { layout } from '~/constants';
import { useLayout, useTheme } from '~/hooks';
import { ActivityIndicator } from './ActivityIndicator';

import { Touchable, TouchableProps } from './Touchable';

interface ButtonProps extends TouchableProps {
  title: string;
  activity?: boolean;
}

export const Button = ({ title, disabled, activity, ...props }: ButtonProps) => {
  const { colors } = useTheme();
  const { paddings, borderRadius, iconSize, normalize } = useLayout();

  return (
    <Touchable
      // of course accessibility props should be here and there...
      hitSlop={layout.hitSlop}
      disabled={disabled || activity}
      rippleColor={colors.background}
      {...props}
    >
      <View
        style={[
          styles.container,
          {
            padding: paddings.narrow,
            borderRadius: borderRadius.default,
            backgroundColor: colors.accent,
          },
        ]}
      >
        {/* Activity icon */}
        <View>
          <ActivityIndicator
            activity={activity}
            style={{ left: -iconSize.default - normalize(5) }}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  title: {
    fontWeight: '500',
  },
});
