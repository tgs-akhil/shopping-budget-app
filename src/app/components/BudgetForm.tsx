"use client";
import { db } from "@/db";
import React, { useState, useEffect } from "react";
import styles from "./BudgetForm.module.css";
import BudgetInput from "./BudgetInput";
import SaveData from "./SaveData";

const BudgetForm = () => {
  const [rows, setRows] = useState([{ id: Date.now(), date: "", budget: 0 }]);
  const [total, setTotal] = useState(0);

  function getdbInput(dbvalue, id) {
    setRows(rows.filter((row) => row.id == id));
    console.log(dbvalue);
  }

  function addRow() {
    setRows([...rows, { id: Date.now(), date: "", budget: 0 }]);
  }

  function handleRemoveBtn(id: number) {
    setRows(rows.filter((row) => row.id !== id));
    console.log("clicked", id);
  }

  function handleBudgetChange(id: number, newBudget: any) {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, budget: newBudget } : row))
    );
  }

  function handleDateChange(id: number, newDate: string) {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, date: newDate } : row))
    );
  }

  useEffect(() => {
    const newTotal = rows.reduce((acc, row) => acc + +row.budget || 0, 0);
    setTotal(newTotal);
  }, [rows]);

  return (
    <div>
      <div className={styles.pageContainer}>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Shopping Date</th>
              <th className={styles.headerCell}>Shopping Budget</th>
              <th className={styles.headerCell}>
                <button
                  type="button"
                  onClick={addRow}
                  className={styles.addButton}
                >
                  Add Row
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <BudgetInput
                key={row.id}
                id={row.id}
                date={row.date}
                budget={row.budget}
                handleRemoveBtn={handleRemoveBtn}
                handleBudgetChange={handleBudgetChange}
                handleDateChange={handleDateChange}
                getdbInput={getdbInput}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.totalRow}>
              <td className={styles.totalCell} colSpan={2}>
                Total:
              </td>
              <td className={styles.totalCell}>₹{total}</td>
            </tr>
            <tr>
              <td className={styles.submitCell} colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BudgetForm;
