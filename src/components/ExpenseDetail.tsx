import { useMemo } from "react";
import { formatCurrencyDate } from "../helpers";
import { Category, Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";

type ExpenseDetailProps = {
  expenseData: Expense;
};
export default function ExpenseDetail({ expenseData }: ExpenseDetailProps) {
  const categoryInfo: Category = useMemo(
    () => categories.filter((cate) => cate.id === expenseData.category)[0],
    [expenseData]
  );

  return (
    <div className="flex items-center w-full gap-5 p-10 bg-white border-b border-gray-200 shadow-lg">
      <div className="">
        <img
          src={`../../public/icono_${categoryInfo.icon}.svg`}
          alt="icono_gasto"
          className="w-20 "
        />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-bold uppercase text-slate-500">
          {categoryInfo.name}
        </p>
        <p>{expenseData.expenseName}</p>
        <p className="text-sm text-slate-600">
          {/*Le aseguramos a la funcion que el valor que se le envia es el que espera */}
          {formatCurrencyDate(expenseData.expenseDate!.toString())}
        </p>

      </div>
        <AmountDisplay amount={expenseData.expenseAmount} />
    </div>
  );
}
