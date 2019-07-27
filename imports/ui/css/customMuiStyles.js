/**
 * Custom base theme for material-ui components.
 */
const paperColor = '#fafafa';
const PURPLE = '#6d1b7b';
const PINK = '#f73378';
const GREEN ='#cddc39';
const YELLOW = '#ffcf33';

export const appTheme = {
  palette: {
    primary: {
      light: '#323232',
      main: PINK,
      dark: '#191919',
      contrastText: '#ffffff',
    },
    secondary: {
      main: PURPLE,
    },
  },
  typography: {
    fontFamily: 'sans-serif',
  },
};

export const userTheme = {
  palette: {
    primary: {
      main: GREEN,
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: paperColor,
      },
    },
  },
};