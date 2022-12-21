import React from 'react';
import Animated, { Layout } from 'react-native-reanimated';

import { useLayout } from '~/hooks';

import { AreaProps } from './Area';

export const Area = ({ flex, style, ...props }: AreaProps) => {
  const { margins } = useLayout();

  return (
    <Animated.View
      /* Despite a lot of nice words about the Material (physical) design,
      Android sucks a little bit with nice layout animations (e.g. the case
      when keyboard is showing) so let's help him figure this out */
      layout={LayoutConfig}
      style={[{ flex, marginBottom: margins.default }, style]}
      //
      {...props}
    />
  );
};

const LayoutConfig = Layout
  //
  .springify()
  .mass(0.25)
  .damping(5.0)
  .stiffness(50);
