import {CHANGE_DAY_EXPENSE, CREATE_DAY_EXPENSE, CREATE_EXPENSE} from "./types";

export function createDayExpense(dayExpense: any) {
  return {
    type: CREATE_DAY_EXPENSE,
    payload: dayExpense
  }
}

export function createExpense(expense: any) {
  return {
    type: CREATE_EXPENSE,
    payload: expense
  }
}

export function changeDayExpenseReducer(expense: any) {
  return {
    type: CHANGE_DAY_EXPENSE,
    payload: expense
  }
}
