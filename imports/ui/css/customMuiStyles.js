/**
 * Custom base theme for material-ui components.
 */
const paperColor = '#fafafa';
const PURPLE = '#6d1b7b';
const PINK = '#f73378';
const GREEN ='#618833';
const YELLOW = '#ffcf33';

export const appTheme = {
  palette: {
    primary: {
      main: YELLOW,
    },
    secondary: {
      main: GREEN,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: paperColor,
      },
    },
  },
};

export const userTheme = {
  // palette: {
  //   primary: {
  //     main: GREEN,
  //   },
  // },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: paperColor,
      },
    },
  },
};