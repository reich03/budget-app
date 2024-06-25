import { useMemo, useState, Dispatch } from "react";
import { BudgetActions } from "../reducers/budget-reducer";
export type budgetProps = {
  dispatch: Dispatch<BudgetActions>;
};
const BudgetForm = ({ dispatch }: budgetProps) => {
  const [budget, setBudget] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setBudget(+e.target.value);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);
  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          name="budget"
          className="w-full bg-white border border-gray-200 p-2 rounded-lg"
          placeholder="Define Tu presupuesto"
          value={budget}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-lg w-full p-2 text-white font-black uppercase disabled:bg-blue-600/60"
        disabled={isValid}
        onClick={() =>
          dispatch({ type: "add-budget", payload: { budget: budget } })
        }
      />
    </form>
  );
};

export default BudgetForm;
