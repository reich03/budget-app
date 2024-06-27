import BudgetForm from "./components/BudgetForm";

function App() {
  return (
    <>
      <header className="py-8 bg-blue-600 max-h-72">
        <h1 className="text-4xl font-black text-center text-white uppercase ">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl p-10 mx-auto mt-10 bg-white border rounded-lg shadow-lg border-gray-200/50 ">
        <BudgetForm />
      </div>
    </>
  );
}

export default App;
