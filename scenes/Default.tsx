import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollViewProps, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { Gradient } from '~/components';
import { useLayout, useTheme } from '~/hooks';

interface DefaultSceneProps extends ScrollViewProps {}

const ContentContainer = (props: DefaultSceneProps) => {
  const { insets, paddings } = useLayout();
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style="dark" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            padding: paddings.default,
            paddingTop: insets.top + paddings.narrow,
            paddingBottom: insets.bottom + paddings.narrow,
            backgroundColor: colors.background,
          },
        ]}
        //
        {...props}
      />

      <Gradient
        x2={0}
        y2={1}
        startColor={colors.background}
        endColor={colors.background}
        endOpacity={0}
        style={[StyleSheet.absoluteFillObject, { height: insets.top + paddings.narrow }]}
      />
    </>
  );
};

const IOSContentContainerWrapper = (props: DefaultSceneProps) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
      <ContentContainer {...props} />
    </KeyboardAvoidingView>
  );
};

export const Default = Platform.select({
  ios: IOSContentContainerWrapper,
  default: ContentContainer,
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
  },
});
