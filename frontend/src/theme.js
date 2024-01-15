import { blue, lightBlue,grey } from '@mui/material/colors';
export const themeColors = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary:{
            main: blue[600]
            },
            secondary: {
              main: lightBlue[800],
              midNightBlue: "#003366"
            },
          }
        : {
            primary:{
              main: "#003366",
              white: "003366"
            }, 
            secondary:{
              main: blue[500],
              midNightBlue: "#2196f3"
            }, 
            background: {
              default: "#2196f3",
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });
  