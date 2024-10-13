import {createTheme, responsiveFontSizes} from "@mui/material";

let theme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#00cfe3',
        },
        secondary: {
            main: '#05838f',
        },
        background: {
            default: '#292C31',
            paper: '#292C31'
        },
        text: {
            secondary: '#1ac5d5',
            hint: '#bcbcbc',
        },
    },
});

theme = responsiveFontSizes(theme);

export {theme};
