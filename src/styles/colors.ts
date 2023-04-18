// Colors generated with https://coolors.co/59c3c3-52489c-ebebeb-297045-ce6a85
// Shades generated with https://smart-swatch.netlify.app/
import { type Tuple } from '@mantine/core';

const blue = [
  '#ddf2ff',
  '#aed4ff',
  '#7db7ff',
  '#4b9aff',
  '#1a7eff',
  '#0064e6',
  '#004eb4',
  '#003882',
  '#002151',
  '#000b21',
] as const;

const teal = [
  '#defbfb',
  '#c0eded',
  '#9ddede',
  '#79d0d0',
  '#56c2c2',
  '#3da9a9',
  '#2b8383',
  '#1b5f5f',
  '#063939',
  '#001616',
] as const;

const purple = [
  '#efedff',
  '#cecaec',
  '#ada8d9',
  '#8d85c8',
  '#6c62b7',
  '#53489d',
  '#40387b',
  '#2e2859',
  '#1b1737',
  '#090719',
] as const;

const gray = [
  '#f2f2f2',
  '#d9d9d9',
  '#bfbfbf',
  '#a6a6a6',
  '#8c8c8c',
  '#737373',
  '#595959',
  '#404040',
  '#262626',
  '#0d0d0d',
] as const;

const green = [
  '#e4fbed',
  '#c3ecd3',
  '#a1ddb8',
  '#7ccf9d',
  '#59c282',
  '#3fa869',
  '#308351',
  '#205d39',
  '#0f3922',
  '#001507',
] as const;

const pink = [
  '#ffe9ef',
  '#f0c4d0',
  '#e09eb0',
  '#d37991',
  '#c55372',
  '#ac3a58',
  '#862c45',
  '#611f31',
  '#3c111d',
  '#1a020a',
] as const;

const red = [
  '#ffe4e4',
  '#ffb4b5',
  '#f98586',
  '#f65656',
  '#f22726',
  '#d9100d',
  '#a90909',
  '#7a0506',
  '#4b0102',
  '#1f0000',
] as const;

export const black = gray[9];
export const white = '#f9fafb';

export const color = {
  blue: [...blue],
  teal: [...teal],
  purple: [...purple],
  grey: [...gray],
  green: [...green],
  pink: [...pink],
  red: [...red],
  brand: [...blue],
} as Record<string, Tuple<string, 10>>;
