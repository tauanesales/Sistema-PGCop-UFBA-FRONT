import { RouterProvider } from "react-router-dom";

import { DataProvider } from "@/providers/data";
import { router } from "@/routes";

import { LoadingProvider } from "../providers/loading";

export default function App() {
  return (
    <LoadingProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </LoadingProvider>
  );
}
