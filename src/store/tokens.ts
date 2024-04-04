import { persist } from "zustand/middleware";

import { create } from "./helpers";

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export const useTokensStore = create<Tokens>()(
  persist(() => ({}), {
    name: "tokens",
  }),
);

export const saveTokens = (tokens: Tokens) => useTokensStore.setState(tokens);
