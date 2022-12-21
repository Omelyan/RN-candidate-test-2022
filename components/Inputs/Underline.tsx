import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  AnimateProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path, PathProps, Svg } from 'react-native-svg';

import { useLayout, useTheme } from '~/hooks';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface UnderlineProps {
  isError?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface WaveProps extends AnimateProps<PathProps> {
  width: number; // px
  height: number; // px
  thickness?: number; // px
  stretching?: number; // px
  distortion?: number; // -0 <-- ~0.5 (smooth) --> 1+
  filling?: number; // 0 --> 1
  scale?: number; // 0 --> 1

  easing?: (n: number) => number; // (n: start point, 0 --> end point, 1): 0 --> 1
}

export const Underline = ({ isError, style }: UnderlineProps) => {
  const { normalize } = useLayout();
  const { colors } = useTheme();

  const width = normalize(364);
  const height = normalize(8);
  const thickness = normalize(1);

  const x = useSharedValue(-2 * width);

  useEffect(
    () => {
      if (!isError) return;
      x.value = withTiming(0, timingOptions, () => {
        x.value = -2 * width;
      });
    },
    //
    [isError, width, x]
  );

  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={style}
    >
      <Wave
        width={3 * width}
        height={height}
        thickness={thickness}
        filling={1 / 3}
        scale={0.8}
        stroke={isError ? colors.error : colors.border}
        style={waveStyle}
      />
    </Svg>
  );
};

const Wave = ({
  width,
  height,
  thickness = 2,
  stretching = 7,
  distortion = 0.5,
  filling = 1,
  scale = 1,

  easing = quadratic,
  ...props
}: WaveProps) => {
  // some crushing calculations ahead, I think it's better to stay away
  const h = height / 2;
  const a = distortion * stretching;
  const n = Math.trunc((filling * width) / stretching) - 1;
  const w = (width - (n + 1) * stretching) / 2;

  let dy = 0;

  const descriptor = [
    // set a start point:
    ['M', 0, h],

    // draw the left straight line:
    ['l', w, 0],

    // calculate and draw a curve:
    (() => {
      const curves = [];
      for (let i = 0; i < n; i += 1) {
        const y = h * scale * harmonize(i) * easing(i / (n - 1));
        curves.push(['c', a, 0, stretching - a, -dy + y, stretching, -dy + y]);
        dy = y;
      }
      return curves;
    })(),

    // go back to the straight line:
    ['c', a, 0, stretching - a, -dy + 0, stretching, -dy + 0],

    // draw the right straight line:
    ['l', w, 0],
  ];

  const d = descriptor.flat(2).join(' ');

  return <AnimatedPath d={d} strokeWidth={thickness} {...props} />;
};

const harmonize = (n: number) => (n % 2) * 2 - 1;

const quadratic = (n: number) => 1 - Math.pow(1 - 2 * n, 2);

const timingOptions = { duration: 840, easing: Easing.linear };
