import { Dimensions, Insets } from 'react-native';

const { width, height } = Dimensions.get('window');
const templateWidth = 428;
const scale = width / templateWidth;
const hitSlop: Insets = { left: 8, right: 8, top: 12, bottom: 12 };

export default {
  width,
  height,
  scale,
  hitSlop,
};
