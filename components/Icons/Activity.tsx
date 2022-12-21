import React, { memo, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, G, LinearGradient, Mask, Path, Rect, Stop } from 'react-native-svg';

import { useLayout, useTheme } from '~/hooks';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default memo(({ duration = 1000 }: { duration?: number }) => {
  const { colors } = useTheme();
  const { iconSize } = useLayout();
  const l = useSharedValue(56.5487); // circle length
  const d = useSharedValue(0);

  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: l.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${d.value}deg` }],
  }));

  useEffect(() => {
    l.value = withTiming(0, { duration, easing: Easing.out(Easing.sin) });
    d.value = withRepeat(withTiming(360, { duration, easing: Easing.linear }), -1);
  }, [l, d, duration]);

  return (
    <AnimatedSvg
      width={iconSize.default}
      height={iconSize.default}
      viewBox="0 0 24 24"
      style={containerStyle}
    >
      <AnimatedCircle
        r={9}
        cx={12}
        cy={12}
        originX={12}
        originY={12}
        strokeWidth={3}
        strokeDasharray={56.5487}
        stroke={colors.text}
        animatedProps={circleProps}
        fill="transparent"
        mask="url(#mask)"
      />
      <Defs>
        <LinearGradient id="fade" x1={0.875} y1={0.125} x2={0.25} y2={0.75}>
          <Stop offset={0} stopColor="black" stopOpacity={1} />
          <Stop offset={1} stopColor="white" stopOpacity={1} />
        </LinearGradient>
        <Mask id="mask">
          <G originX={10.5} originY={10.5} x={1.5} y={1.5} rotation={45}>
            <Rect width="21" height="21" fill="url(#fade)" />
            <Path d="M0 21,v-21,h21" fill="white" />
          </G>
        </Mask>
      </Defs>
    </AnimatedSvg>
  );
});
