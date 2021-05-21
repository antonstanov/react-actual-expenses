import {CHANGE_DAY_EXPENSE, CREATE_DAY_EXPENSE, CREATE_EXPENSE} from "./types";
import {IExpenseInput, IExpenseInputData, IHomeDataSource} from "../interfaces/IDataSource.interface";
import {uuidv4} from "../uuidv4.helper";

const initialState = [
    {
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
    },
    {
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
]

const createExpenseReducer = (state = initialState, action: any): IHomeDataSource[] => {
  const dataSource = [...state];
  const {key, value} = action.payload.expenseInputData;
  const parentIndex = dataSource.findIndex(item => item.expenses.parentKey === action.payload.parentKey)
  const expense = {key: key || uuidv4(), text: value || '', sum: 0}

  dataSource[parentIndex].expenses.data.push(expense)

  return dataSource
}

const createDayExpenseReducer = (state = initialState, action: any): IHomeDataSource[] => {
  return state.concat([action.payload]);
}

const changeDayExpenseReducer = (state = initialState, action: any): IHomeDataSource[] => {
  const dataSource = [...state];
  const {key, inputName, value} = action.payload.expenseInputData;
  const parentIndex = dataSource.findIndex(item => item.expenses.parentKey === action.payload.parentKey)
  const childIndex = dataSource[parentIndex].expenses.data.findIndex((item: IExpenseInput) => item.key === key)

  if (childIndex < 0) {
    return createExpenseReducer(state, action)
  }

  const expense: {[index: string]: string | number} = dataSource[parentIndex].expenses.data[childIndex];

  expense[inputName] = value

  return dataSource;
}

export const homePageReducer = (state = initialState, action: any): IHomeDataSource[] => {
  switch (action.type) {
    case CREATE_EXPENSE:
      return createExpenseReducer(state, action);

    case CREATE_DAY_EXPENSE:
      return createDayExpenseReducer(state, action)

    case CHANGE_DAY_EXPENSE:
      return changeDayExpenseReducer(state, action)

    default:
      return state;
  }
}
