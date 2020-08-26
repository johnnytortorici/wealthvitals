import React, { useState, useContext } from "react";
import styled from "styled-components";

import { EmergencyFundContext } from "../../context/EmergencyFundContext";

import { COLORS, SIZE } from "../../../constants";
import Button from "../../buttons/PrimaryButton";

const ModuleForm = () => {
  const {
    emergencyFundStatus,
    emergencyFundIsComplete,
    handleCalculate,
    emergencyFundScore,
    income,
    setIncome,
    currentSavings,
    setCurrentSavings,
    monthlySavings,
    setMonthlySavings,
    totalEmergencyFund,
  } = useContext(EmergencyFundContext);

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleCalculate(ev)}>
        <Categories>Monthly Income</Categories>
        <FormItem>
          <Label htmlFor="income">After-tax Income (Net)</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="income"
              value={income}
              onChange={(ev) => setIncome(ev.currentTarget.value)}
              required
            />
          </div>
        </FormItem>
        <Divider />
        <Categories>Emergency fund</Categories>
        <FormItem>
          <Label htmlFor="currentSavings">
            Current emergency savings (optional)
          </Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="currentSavings"
              value={currentSavings}
              onChange={(ev) => setCurrentSavings(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="monthlySavings">
            Monthly savings goal (optional)
          </Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="monthlySavings"
              value={monthlySavings}
              onChange={(ev) => setMonthlySavings(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Total>Total within 6 months</Total>
          <p>= ${totalEmergencyFund.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <ButtonWrapper>
          <CalculateButton type="submit">
            {!emergencyFundIsComplete ? "Calculate Score" : "Update Score"}
          </CalculateButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  padding: 40px 0;
  width: 500px;
`;

const Heading = styled.h2`
  text-align: center;
  padding-bottom: 20px;
`;

const Tip = styled.p`
  padding-bottom: 20px;
  text-align: center;
  font-size: ${SIZE.HELPER};
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

const Label = styled.label`
  padding-left: 20px;
`;

const Input = styled.input`
  width: 100px;
`;

const Categories = styled.h2``;

const Total = styled.p`
  padding-left: 20px;
  font-weight: 600;
`;

const Divider = styled.div`
  margin: 20px 0 10px;
  border-bottom: 1px solid ${COLORS.BORDER};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

const ReconcileHelper = styled.div`
  text-align: right;
  font-weight: 600;
  padding-top: 20px;
`;

const Status = styled.p`
  color: ${(prop) => prop.color};
`;

const CalculateButton = styled(Button)`
  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.PRIMARY_TEXT};
  }
`;

export default ModuleForm;
