import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { UseBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    expenseAmount: 0,
    category: "",
    expenseDate: new Date(),
  });
  const [error, setError] = useState("");
  const { state, dispatch, remainingBudget } = UseBudget();
  const [previoAmount, setprevioAmount] = useState(0);
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      expenseDate: value,
    });
  };

  useEffect(() => {
    if (state.editingId) {
      const infoExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(infoExpense);
      setprevioAmount(infoExpense.expenseAmount);
    }
  }, [state.editingId]);
  const isEditing = useMemo(() => state.editingId === "", [state.editingId]);
  // console.log(isEditing)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["expenseQuantity"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    //Validamos
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son Obligatorios");
      return;
    }
    

    if (expense.expenseAmount - previoAmount > remainingBudget) {
      setError("No tienes fondos suficientes");

      // console.log(
      //   previoAmount - expense.expenseAmount > remainingBudget,
      //   expense.expenseAmount,
      //   previoAmount
      // );
      return;
    }
    isEditing
      ? dispatch({
          type: "add-expenses",
          payload: { expense },
        })
      : dispatch({
          type: "update-expense",
          payload: { expense: { id: state.editingId, ...expense } },
        });
    setExpense({
      expenseName: "",
      expenseAmount: 0,
      category: "",
      expenseDate: new Date(),
    });
  };

  return (
    <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
      <legend className="py-2 text-2xl font-black text-center uppercase border-b-4 border-blue-500">
        {!isEditing ? "Actualizar Gasto" : "Nuevo Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="expnseName">
          Nombre Gasto:
        </label>
        <input
          id="expenseName"
          type="text"
          placeholder="Ingrese nombre Gasto ejem: Ropa, comida"
          className="p-2 border rounded-md bg-slate-100 border-slate-200"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="expenseAmount">
          Cantidad Gasto:
        </label>
        <input
          id="expenseAmount"
          type="number"
          placeholder="Ingrese Cantidad Gasto ejem: 100, 200"
          className="p-2 border rounded-md bg-slate-100 border-slate-200"
          name="expenseAmount"
          value={expense.expenseAmount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="category">
          Categoria Gasto:
        </label>
        <select
          id="category"
          name="category"
          className="p-2 border rounded-md bg-slate-100 border-slate-200"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione -- </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="dateAmount">
          Fecha Gasto:
        </label>
        <DatePicker
          className="p-2 border-0 bg-slate-100"
          value={expense.expenseDate}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        value={!isEditing ? "Actualizar Gasto" : "Registrar Gasto"}
        className="w-full p-2 font-bold text-white bg-blue-600 rounded-lg cursor-pointer"
      />
    </form>
  );
}
