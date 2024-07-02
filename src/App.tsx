import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { UseBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpensesModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";
function App() {
  const { state } = UseBudget();
  const isValid = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);
  return (
    <>
      <header className="py-8 bg-blue-600 max-h-72">
        <h1 className="text-4xl font-black text-center text-white uppercase ">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl p-10 mx-auto mt-10 bg-white border rounded-lg shadow-lg border-gray-200/50 ">
        {isValid ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValid && (
        <main className="max-w-3xl py-10 mx-auto">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
