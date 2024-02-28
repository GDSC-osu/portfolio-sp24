/*
 * Material UI has theming for its components that you can modify
 * We modify it by calling createTheme, passing in an object that represents the theme values that we are changing
 */

import { createTheme, responsiveFontSizes } from "@mui/material";

// https://mui.com/material-ui/customization/palette/
const PRIMARY_COLOR = '#BA0000';
const PRIMARY_COLOR_PASTEL = '#A0616A';
const palletChanges = {
  primary: {
    pastel: PRIMARY_COLOR_PASTEL,
    500: PRIMARY_COLOR
  }
};


// https://mui.com/material-ui/customization/typography/
const headerOptions = {
  color: PRIMARY_COLOR,
  fontWeight: '800',
}
const typographyChanges = {
  fontFamily: [
    "'Open Sans', sans-serif",
  ],
  h1: {
    fontSize: '3.75rem',
    ...headerOptions
  },
  h2: {
    fontSize: '3.25rem',
    ...headerOptions
  },
  h3: {
    fontSize: '2.75rem',
    ...headerOptions
  },
  h4: {
    fontSize: '2.25rem',
    ...headerOptions
  },
  h5: {
    fontSize: '1.75rem',
    ...headerOptions
  },
  h6: {
    fontSize: '1.25rem',
    ...headerOptions,
    fontWeight: '600'
  },
  navbar: {
    fontWeight: '600',
    color: 'black'
  }
}

export default responsiveFontSizes(createTheme({
  palette: palletChanges,
  typography: typographyChanges,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFFFFF",
          backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #777777 100%)`,
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
      },
    },
  }

}));