import { useMemo } from "react";
import { UseBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state, dispatch } = UseBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state]);
  console.log(isEmpty);
  return (
    <>
      <div className="mt-10 bg-white ">
        {isEmpty ? (
          <p className="text-2xl text-center text-gray-600">
            No hay Gastos Agregados
          </p>
        ) : (
          state.expenses.map((gasto) => (
            <>
              <ExpenseDetail key={gasto.id} expenseData={gasto} />
            </>
          ))
        )}
      </div>
    </>
  );
}
