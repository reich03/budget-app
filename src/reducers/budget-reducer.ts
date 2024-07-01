import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid";


export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'state-modal' } |
    { type: 'add-expenses', payload: { expense: DraftExpense } } |
    { type: 'delete-budget', payload: { id: string } } |
    { type: 'get-expense-id', payload: { id: string } } |
    { type: 'reset-expenses' }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

const CreateExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}
export const budgetReducer = (

    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'state-modal') {
        return {
            ...state,
            modal: !state.modal
        }
    }

    if (action.type === 'add-expenses') {
        const expense = CreateExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'delete-budget') {
        return {
            ...state,
            expenses: state.expenses.filter((item) => item.id !== action.payload.id),
            modal: false
        }
    }

    if (action.type === 'reset-expenses') {
        return {
            ...state,
            expenses: [],
            modal: false,
            budget: 0
        }
    }

    if (action.type === 'get-expense-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    return state

}