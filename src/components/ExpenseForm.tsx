import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, useState } from "react";
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
  const { dispatch } = UseBudget();

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      expenseDate: value,
    });
  };

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
    dispatch({
      type: "add-expenses",
      payload: { expense },
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
        Nuevo Gasto
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
        value="Registrar Gasto"
        className="w-full p-2 font-bold text-white bg-blue-600 rounded-lg cursor-pointer"
      />
    </form>
  );
}
