import React from "react";
import styled from "styled-components";

import { COLORS, SIZE } from "../../../constants";

const Chart = ({ debtRatio }) => {
  const dollarAmount = (debtRatio / 100).toFixed(2).toLocaleString("en-CA");

  return (
    <Wrapper>
      <Outside>
        <MyRatio>
          {debtRatio !== "" ? (
            <>
              <Percent>{debtRatio}%</Percent>
              <Dollar>${dollarAmount} of every $1.00 earned</Dollar>
            </>
          ) : (
            <Pending>Calculate below</Pending>
          )}
        </MyRatio>
        <Ranges>
          <Range>
            <p>30% or less</p>
            <p>Great!</p>
          </Range>
          <Range>
            <p>31% to 40%</p>
            <p>Good</p>
          </Range>
          <Range>
            <p>41% or more</p>
            <p>Needs attention</p>
          </Range>
        </Ranges>
      </Outside>
      <ChartLabel>My debt ratio</ChartLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const Outside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 50%;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
`;
const MyRatio = styled.div`
  padding-bottom: 30px;
  color: ${COLORS.THEME};
  text-align: center;
`;

const Percent = styled.p`
  font-size: 4em;
  font-weight: 600;
`;

const Dollar = styled.p`
  padding-top: 20px;
  font-size: ${SIZE.HELPER};
  color: ${COLORS.PRIMARY_TEXT};
`;

const Pending = styled.p`
  font-size: 1.5em;
  font-weight: 600;
`;

const Ranges = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid ${COLORS.BORDER};
`;

const Range = styled.div`
  width: 33%;
  text-align: center;
`;

const ChartLabel = styled.p`
  padding-top: 10px;
  font-weight: 600;
`;

export default Chart;
