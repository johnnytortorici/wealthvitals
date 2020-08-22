import styled from "styled-components";
import { COLORS } from "../../constants";

import UnstyledButton from "./UnstyledButton";

export default styled(UnstyledButton)`
  padding: 7px 10px;
  margin: 15px 0;
  text-align: center;
  background-color: ${COLORS.THEME};
  color: #fff;
  border-radius: 5px;
  transition: 0.15s;
  &:hover {
    opacity: 0.8;
  }
`;
