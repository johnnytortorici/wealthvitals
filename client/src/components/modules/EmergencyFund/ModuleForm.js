import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import { EmergencyFundContext } from "../../context/EmergencyFundContext";

import { COLORS, BREAK } from "../../../constants";
import Button from "../../buttons/PrimaryButton";

import { FiLoader } from "react-icons/fi";

const ModuleForm = () => {
  const {
    emergencyFundStatus,
    emergencyFundIsComplete,
    handleCalculate,
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
          <InputWrapper>
            $
            <Input
              type="number"
              id="income"
              value={income}
              onChange={(ev) => setIncome(ev.currentTarget.value)}
              required
            />
          </InputWrapper>
        </FormItem>
        <Divider />
        <Categories>Emergency fund</Categories>
        <FormItem>
          <Label htmlFor="currentSavings">
            Current emergency savings (optional)
          </Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="currentSavings"
              value={currentSavings}
              onChange={(ev) => setCurrentSavings(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="monthlySavings">
            Monthly savings goal (optional)
          </Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="monthlySavings"
              value={monthlySavings}
              onChange={(ev) => setMonthlySavings(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Total>Total within 6 months</Total>
          <p>= ${totalEmergencyFund.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <ButtonWrapper>
          <CalculateButton
            type="submit"
            disabled={emergencyFundStatus === "loading" ? true : false}
          >
            {emergencyFundStatus !== "loading" ? (
              !emergencyFundIsComplete ? (
                "Calculate Score"
              ) : (
                "Update Score"
              )
            ) : (
              <LoaderIcon />
            )}
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

  @media (max-width: ${BREAK.SMALL}) {
    width: 100%;
  }
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

const Label = styled.label`
  padding-left: 20px;

  @media (max-width: ${BREAK.SMALL}) {
    padding-left: 0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100px;
  margin-left: 5px;
`;

const Categories = styled.h2``;

const Total = styled.p`
  padding-left: 20px;
  font-weight: 600;

  @media (max-width: ${BREAK.SMALL}) {
    padding-left: 0;
  }
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

const CalculateButton = styled(Button)`
  width: 160px;

  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.PRIMARY_TEXT};
  }
`;

const loader = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderIcon = styled(FiLoader)`
  animation: ${loader} 2000ms infinite;
`;

export default ModuleForm;
