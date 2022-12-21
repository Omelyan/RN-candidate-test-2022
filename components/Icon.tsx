import React, { lazy, Suspense } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { layout } from '~/constants';

const allIcons = {
  Activity: lazy(() => import('./Icons/Activity')),
  Logo: lazy(() => import('./Icons/Logo')),
};

type Names = keyof typeof allIcons;
type IconProps<Name extends Names> = Parameters<typeof allIcons[Name]>[0];
type OmitProps = '';
type IconOptionProps<Name extends Names> = Omit<IconProps<Name>, OmitProps>;

interface IconContainerProps<Name extends Names> extends TouchableOpacityProps {
  name: Name;
}

export function Icon<Name extends Names>({
  name,
  disabled,
  children,
  style,
  //
  onPress,
  ...props
}: IconContainerProps<Name> & IconOptionProps<Name>) {
  const Content = allIcons[name] as React.FunctionComponent<IconProps<Name>>;

  if (Content === undefined) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      hitSlop={layout.hitSlop}
      disabled={disabled || !onPress}
      style={[styles.container, style]}
      {...props}
      //
      onPress={onPress}
    >
      <Suspense>
        <Content {...props} />
      </Suspense>

      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
