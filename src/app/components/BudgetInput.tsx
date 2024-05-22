"use client";
import React, { useState } from "react";
import styles from "./BudgetForm.module.css";
import SaveData from "./SaveData";
import DeleteData from "./DeleteData";

const BudgetInput: React.FC<{
  id: number;
  date: string;
  budget: number;
  handleRemoveBtn: (id: number) => void;
  handleBudgetChange: (id: number, newBudget: number) => void;
  handleDateChange: (id: number, newDate: string) => void;
  getdbInput: () => void;
}> = ({
  id,
  date,
  budget,
  handleRemoveBtn,
  handleBudgetChange,
  handleDateChange,
  getdbInput,
}) => {
  const [inputDate, setInputDate] = useState(date);
  const [inputBudget, setInputBudget] = useState(budget);

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value;
    setInputDate(newDate);
    handleDateChange(id, newDate);
  }

  function onBudgetChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newBudget = parseFloat(e.target.value);
    setInputBudget(newBudget);
    handleBudgetChange(id, newBudget);
  }

  async function handleSaveBtn(date: string, budget: number) {
    let data = await SaveData({ date, budget });
    getdbInput(data, id);
  }

  // async function handleDelete(id: number) {
  //   await DeleteData(id);
  // }

  return (
    <tr>
      <td className={styles.cell}>
        <input
          type="date"
          className={styles.input}
          value={inputDate}
          onChange={onDateChange}
        />
      </td>
      <td className={styles.cell}>
        <input
          type="number"
          className={styles.input}
          value={inputBudget}
          onChange={onBudgetChange}
        />
      </td>
      <td className={styles.cell}>
        <button
          onClick={() => {
            handleRemoveBtn(id);
            // handleDelete(id);
          }}
          className={styles.removeButton}
        >
          Remove
        </button>
        <button
          onClick={() => {
            handleSaveBtn(inputDate, inputBudget);
          }}
          className={styles.saveButton}
        >
          save
        </button>
      </td>
    </tr>
  );
};

export default BudgetInput;
