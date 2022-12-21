import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { useLayout, useTheme } from '~/hooks';

import { Underline } from './Underline';

interface TextInputProps extends RNTextInputProps {
  caption?: string;
  isError?: boolean;
  errorText?: string | undefined | null;
  style?: StyleProp<ViewStyle>;
}

export const TextInput = ({ caption, isError, errorText, ...props }: TextInputProps) => {
  const { colors } = useTheme();
  const { paddings, margins } = useLayout();

  return (
    <View style={{ marginBottom: 1.86 * margins.default }}>
      {/* Caption */}
      {!!caption && <Text style={{ color: colors.lightText }}>{caption}</Text>}

      {/* Input */}
      <View style={[styles.inputContainer, { marginBottom: -margins.default }]}>
        {/* Render left... */}

        {/* Input */}
        <RNTextInput
          style={[
            styles.input,
            {
              paddingTop: paddings.narrow,
              paddingBottom: paddings.default,
            },
          ]}
          {...props}
        />

        {/* Render right... */}
      </View>

      {/* Underline */}
      <Underline isError={isError} />

      {/* Error message */}
      {!!errorText && (
        <Animated.Text
          entering={enteringError}
          exiting={exitingError}
          style={{ color: colors.error }}
        >
          {errorText}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const enteringError = FadeInRight.springify().mass(0.1).damping(1.2).stiffness(50);
const exitingError = FadeOutRight.duration(300);
