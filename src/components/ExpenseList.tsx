import { useMemo } from "react";
import { UseBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = UseBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state]);
  console.log(isEmpty);

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter((item) => item.category === state.currentCategory)
    : state.expenses;
  return (
    <>
      <div className="mt-10 bg-white rounded-lg shadow-lg ">
        <h2 className="p-10 text-3xl font-bold text-center text-gray-600 md:text-left">
          Lista de Gastos
        </h2>
        {isEmpty ? (
          <p className="text-2xl text-center text-gray-600">
            No hay Gastos Agregados
          </p>
        ) : (
          filteredExpenses.map((gasto) => (
            <>
              <ExpenseDetail key={gasto.id} expenseData={gasto} />
            </>
          ))
        )}
      </div>
    </>
  );
}
