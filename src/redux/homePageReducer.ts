import {CHANGE_DAY_EXPENSE, CHANGE_EXPENSE, CREATE_DAY_EXPENSE, CREATE_EXPENSE} from "./types";
import {IExpenseInput, IHomeDataSource} from "../interfaces/IDataSource.interface";
import {uuidv4} from "../uuidv4.helper";
import dayjs from "dayjs";
import {changeExpenseAction, createExpenseAction} from "./actions";

/**
 *
 */
const initState = () => {
  const allDayNumber = dayjs().daysInMonth();
  const monthNumber = dayjs().month() + 1;
  const yearNumber = dayjs().year();
  const state = []

  for(let i = 1; i <= allDayNumber; i++) {
    const parentKey = uuidv4();

    const day = i < 10 ? '0'+ i : i;
    const month = monthNumber < 10 ? '0' + monthNumber : monthNumber;

    state.push({
      key: parentKey,
      date: `${day}.${month}.${yearNumber}`,
      expenses: {
        parentKey: parentKey,
        data: []
      },
      sum: 0,
    })

    state[0] = { //todo
      key: '4812d734-a019-475a-9c82-c07414c3c6d2',
      date: '01.01.2021',
      expenses: {
        parentKey: '4812d734-a019-475a-9c82-c07414c3c6d2',
        data: [
          {key: '826d1203-9b76-4809-a196-c276ecf50d86', text: 'eat', sum: 3000},
          {key: '16a5520d-13af-41aa-b360-663e92472ebf', text: 'auto', sum: 30000}
        ]
      },
      sum: 33000,
    };

    state[1] = { //todo
      key: 'ec4a4daa-67e9-47d9-84db-916fd1a42c90',
      date: '02.02.2022',
      expenses: {
        parentKey: 'ec4a4daa-67e9-47d9-84db-916fd1a42c90',
        data: [
          {key: 'f6bfeb52-36e8-4a07-a7d2-dc12ebdf63eb', text: 'eat', sum: 44000},
          {key: '6e2b2581-b282-4712-93e6-9283d7603a2f', text: 'auto', sum: 550000}
        ]
      },
      sum: 594000,
    }
  }

  return state
}

/**
 *
 * @param state
 * @param action
 */
const getIndexes = (state:IHomeDataSource[], action: any) => {
  const {key} = action.payload.expenseInputData;
  const parentIndex = state.findIndex(item => item.expenses.parentKey === action.payload.parentKey)
  const childIndex = state[parentIndex].expenses.data.findIndex((item: IExpenseInput) => item.key === key)

  return {parentIndex, childIndex}
}

/**
 *
 * @param state
 * @param action
 */
const createExpenseReducer = (state = initState(), action: any): IHomeDataSource[] => {
  const { parentIndex } = getIndexes(state, action);
  const {key, value} = action.payload.expenseInputData;
  const expense = {key: key || uuidv4(), text: value || '', sum: 0}
  const dataSource = [...state];

  dataSource[parentIndex].expenses.data.push(expense)

  return dataSource
}

/**
 *
 * @param state
 * @param action
 */
const createDayExpenseReducer =
  (state = initState(), action: any): IHomeDataSource[] => state.concat([action.payload])

/**
 *
 * @param state
 * @param action
 */
const changeDayExpenseReducer = (state = initState(), action: any): IHomeDataSource[] => {
  const { childIndex } = getIndexes(state, action);

  if (childIndex < 0) return homePageReducer(state, createExpenseAction(action.payload))

  return homePageReducer(state, changeExpenseAction(action.payload))
}

/**
 *
 * @param state
 * @param action
 */
const changeExpenseReducer = (state = initState(), action: any): IHomeDataSource[] => {
  const { inputName, value } = action.payload.expenseInputData;
  const { parentIndex, childIndex } = getIndexes(state, action);
  const dataSource = [...state];

  const expense: {[index: string]: string | number} = dataSource[parentIndex].expenses.data[childIndex];
  expense[inputName] = value

  const expensesSum = dataSource[parentIndex].expenses.data.reduce((expensesSum, currExpense) => expensesSum + currExpense.sum, 0)
  dataSource[parentIndex].sum = expensesSum;

  return dataSource;
}

/**
 *
 * @param state
 * @param action
 */
export const homePageReducer = (state = initState(), action: any): IHomeDataSource[] => {
  switch (action.type) {
    case CREATE_EXPENSE:
      return createExpenseReducer(state, action);

    case CREATE_DAY_EXPENSE:
      return createDayExpenseReducer(state, action)

    case CHANGE_DAY_EXPENSE:
      return changeDayExpenseReducer(state, action)

    case CHANGE_EXPENSE:
      return changeExpenseReducer(state, action)

    default:
      return initState();
  }
}
