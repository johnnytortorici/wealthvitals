import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import { DebtContext } from "../../context/DebtContext";

import { COLORS, BREAK } from "../../../constants";
import Button from "../../buttons/PrimaryButton";

import { FiLoader } from "react-icons/fi";

const ModuleForm = () => {
  const {
    debtStatus,
    debtIsComplete,
    handleCalculate,
    income,
    setIncome,
    housing,
    setHousing,
    loanPayments,
    setLoanPayments,
    creditCards,
    setCreditCards,
    otherDebt,
    setOtherDebt,
    totalMonthlyDebt,
  } = useContext(DebtContext);

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleCalculate(ev)}>
        <Categories>Monthly Income</Categories>
        <FormItem>
          <Label htmlFor="income">Before-tax Income (Gross)</Label>
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
        <Categories>Monthly debt payments</Categories>
        <FormItem>
          <Label htmlFor="housing">
            Mortgage or rent payment (including taxes, insurance and condo fees)
          </Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="housing"
              value={housing}
              onChange={(ev) => setHousing(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="loanPayments">Personal/student loan payment</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="loanPayments"
              value={loanPayments}
              onChange={(ev) => setLoanPayments(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="creditCards">Credit card minimum payments</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="creditCards"
              value={creditCards}
              onChange={(ev) => setCreditCards(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="otherDebt">Other debt payments</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="otherDebt"
              value={otherDebt}
              onChange={(ev) => setOtherDebt(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Total>Total monthyl debt payments</Total>
          <p>= ${totalMonthlyDebt.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <ButtonWrapper>
          <CalculateButton
            type="submit"
            disabled={debtStatus === "loading" ? true : false}
          >
            {debtStatus !== "loading" ? (
              !debtIsComplete ? (
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
  width: 600px;

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
