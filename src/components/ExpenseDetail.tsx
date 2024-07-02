import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { formatCurrencyDate } from "../helpers";
import { Category, Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import "react-swipeable-list/dist/styles.css";
import { UseBudget } from "../hooks/useBudget";
type ExpenseDetailProps = {
  expenseData: Expense;
};
export default function ExpenseDetail({ expenseData }: ExpenseDetailProps) {
  const categoryInfo: Category = useMemo(
    () => categories.filter((cate) => cate.id === expenseData.category)[0],
    [expenseData]
  );
  const {dispatch } = UseBudget();

  //izquierda
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-id", payload: { id: expenseData.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  //Derecha
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({
            type: "delete-budget",
            payload: { id: expenseData.id },
          })
        }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  //Para el uso del swipe debemos rodear nuestro elemento con el swipe
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex items-center w-full gap-5 p-10 bg-white border-b border-gray-200 shadow-lg">
          <div className="">
            <img
              src={`icono_${categoryInfo.icon}.svg`}
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
      </SwipeableListItem>
    </SwipeableList>
  );
}
