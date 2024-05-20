import { Snackbar as SnackbarMUI } from "@mui/material";
import { useEffect, useState } from "react";

import { setMessage, useMessagesStore } from "@/store/messages";

export const Snackbar = () => {
  const { message } = useMessagesStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = () => setMessage("");

  return (
    <SnackbarMUI
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
    />
  );
};
