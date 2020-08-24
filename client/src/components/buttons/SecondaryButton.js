import styled from "styled-components";
import { COLORS } from "../../constants";

import UnstyledButton from "./UnstyledButton";

export default styled(UnstyledButton)`
  padding: 7px 10px;
  margin: 15px 0;
  text-align: center;
  color: ${COLORS.THEME};
  border: 2px solid ${COLORS.THEME};
  background-color: #fff;
  border-radius: 5px;
  transition: 0.15s;
  &:hover {
    color: #fff;
    background-color: ${COLORS.THEME};
  }
`;
