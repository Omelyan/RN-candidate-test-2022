import { PixelRatio, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout } from '~/constants';

export function useLayout() {
  const insets = useSafeAreaInsets();
  const { fontScale } = useWindowDimensions();

  const paddings = {
    default: normalize(32),
    thin: normalize(24),
    narrow: normalize(16),
  };

  const margins = {
    default: normalize(20),
    thin: normalize(10),
  };

  const borderRadius = {
    default: normalize(18),
  };

  const iconSize = {
    default: normalize(22),
  };

  function normalize(value: number) {
    return Math.round(PixelRatio.roundToNearestPixel(value * fontScale * layout.scale));
  }

  return {
    insets,
    paddings,
    margins,
    borderRadius,
    iconSize,
    //
    normalize,
  };
}
