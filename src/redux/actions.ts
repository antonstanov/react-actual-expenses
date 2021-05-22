import {
  CREATE_DAY_EXPENSE,
  CHANGE_DAY_EXPENSE,
  CREATE_EXPENSE,
  CHANGE_EXPENSE,
} from "./types";

export function createDayExpenseAction(dayExpense: any) {
  return {
    type: CREATE_DAY_EXPENSE,
    payload: dayExpense
  }
}

export function changeDayExpenseAction(expense: any) {
  return {
    type: CHANGE_DAY_EXPENSE,
    payload: expense
  }
}

export function createExpenseAction(expense: any) {
  return {
    type: CREATE_EXPENSE,
    payload: expense
  }
}

export function changeExpenseAction(expense: any) {
  return {
    type: CHANGE_EXPENSE,
    payload: expense
  }
}
