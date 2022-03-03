import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "./index.scss";

interface Props {
  className?: string;
  onCloseHandler: Function;
}

function ModalWrapper({
  children,
  className,
  onCloseHandler,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={cx("modal", { [className as string]: className })}
      onClick={() => onCloseHandler()}
    >
      {children}
    </div>
  );
}

export default function Modal(props: React.PropsWithChildren<Props>) {
  return ReactDOM.createPortal(<ModalWrapper {...props} />, document.body);
}
