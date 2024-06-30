import { UseBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const { state, dispatch } = UseBudget();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <img src="../../public/grafico.jpg" alt="Grafica de Gastos" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <button
          type="button"
          className="w-full p-2 font-bold text-white uppercase bg-pink-600 rounded-lg hover:bg-pink-700"
          onClick={() => dispatch({ type: "reset-expenses" })}
        >
          Resetear App
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />

        <AmountDisplay label="Dispobible" amount={200} />

        <AmountDisplay label="Gastado" amount={100} />
      </div>
    </div>
  );
}
