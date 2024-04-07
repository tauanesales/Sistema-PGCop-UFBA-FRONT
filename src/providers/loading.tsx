import { ReactNode, useMemo, useState } from "react";

import { LoadingAPIContext, LoadingContext } from "../contexts/loading";

type Props = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  const api = useMemo(() => {
    const showSpinner = () => setLoading(true);

    const hideSpinner = () => setLoading(false);

    return {
      showSpinner,
      hideSpinner,
    };
  }, []);

  return (
    <LoadingAPIContext.Provider value={api}>
      <LoadingContext.Provider value={loading}>
        {children}
      </LoadingContext.Provider>
    </LoadingAPIContext.Provider>
  );
};
