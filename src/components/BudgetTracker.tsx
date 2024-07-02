import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { UseBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'
export default function BudgetTracker() {
  const { state, dispatch, remainingBudget, totalExpenses } = UseBudget();
  const percentage = (totalExpenses / state.budget) * 100;
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage===100 ? "#DC2626":"#3b82f6",
            trailColor: "#F5F5F5",
            textSize:8,
            textColor:percentage===100 ? "#DC2626":"#3b82f6"
          })}
          text={`${percentage}% Gastado`}
        />
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

        <AmountDisplay label="Disponible" amount={remainingBudget} />

        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
