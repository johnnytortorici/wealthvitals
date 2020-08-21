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
    font-size: 1.2em;
  }
  h1 {
    font-size: 1.8em;
  }
  a {
    color: ${COLORS.PRIMARY_TEXT};
  }
  a:hover {
    text-decoration: none;
  }
  input {
    padding: 4px 5px;
    font-size: 1em;
    color: ${COLORS.PRIMARY_TEXT};
  }
`;
