/**
 * Custom base theme for material-ui components.
 */
export const appTheme = {
  palette: {
    primary: {
      light: '#323232',
      main: '#cddc39',
      dark: '#191919',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffc400',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    // h1: {
    //   fontFamily: 'Roboto, sans-serif',
    // },
  },
  overrides: {
    // MuiButton: {
    //   outlined: {
    //     border: 'solid 2px #000000',
    //   },
    // },
    MuiPaper: {
      root: {
        backgroundColor: '#fafafa',
      },
    },
  },
};

export const userTheme = {
  palette: {
    primary: {
      main: '#ed4b82'
    },
    secondary: {
      main: '#ab003c',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#fafafa',
      },
    },
  },
};