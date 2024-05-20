import { RouterProvider } from "react-router-dom";

import { Snackbar } from "@/components/Snackbar";
import { DataProvider } from "@/providers/data";
import { router } from "@/routes";

import { LoadingProvider } from "../providers/loading";

export default function App() {
  return (
    <LoadingProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <Snackbar />
      </DataProvider>
    </LoadingProvider>
  );
}
