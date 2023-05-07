import React, { MouseEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";
import "./../../../index.css";

type Props = {
  children: ReactNode | ReactNode[];
  show: boolean;
  onClick: MouseEventHandler<HTMLElement>;
};

const SideDrawer = (props: Props) => {
  const content = (
    <aside className="side-drawer" onClick={props.onClick}>
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as HTMLElement
  );
};

export default SideDrawer;
