import { useReducer, createContext, Dispatch, ReactNode } from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

//tipos de nuestro context osea de los datos que recibe o va a manejar globalmente
type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

// Tipos de nuestro Provider osea del children que le pasa la info
type BudgetProviderProps = {
  children: ReactNode;
};
//Creamos nuestro context y definimos los tipos que esperamos que reciba
export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

// Crear el Provider, Lugar de donde vienen los datos
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    //Union entre el context que creamos y los valores states funciones o datos de nuestro provider
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
