import { createTheme,ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { pt } from "date-fns/locale/pt";
import { RouterProvider } from "react-router-dom";

import { DataProvider } from "@/providers/data";
import { router } from "@/routes";

import { LoadingProvider } from "../providers/loading";

const theme = createTheme({}, ptBR);

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </LoadingProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
