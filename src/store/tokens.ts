import { persist } from "zustand/middleware";

import { create } from "./helpers";

interface Tokens {
  accessToken?: string;
  tokenType?: string;
}

interface TokensStore {
  tokens: Tokens;
  saveTokens: (tokens: Tokens) => void;
}

export const useTokensStore = create<TokensStore>()(
  persist((set) => ({ tokens: {}, saveTokens: (tokens) => set({ tokens }) }), {
    name: "tokens",
  }),
);
