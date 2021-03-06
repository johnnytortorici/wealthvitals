import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import { CashFlowContext } from "../../context/CashFlowContext";

import { COLORS, SIZE, BREAK } from "../../../constants";
import Button from "../../buttons/PrimaryButton";

import { FiLoader } from "react-icons/fi";

const ModuleForm = () => {
  const {
    cashFlowStatus,
    cashFlowIsComplete,
    handleCalculate,
    income,
    setIncome,
    needs,
    setNeeds,
    wants,
    setWants,
    savings,
    setSavings,
    totalNeeds,
    totalWants,
    totalSavings,
    reconcile,
  } = useContext(CashFlowContext);

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleCalculate(ev)}>
        <Heading>Monthly budget</Heading>
        <Tip>*Tip: Income should be equal to Needs + Wants + Savings</Tip>
        <Categories>Income</Categories>
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
        <Categories>Needs</Categories>
        <FormItem>
          <Label htmlFor="housing">Housing</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="housing"
              value={needs.housing}
              onChange={(ev) => setNeeds.setHousing(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="utilities">Utilities</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="utilities"
              value={needs.utilities}
              onChange={(ev) => setNeeds.setUtilities(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="groceries">Groceries</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="groceries"
              value={needs.groceries}
              onChange={(ev) => setNeeds.setGroceries(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="transport">Transport</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="transport"
              value={needs.transport}
              onChange={(ev) => setNeeds.setTransport(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="healthcare">Healthcare</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="healthcare"
              value={needs.healthcare}
              onChange={(ev) => setNeeds.setHealthcare(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="debtMinimum">Debt minimum payments</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="debtMinimum"
              value={needs.debtMinimum}
              onChange={(ev) => setNeeds.setDebtMinimum(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Total>Total Needs</Total>
          <p>= ${totalNeeds.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <Categories>Wants</Categories>
        <FormItem>
          <Label htmlFor="entertainment">Entertainment</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="entertainment"
              value={wants.entertainment}
              onChange={(ev) =>
                setWants.setEntertainment(ev.currentTarget.value)
              }
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="dining">Dining</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="dining"
              value={wants.dining}
              onChange={(ev) => setWants.setDining(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="shopping">Shopping</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="shopping"
              value={wants.shopping}
              onChange={(ev) => setWants.setShopping(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="gifts">Gifts</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="gifts"
              value={wants.gifts}
              onChange={(ev) => setWants.setGifts(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Total>Total Wants</Total>
          <p>= ${totalWants.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <Categories>Savings</Categories>
        <FormItem>
          <Label htmlFor="emergency">Emergency fund</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="emergency"
              value={savings.emergency}
              onChange={(ev) => setSavings.setEmergency(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="saving">Saving & Investing</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="saving"
              value={savings.saving}
              onChange={(ev) => setSavings.setSaving(ev.currentTarget.value)}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="debtRepayment">Debt repayment (above minimum)</Label>
          <InputWrapper>
            $
            <Input
              type="number"
              id="debtRepayment"
              value={savings.debtRepayment}
              onChange={(ev) =>
                setSavings.setDebtRepayment(ev.currentTarget.value)
              }
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Total>Total Savings</Total>
          <p>= ${totalSavings.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <FormItem></FormItem>
        <ReconcileHelper>
          {reconcile === 0 ? (
            <Status color={COLORS.THEME}>Balanced budget!</Status>
          ) : reconcile > 0 ? (
            <Status color={COLORS.ORANGE}>
              ${Math.abs(reconcile).toLocaleString("en-CA")} Left to budget.
            </Status>
          ) : (
            <Status color={COLORS.ORANGE}>
              ${Math.abs(reconcile).toLocaleString("en-CA")} Over budget.
            </Status>
          )}
        </ReconcileHelper>
        <ButtonWrapper>
          <CalculateButton
            type="submit"
            disabled={
              reconcile !== 0 || cashFlowStatus === "loading" ? true : false
            }
          >
            {cashFlowStatus !== "loading" ? (
              !cashFlowIsComplete ? (
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

const ReconcileHelper = styled.div`
  text-align: right;
  font-weight: 600;
  padding-top: 20px;
`;

const Status = styled.p`
  color: ${(prop) => prop.color};
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
