/**
 * Custom base theme for material-ui components.
 */
const paperColor = '#fafafa';
const PURPLE = '#6d1b7b';
const PINK = '#f73378';
const GREEN ='#618833';
const YELLOW = '#ffcf33';

export default appTheme = {
  palette: {
    primary: {
      main: '#78909C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#37474F',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'rgba(250, 250, 250, 0.725)',
      },
    },
  },
};