import React from "react";
import styled from "@emotion/styled";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";

export const StyledTooltip = styled(
  ({ className, ...props }: React.PropsWithChildren<TooltipProps>) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    maxWidth: 200,
    padding: 8,
  },
}));
