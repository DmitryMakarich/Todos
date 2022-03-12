import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface Props {
  isOpenSnackBar: boolean;
  isSuccessfully: boolean | null;
  successMessage: string;
  deniedMessage?: string;
  snackBarHandler:
    | ((event: React.SyntheticEvent<Element, Event>) => void)
    | undefined;
}

export default function CustomSnackBar({
  isOpenSnackBar,
  isSuccessfully,
  successMessage,
  deniedMessage,
  snackBarHandler,
}: Props) {
  return (
    <Snackbar open={isOpenSnackBar} autoHideDuration={3000}>
      <Alert
        onClose={snackBarHandler}
        severity={isSuccessfully ? "success" : "info"}
        sx={{ width: "100%" }}
      >
        {isSuccessfully ? successMessage : deniedMessage}
      </Alert>
    </Snackbar>
  );
}
