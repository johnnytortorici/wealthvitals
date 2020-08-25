import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../context/UserContext";

import { COLORS } from "../../../constants";
import Button from "../../buttons/PrimaryButton";

const ModuleForm = () => {
  const { id } = useContext(UserContext);
  const [error, setError] = useState("");

  // INCOME
  const [income, setIncome] = useState("");

  // NEEDS
  const [housing, setHousing] = useState("");
  const [utilities, setUtilities] = useState("");
  const [groceries, setGroceries] = useState("");
  const [transport, setTransport] = useState("");
  const [healthcare, setHealthcare] = useState("");
  const [debtMinimum, setDebtMinimum] = useState("");
  const needs = [
    housing,
    utilities,
    groceries,
    transport,
    healthcare,
    debtMinimum,
  ];

  // WANTS
  const [entertainment, setEntertainment] = useState("");
  const [dining, setDining] = useState("");
  const [shopping, setShopping] = useState("");
  const [gifts, setGifts] = useState("");
  const wants = [entertainment, dining, shopping, gifts];

  // SAVINGS
  const [emergency, setEmergency] = useState("");
  const [saving, setSaving] = useState("");
  const [debtRepayment, setDebtRepayment] = useState("");
  const savings = [emergency, saving, debtRepayment];

  // TOTALS
  const [totalNeeds, setTotalNeeds] = useState("");
  const [totalWants, setTotalWants] = useState("");
  const [totalSavings, setTotalSavings] = useState("");

  useEffect(() => {
    setTotalNeeds(0);
    needs.forEach((need) => {
      need === undefined && (need = 0);
      setTotalNeeds((totalNeeds) => totalNeeds + Number(need));
    });
  }, [housing, utilities, groceries, transport, healthcare, debtMinimum]);

  useEffect(() => {
    setTotalWants(0);
    wants.forEach((want) => {
      want === undefined && (want = 0);
      setTotalWants((totalWants) => totalWants + Number(want));
    });
  }, [entertainment, dining, shopping, gifts]);

  useEffect(() => {
    setTotalSavings(0);
    savings.forEach((saving) => {
      saving === undefined && (saving = 0);
      setTotalSavings((totalSavings) => totalSavings + Number(saving));
    });
  }, [emergency, saving, debtRepayment]);

  const handleCalculate = (ev) => {
    ev.preventDefault();

    fetch("/cashflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        needs: needs,
        wants: wants,
        savings: savings,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
        } else {
          setError(json.message);
          console.log(json);
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleCalculate(ev)}>
        <Heading>Monthly budget</Heading>
        <Categories>Income</Categories>
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
        <Categories>Needs</Categories>
        <FormItem>
          <Label htmlFor="housing">Housing</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="housing"
              value={housing}
              onChange={(ev) => setHousing(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="utilities">Utilities</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="utilities"
              value={utilities}
              onChange={(ev) => setUtilities(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="groceries">Groceries</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="groceries"
              value={groceries}
              onChange={(ev) => setGroceries(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="transport">Transport</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="transport"
              value={transport}
              onChange={(ev) => setTransport(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="healthcare">Healthcare</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="healthcare"
              value={healthcare}
              onChange={(ev) => setHealthcare(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="debtMinimum">Debt minimum payments</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="debtMinimum"
              value={debtMinimum}
              onChange={(ev) => setDebtMinimum(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Total>Total Needs</Total>
          <p>= ${totalNeeds.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <Categories>Wants</Categories>
        <FormItem>
          <Label htmlFor="entertainment">Entertainment</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="entertainment"
              value={entertainment}
              onChange={(ev) => setEntertainment(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="dining">Dining</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="dining"
              value={dining}
              onChange={(ev) => setDining(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="shopping">Shopping</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="shopping"
              value={shopping}
              onChange={(ev) => setShopping(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="gifts">Gifts</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="gifts"
              value={gifts}
              onChange={(ev) => setGifts(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Total>Total Wants</Total>
          <p>= ${totalWants.toLocaleString("en-CA")}</p>
        </FormItem>
        <Divider />
        <Categories>Savings</Categories>
        <FormItem>
          <Label htmlFor="emergency">Emergency fund</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="emergency"
              value={emergency}
              onChange={(ev) => setEmergency(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="saving">Saving & Investing</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="saving"
              value={saving}
              onChange={(ev) => setSaving(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor="debtRepayment">Debt repayment (above minimum)</Label>
          <div>
            ${" "}
            <Input
              type="number"
              id="debtRepayment"
              value={debtRepayment}
              onChange={(ev) => setDebtRepayment(ev.currentTarget.value)}
            />
          </div>
        </FormItem>
        <FormItem>
          <Total>Total Savings</Total>
          <p>= ${totalSavings.toLocaleString("en-CA")}</p>
        </FormItem>
        <ButtonWrapper>
          <CalculateButton type="submit">Calculate Score</CalculateButton>
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
  padding-bottom: 30px;
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

const CalculateButton = styled(Button)``;

export default ModuleForm;
