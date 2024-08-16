import {IColors} from 'react-native-alert-notification/lib/typescript/service';
import {Theme} from '@react-navigation/native';

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#155E92',
    background: '#c2c4d2',
    card: '#d6d6e0',
    text: '#69646e',
    border: '#82828c',
    notification: '#e63c3c',
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#104b75',
    background: '#111111',
    card: '#1E1E1E',
    text: '#87919b',
    border: '#2C2C35',
    notification: '#783c3c',
  },
};

export const nLight: IColors = {
  card: '#f0f0f0',
  info: '#155E92',
  label: '#69646e',
  danger: '#e63c3c',
  overlay: 'rgba(161,161,161,0.2)',
  warning: '#c4bf21',
  success: '#28ba00',
};

export const nDark: IColors = {
  card: '#323235',
  info: '#155E92',
  label: '#787878',
  danger: '#e63c3c',
  overlay: 'rgba(161,161,161,0.2)',
  warning: '#c4bf21',
  success: '#28ba00',
};
