import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"
export const UseBudget = () => {
    const context = useContext(BudgetContext)
    if (!context) {
        //Si el context viene vacio es porque no se rodeo la aplicacion con el context completo
        throw new Error('use Budget must be used within a BudgetProvider')
    }
    return context

}