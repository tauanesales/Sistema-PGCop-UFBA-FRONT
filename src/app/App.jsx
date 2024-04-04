import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import { AuthProvider } from "../providers/auth";
import { LoadingProvider } from "../providers/loading";

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </AuthProvider>
  );
}
