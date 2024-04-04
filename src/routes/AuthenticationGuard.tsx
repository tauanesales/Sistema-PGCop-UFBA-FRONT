import * as React from "react";

import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../contexts/auth";

export type AuthenticationGuardProps = {
  children?: React.ReactElement;
  redirectPath?: string;
  guardType?: "authenticated" | "unauthenticated";
};

export const AuthenticationGuard = ({
  redirectPath = "/login",
  guardType = "authenticated",
  ...props
}: AuthenticationGuardProps) => {
  const { user } = useAuth();

  const isAllowed = guardType === "authenticated" ? !!user : !user;

  return (
    <ProtectedRoute
      redirectPath={redirectPath}
      isAllowed={isAllowed}
      {...props}
    />
  );
};
