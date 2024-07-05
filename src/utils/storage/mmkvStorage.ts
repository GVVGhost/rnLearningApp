import {MMKV} from 'react-native-mmkv';

export enum SK {
  username = 'username',
}

export type LocalSessionDataObj = {
  username: string;
};

export type storageKeyValue = {
  key: SK;
  value: string;
};

export type savingResult = {
  key: SK;
  success: boolean;
};

const storageId = 'rnLearningAppStorageId';

export const storage = new MMKV({
  id: storageId,
  encryptionKey: process.env.REACT_APP_STORAGE_KEY,
});

export function saveMultiple(keyValuesList: storageKeyValue[]): savingResult[] {
  return keyValuesList.map(value => ({
    key: value.key,
    success: value.value ? saveOne(value.key, value.value.toString()) : false,
  }));
}

export function saveOne(key: SK, value: string): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

export function readMultiple(keys: SK[]): storageKeyValue[] {
  let ans: storageKeyValue[] = [];
  try {
    keys.forEach(key => {
      const value = readOne(key);
      if (value) {
        ans.push({key: key, value: value});
      }
    });
  } catch (e) {
    console.log('Local session is missed');
  }
  return ans;
}

export function readOne(key: SK): string | undefined {
  try {
    return storage.getString(key);
  } catch (e) {
    console.error('Error:', e);
  }
  return;
}

export function deleteMultiple(keys: SK[]): void {
  keys.forEach(key => deleteOne(key));
}

export function deleteOne(key: SK): void {
  storage.delete(key);
}
