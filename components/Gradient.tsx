import React, { memo } from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface GradientProps {
  startColor?: ColorValue;
  startOpacity?: number;
  startOffset?: number;
  endColor?: ColorValue;
  endOpacity?: number;
  endOffset?: number;
  rx?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  style?: StyleProp<ViewStyle>;
}

export const Gradient = memo(
  ({
    startColor = 'teal',
    startOpacity = 1,
    startOffset = 0,
    endColor = 'yellow',
    endOpacity = 1,
    endOffset = 1,
    rx,
    x1 = 0,
    y1 = 0,
    x2 = 1,
    y2 = 0,
    style,
  }: GradientProps) => {
    return (
      // key is needed because Svg seems to be memoized and does not rerender when needed
      <Svg key={[startColor, endColor].join()} style={style}>
        <Rect width="100%" height="100%" rx={rx} fill="url(#gradient)" />
        <Defs>
          <LinearGradient id="gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
            <Stop offset={startOffset} stopColor={startColor} stopOpacity={startOpacity} />
            <Stop offset={endOffset} stopColor={endColor} stopOpacity={endOpacity} />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
);
