import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { GoalsContext } from "../../context/GoalsContext";

import { COLORS } from "../../../constants";
import Button from "../../buttons/SecondaryButton";

import { FiCheckCircle, FiLoader } from "react-icons/fi";

const GoalItem = ({ goal, type, index }) => {
  const { goalsStatus, handleSave, handleDelete } = React.useContext(
    GoalsContext
  );
  const [description, setDescription] = useState(
    goal.description ? goal.description : ""
  );
  const [category, setCategory] = useState(goal.category ? goal.category : "");
  const [goalAmount, setGoalAmount] = useState(
    goal.goalAmount ? goal.goalAmount : ""
  );
  const [starting, setStarting] = useState(goal.starting ? goal.starting : "");
  const [monthly, setMonthly] = useState(goal.monthly ? goal.monthly : "");
  const [dueDate, setDueDate] = useState(goal.dueDate ? goal.dueDate : "");
  const [estimatedDate, setEstimatedDate] = useState(
    goal.estimatedDate ? goal.estimatedDate : ""
  );
  const [goalStatus, setGoalStatus] = useState(
    goal.goalStatus ? goal.goalStatus : ""
  );

  return (
    <Form
      onSubmit={(ev) =>
        handleSave(
          ev,
          type,
          description,
          category,
          goalAmount,
          starting,
          monthly,
          dueDate,
          setEstimatedDate,
          setGoalStatus
        )
      }
    >
      <InputWrapper>
        <Label htmlFor="description">Goal description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(ev) => setDescription(ev.currentTarget.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(ev) => setCategory(ev.currentTarget.value)}
          required
        >
          <option>Choose</option>
          <option value="purchase">Large purchase</option>
          <option value="travel">Travel</option>
          <option value="savings">Savings</option>
          <option value="debt">Pay off debt</option>
          <option value="education">Education</option>
          <option value="retirement">Retirement</option>
          <option value="other">Other</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="goalAmount">Goal amount</Label>
        <DollarAmt>
          <Symbol>$</Symbol>
          <Input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(ev) => setGoalAmount(ev.currentTarget.value)}
            required
          />
        </DollarAmt>
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="starting">Starting balance</Label>
        <DollarAmt>
          <Symbol>$</Symbol>
          <Input
            type="number"
            id="starting"
            value={starting}
            onChange={(ev) => setStarting(ev.currentTarget.value)}
          />
        </DollarAmt>
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="monthly">Monthly contribution</Label>
        <DollarAmt>
          <Symbol>$</Symbol>
          <Input
            type="number"
            id="monthly"
            value={monthly}
            onChange={(ev) => setMonthly(ev.currentTarget.value)}
            required
          />
        </DollarAmt>
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="dueDate">Due date</Label>
        <Input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(ev) => setDueDate(ev.currentTarget.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label>Estimated date</Label>
        <Status>{estimatedDate ? estimatedDate : "Pending"}</Status>
      </InputWrapper>
      <InputWrapper>
        <Label>Status</Label>
        <Status>{goalStatus ? goalStatus : "Pending"}</Status>
      </InputWrapper>
      <Actions>
        {goalStatus ? (
          <SavedStatus>
            <FiCheckCircle color={COLORS.GREEN} />
            <Saved>Saved</Saved>
          </SavedStatus>
        ) : (
          <ActionBtn type="submit" disabled={goalsStatus === "loading"}>
            {goalsStatus !== "loading" ? "Calculate" : <LoaderIcon />}
          </ActionBtn>
        )}
        <ActionBtn
          onClick={(ev) => {
            handleDelete(ev, index, type);
          }}
          disabled={goalsStatus === "loading"}
        >
          {goalsStatus !== "loading" ? "Delete" : <LoaderIcon />}
        </ActionBtn>
      </Actions>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 5px;
  box-shadow: 0 0 5px ${COLORS.BORDER};
  &:hover {
    box-shadow: 0 0 10px ${COLORS.BORDER};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 20%;
`;

const Status = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  font-weight: 600;
  color: ${COLORS.THEME};
  border: 1px solid ${COLORS.BORDER};
`;

const SavedStatus = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  font-weight: 600;
`;

const Saved = styled.p`
  padding-left: 5px;
`;

const DollarAmt = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  text-align: center;
  padding-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
`;

const Symbol = styled.span`
  padding-right: 5px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
  width: 40%;
`;

const ActionBtn = styled(Button)`
  margin: 0 0 0 10px;
  width: 100px;

  &:disabled {
    border: none;
    background-color: ${COLORS.BORDER};
    cursor: not-allowed;
    color: #fff;
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

export default GoalItem;
