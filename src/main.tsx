import { createRoot } from 'react-dom/client'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme.ts";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SnackbarProvider} from "notistack";
import AppRouter from "./router.tsx";


createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <SnackbarProvider maxSnack={3}>
            <AppRouter/>
        </SnackbarProvider>
    </ThemeProvider>
)
