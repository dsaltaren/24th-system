// Upstream revision: f649e467d1bc9f272aae3f8daa329d4c924e7340
// Rune Icons outline, https://github.com/Nexvyn/runeicons, Apache-2.0.
// Source paths below preserve attribution. Adapted to React props and currentColor.
import { createElement, type SVGProps } from 'react';
type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };
type Shape = [string, Record<string, string>];
function icon(name: string, shapes: Shape[]) {
  return function RuneIcon({size = 24, color = "currentColor", strokeWidth = 2, ...props}: IconProps) {
    return createElement("svg", {width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth, strokeLinecap:"round", strokeLinejoin:"round", "data-rune-icon":name, ...props}, shapes.map(([tag, attrs], key) => createElement(tag, {...attrs, key})));
  };
}
// public/normal/arrows/arrow-down.svg
export const ArrowDown = icon("ArrowDown", [["path", {"d": "M12 5V19M5 12L12 19L19 12"}]]);
// public/normal/arrows/arrow-left.svg
export const ArrowLeft = icon("ArrowLeft", [["path", {"d": "M12 5L5 12L12 19M5 12H19"}]]);
// public/normal/arrows/arrow-right.svg
export const ArrowRight = icon("ArrowRight", [["path", {"d": "M5 12H19M12 19L19 12L12 5"}]]);
// public/normal/arrows/arrow-up-right.svg
export const ArrowUpRight = icon("ArrowUpRight", [["path", {"d": "M17 17V7H7M17 7L7 17"}]]);
// public/normal/schedule/calendar.svg
export const CalendarDays = icon("CalendarDays", [["path", {"d": "M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"}]]);
// public/normal/indicators/check.svg
export const Check = icon("Check", [["path", {"d": "M20 6L9 17L4 12"}]]);
// public/normal/arrows/chevron-down.svg
export const ChevronDown = icon("ChevronDown", [["path", {"d": "M6 9L12 15L18 9"}]]);
// public/normal/arrows/chevron-left.svg
export const ChevronLeft = icon("ChevronLeft", [["path", {"d": "M15 18L9 12L15 6"}]]);
// public/normal/arrows/chevron-right.svg
export const ChevronRight = icon("ChevronRight", [["path", {"d": "M9 18L15 12L9 6"}]]);
// public/normal/arrows/chevron-up.svg
export const ChevronUp = icon("ChevronUp", [["path", {"d": "M18 15L12 9L6 15"}]]);
// public/normal/indicators/circle-dot.svg
export const Circle = icon("Circle", [["path", {"d": "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"}], ["path", {"d": "M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"}]]);
// public/normal/indicators/circle-alert.svg
export const CircleAlert = icon("CircleAlert", [["path", {"d": "M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"}]]);
// public/normal/indicators/circle-check.svg
export const CircleCheck = icon("CircleCheck", [["path", {"d": "M9 12L11 14L15 10M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"}]]);
// public/normal/code/copy.svg
export const Copy = icon("Copy", [["path", {"d": "M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4M10 8H20C21.1046 8 22 8.89543 22 10V20C22 21.1046 21.1046 22 20 22H10C8.89543 22 8 21.1046 8 20V10C8 8.89543 8.89543 8 10 8Z"}]]);
// public/normal/indicators/info.svg
export const Info = icon("Info", [["path", {"d": "M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"}]]);
// public/normal/arrows/rotate-cw.svg
export const LoaderCircle = icon("LoaderCircle", [["path", {"d": "M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.52 3 16.93 4 18.74 5.74L21 8M16 8H21L21 3"}]]);
// public/normal/indicators/minus.svg
export const Minus = icon("Minus", [["path", {"d": "M5 12H19"}]]);
// public/normal/playback/pause.svg
export const Pause = icon("Pause", [["path", {"d": "M18 3H15C14.4477 3 14 3.44772 14 4V20C14 20.5523 14.4477 21 15 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3Z"}], ["path", {"d": "M9 3H6C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 20.5523 10 20V4C10 3.44772 9.55228 3 9 3Z"}]]);
// public/normal/playback/play.svg
export const Play = icon("Play", [["path", {"d": "M5 4.99998C4.9999 4.64807 5.09265 4.30237 5.26888 3.99777C5.44512 3.69318 5.69861 3.44047 6.00375 3.26518C6.30889 3.08988 6.65488 2.99821 7.00679 2.9994C7.3587 3.0006 7.70406 3.09462 8.008 3.27198L20.005 10.27C20.3078 10.4457 20.5591 10.6977 20.7339 11.001C20.9088 11.3042 21.0009 11.6481 21.0012 11.9981C21.0015 12.3482 20.91 12.6922 20.7357 12.9957C20.5614 13.2993 20.3105 13.5518 20.008 13.728L8.008 20.728C7.70406 20.9053 7.3587 20.9994 7.00679 21.0006C6.65488 21.0018 6.30889 20.9101 6.00375 20.7348C5.69861 20.5595 5.44512 20.3068 5.26888 20.0022C5.09265 19.6976 4.9999 19.3519 5 19V4.99998Z"}]]);
// public/normal/indicators/plus.svg
export const Plus = icon("Plus", [["path", {"d": "M5 12H19M12 5V19"}]]);
// public/normal/layouts/grid-3x3.svg
export const Ruler = icon("Ruler", [["path", {"d": "M3 9H21M3 15H21M9 3V21M15 3V21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"}]]);
// public/normal/tools/search.svg
export const Search = icon("Search", [["path", {"d": "M20.9999 21.0002L16.6599 16.6602M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"}]]);
// public/normal/nature/cloud-upload.svg
export const Upload = icon("Upload", [["path", {"d": "M12 13V21M16 17L12 13L8 17M4.00009 14.899C3.25714 14.1399 2.69666 13.2217 2.36113 12.214C2.0256 11.2062 1.9238 10.1353 2.06346 9.08232C2.20311 8.02938 2.58055 7.02202 3.16719 6.13655C3.75383 5.25109 4.53428 4.51074 5.44943 3.97157C6.36458 3.43241 7.39042 3.10857 8.44926 3.0246C9.5081 2.94062 10.5722 3.09871 11.5609 3.48688C12.5496 3.87505 13.4369 4.48313 14.1558 5.26506C14.8747 6.04698 15.4062 6.98225 15.7101 8.00002H17.5001C18.4656 7.99991 19.4056 8.31034 20.1811 8.88546C20.9566 9.46058 21.5266 10.2699 21.8069 11.1938C22.0871 12.1178 22.0628 13.1074 21.7374 14.0164C21.4121 14.9254 20.803 15.7057 20.0001 16.242"}]]);
// public/normal/indicators/x.svg
export const X = icon("X", [["path", {"d": "M18 6L6 18M6 6L18 18"}]]);
// public/normal/layouts/panel-left.svg
export const PanelLeft = icon("PanelLeft", [["path", {"d": "M9 3V21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"}]]);
// public/normal/indicators/triangle-alert.svg
export const TriangleAlert = icon("TriangleAlert", [["path", {"d": "M12 9V13M12 17H12.01M21.7301 18.0002L13.7301 4.00022C13.5556 3.69243 13.3027 3.43641 12.997 3.25829C12.6913 3.08017 12.3438 2.98633 11.9901 2.98633C11.6363 2.98633 11.2888 3.08017 10.9831 3.25829C10.6774 3.43641 10.4245 3.69243 10.2501 4.00022L2.25005 18.0002C2.07373 18.3056 1.98128 18.6521 1.98206 19.0047C1.98284 19.3573 2.07683 19.7035 2.2545 20.008C2.43217 20.3126 2.6872 20.5648 2.99375 20.7391C3.30029 20.9133 3.64746 21.0034 4.00005 21.0002H20.0001C20.351 20.9999 20.6956 20.9072 20.9993 20.7315C21.3031 20.5558 21.5553 20.3033 21.7306 19.9993C21.9059 19.6954 21.9981 19.3506 21.998 18.9997C21.9979 18.6488 21.9055 18.3041 21.7301 18.0002Z"}]]);
// public/normal/layouts/grip-horizontal.svg
export const MoreHorizontal = icon("MoreHorizontal", [["path", {"d": "M12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10Z"}], ["path", {"d": "M19 10C19.5523 10 20 9.55228 20 9C20 8.44772 19.5523 8 19 8C18.4477 8 18 8.44772 18 9C18 9.55228 18.4477 10 19 10Z"}], ["path", {"d": "M5 10C5.55228 10 6 9.55228 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10Z"}], ["path", {"d": "M12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16Z"}], ["path", {"d": "M19 16C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14C18.4477 14 18 14.4477 18 15C18 15.5523 18.4477 16 19 16Z"}], ["path", {"d": "M5 16C5.55228 16 6 15.5523 6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16Z"}]]);
