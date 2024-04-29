import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/providers/auth";
import { DataProvider } from "@/providers/data";
import { router } from "@/routes";

import { LoadingProvider } from "../providers/loading";

export default function App() {
  return (
    <LoadingProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </DataProvider>
    </LoadingProvider>
  );
}
