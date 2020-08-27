import React from "react";
import styled from "styled-components";

import { COLORS, SIZE } from "../../../constants";

const Chart = ({ income, totalEmergencyFund, min, max }) => {
  return (
    <Wrapper>
      <GaugeWrapper>
        <Outside>
          <Inside>
            <Funds
              percent={
                income !== "" ? `${(totalEmergencyFund / max) * 100}` : 50
              }
            >
              <FundsAmount
                percent={income !== "" && `${(totalEmergencyFund / max) * 100}`}
              >
                {income !== "" &&
                  `$${totalEmergencyFund.toLocaleString("en-CA")}`}
              </FundsAmount>
            </Funds>
          </Inside>
          <ChartLabel>
            <LabelThree>
              <BarLabel>
                <p>|</p>
                <p>3 Months</p>
                <p>{income && `$${min.toLocaleString("en-CA")}`}</p>
                <p>Min. recommended</p>
              </BarLabel>
            </LabelThree>
            <LabelSix>
              <BarLabel>
                <p>|</p>
                <p>6 Mo.</p>
                <p>{income && `$${max.toLocaleString("en-CA")}`}</p>
              </BarLabel>
            </LabelSix>
          </ChartLabel>
        </Outside>
        <GaugeLabel>My emergency fund</GaugeLabel>
      </GaugeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const ChartLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${SIZE.HELPER};
`;

const LabelThree = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`;

const LabelSix = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 33%;
`;

const BarLabel = styled.div`
  text-align: center;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

const GaugeLabel = styled.p`
  padding-top: 10px;
  font-weight: 600;
`;

const Outside = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
`;
const Inside = styled.div`
  padding: 10px 18px;
  height: 150px;
  border: 1px solid ${COLORS.PRIMARY_TEXT};
  overflow: hidden;
  color: #fff;
  font-weight: 600;
`;

const Funds = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${(prop) => prop.percent}%;
  background-color: ${COLORS.THEME};
`;

const FundsAmount = styled.p`
  transform: ${(prop) => (prop.percent < 20 ? "rotate(-90deg)" : "")};
`;

export default Chart;
