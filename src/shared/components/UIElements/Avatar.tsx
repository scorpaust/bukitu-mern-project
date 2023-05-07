import React, { CSSProperties } from "react";

import "./Avatar.css";

type Props = {
  className?: string | undefined;
  image: string;
  alt: string;
  width?: number | undefined;
  style?: CSSProperties | undefined;
};

const Avatar = (props: Props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
