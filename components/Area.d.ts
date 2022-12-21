import { ViewProps } from 'react-native';

interface AreaProps extends ViewProps {
  flex?: number;
}

declare const Area = (props: AreaProps) => JSX.Element;
