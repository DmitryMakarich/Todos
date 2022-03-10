import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface Props {
  isOpenSnackBar: boolean;
  isSuccessfullyDeleted: boolean | null;
  snackBarHandler:
    | ((event: React.SyntheticEvent<Element, Event>) => void)
    | undefined;
}

export default function CustomSnackBar({
  isOpenSnackBar,
  isSuccessfullyDeleted,
  snackBarHandler,
}: Props) {
  return (
    <Snackbar
      open={isOpenSnackBar}
      autoHideDuration={3000}
    >
      <Alert
        onClose={snackBarHandler}
        severity={isSuccessfullyDeleted ? "success" : "info"}
        sx={{ width: "100%" }}
      >
        {isSuccessfullyDeleted ? "Todo was deleted" : "Action was denied"}
      </Alert>
    </Snackbar>
  );
}
