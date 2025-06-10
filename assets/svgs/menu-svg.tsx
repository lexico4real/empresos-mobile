import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function MenuSvg() {
  return (
    <Svg width="26" height="14" viewBox="0 0 26 14" fill="none">
      <Path
        d="M1 7H19M1 1H25M1 13H13"
        stroke="#EC0000"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
