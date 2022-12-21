import AsyncStorage from '@react-native-async-storage/async-storage';

function save(key: string, value: any) {
  const data = JSON.stringify(value);

  return AsyncStorage.setItem(key, data);
}

async function load(key: string) {
  const data = await AsyncStorage.getItem(key);

  if (data === null) return undefined;

  return JSON.parse(data);
}

function remove(key: string) {
  return AsyncStorage.removeItem(key);
}

export default {
  save,
  load,
  remove,
};
