/**
 * Custom base theme for material-ui components.
 */
const customizedThemes = {
  palette: {
    primary: {
      light: '#bec358',
      main: '#868735',
      dark: '#4f3d16',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontFamily: 'Great Vibes, cursive',
      fontSize: '70px',
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        border: 'solid 2px #000000',
      },
    },
  },
};

export default customizedThemes;
