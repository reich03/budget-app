import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid";


export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'state-modal' } |
    { type: 'add-expenses', payload: { expense: DraftExpense } } |
    { type: 'delete-budget', payload: { id: string } } |
    { type: 'get-expense-id', payload: { id: string } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'add-filter-category', payload: { id: Category['id'] } } |
    { type: 'reset-expenses' }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory:Category['id']
}

const initialBudget = (): number => {

    const localstorageBudget = localStorage.getItem('budget')
    return localstorageBudget ? +localstorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory:''
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
            modal: !state.modal,
            editingId: ''
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

    if (action.type === 'update-expense') {
        return {
            ...state,
            editingId: '',
            modal: false,
            expenses: state.expenses.map((expense) => expense.id === action.payload.expense.id ? action.payload.expense : expense)
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory:action.payload.id
        }
    }
    return state

}