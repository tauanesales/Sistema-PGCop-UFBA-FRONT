import React from "react";

import { useUserQueries } from "@/queries/user";
import { useTokensStore } from "@/store/tokens";

import { ProtectedRoute } from "./ProtectedRoute";

export type AuthenticationGuardProps = {
  children?: React.ReactElement;
  redirectPath?: string;
  allowedRoles?: string[];
};

export const AuthenticationGuard = ({
  redirectPath = "/login",
  allowedRoles,
  ...props
}: AuthenticationGuardProps) => {
  const tokens = useTokensStore();

  const { useGetUser } = useUserQueries();

  const enabled = !!tokens.accessToken;

  const { data: user } = useGetUser(enabled);

  const isAllowed =
    !!tokens?.accessToken && !!user && !!allowedRoles?.includes(user.tipo);

  return (
    <ProtectedRoute
      redirectPath={redirectPath}
      isAllowed={isAllowed}
      {...props}
    />
  );
};
