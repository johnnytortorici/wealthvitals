import { createGlobalStyle } from "styled-components";
import { COLORS } from "../constants";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Raleway', sans-serif;
    background-color: ${COLORS.BACKGROUND};
    color: ${COLORS.PRIMARY_TEXT};
    font-size: 1.1em;
  }
  a {
    color: ${COLORS.PRIMARY_TEXT};
  }
  a:hover {
    text-decoration: none;
  }
  input, select {
    padding: 4px 5px;
    font-size: 1em;
    color: ${COLORS.PRIMARY_TEXT};
  }

  /* Remove Input Arrows/Spinners */

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;
