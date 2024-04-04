import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import { LoadingProvider } from "../providers/loading";

export default function App() {
  return (
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
  );
}
