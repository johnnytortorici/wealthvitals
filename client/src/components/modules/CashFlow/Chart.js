import React from "react";
import styled from "styled-components";

import { COLORS } from "../../../constants";
import { BsSquareFill } from "react-icons/bs";

const Chart = ({ income, totalNeeds, totalWants, totalSavings }) => {
  return (
    <Wrapper>
      <Legend>
        <LegendItem>
          <BsSquareFill color={"#c3adf5"} />
          <LegendLabel>Needs (%)</LegendLabel>
        </LegendItem>
        <LegendItem>
          <BsSquareFill color={"#9770ed"} />
          <LegendLabel>Wants (%)</LegendLabel>
        </LegendItem>
        <LegendItem>
          <BsSquareFill color={COLORS.THEME} />
          <LegendLabel>Savings (%)</LegendLabel>
        </LegendItem>
      </Legend>
      <Guages>
        <GaugeWrapper>
          <Outside>
            <Inside>
              <Needs
                percent={income !== "" ? `${(totalNeeds / income) * 100}` : 0}
              >
                {income !== ""
                  ? `${Math.round((totalNeeds / income) * 100)}`
                  : 0}
              </Needs>
              <Wants
                percent={income !== "" ? `${(totalWants / income) * 100}` : 0}
              >
                {income !== ""
                  ? `${Math.round((totalWants / income) * 100)}`
                  : 0}
              </Wants>
              <Savings
                percent={income !== "" ? `${(totalSavings / income) * 100}` : 0}
              >
                {income !== ""
                  ? `${Math.round((totalSavings / income) * 100)}`
                  : 0}
              </Savings>
            </Inside>
          </Outside>
          <GaugeLabel>My cash flow</GaugeLabel>
        </GaugeWrapper>
        <GaugeWrapper>
          <Outside>
            <Inside>
              <Needs percent={50}>50</Needs>
              <Wants percent={30}>30</Wants>
              <Savings percent={20}>20</Savings>
            </Inside>
          </Outside>
          <GaugeLabel>50/30/20 Rule</GaugeLabel>
        </GaugeWrapper>
      </Guages>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  padding: 10px 0 40px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendLabel = styled.p`
  padding-left: 10px;
`;

const Guages = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GaugeLabel = styled.p`
  padding-top: 10px;
  font-weight: 600;
`;

const Outside = styled.div`
  padding: 20px;
  height: 300px;
  width: 80px;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 10px;
`;
const Inside = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid ${COLORS.PRIMARY_TEXT};
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  font-weight: 600;
`;

const Needs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(prop) => prop.percent}%;
  background-color: #c3adf5;
`;

const Wants = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(prop) => prop.percent}%;
  background-color: #9770ed;
`;

const Savings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(prop) => prop.percent}%;
  background-color: ${COLORS.THEME};
`;

export default Chart;
