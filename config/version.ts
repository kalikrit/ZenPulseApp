import Constants from 'expo-constants';

export const getAppVersion = (): string => {
  const version = Constants.expoConfig?.version || '1.0.0';
  return version;
};
