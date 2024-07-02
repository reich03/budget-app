import { useMemo, useState } from "react";
import { UseBudget } from "../hooks/useBudget";
const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const {dispatch } = UseBudget();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBudget(+e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
    setBudget(0)
  };
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl font-bold text-center text-blue-600"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          name="budget"
          className="w-full p-2 bg-white border border-gray-200 rounded-lg"
          placeholder="Define Tu presupuesto"
          value={budget}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        className="w-full p-2 font-black text-white uppercase bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-blue-600/60"
        disabled={isValid}
      />
    </form>
  );
};

export default BudgetForm;
