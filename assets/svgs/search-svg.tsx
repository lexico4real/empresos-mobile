import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function SearchSvg() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M15.3333 15.3333L10.6667 10.6667M10.6667 10.6667C11.9733 9.36 12.6667 7.5 12.6667 5.33333C12.6667 3.16667 11.9733 1.30667 10.6667 0C9.36 1.30667 8.66667 3.16667 8.66667 5.33333C8.66667 7.5 9.36 9.36 10.6667 10.6667Z"
        stroke="#EC0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
