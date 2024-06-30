import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { UseBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpensesModal";
import ExpenseList from "./components/ExpenseList";
function App() {
  const { state, dispatch } = UseBudget();
  const isValid = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);

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
          <h2 className="text-3xl font-bold text-center text-gray-600 md:text-left">
            Lista de Gastos
          </h2>
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
