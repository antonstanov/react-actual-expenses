export interface IHomeDataSource {
  key: string,
  date: string,
  expenses: any,
  sum: number
}

export interface IHomeColumns {
  title: string,
  dataIndex?: string,
  key: string
  render?: any
}


export interface IExpenseInput {
  key: string,
  text?: string,
  sum?: number
}

export interface IExpense extends IExpenseInput{
  parentKey: string,
  data: IExpenseInput[]
}

export interface IState {
  homePageData: IHomeDataSource[]
}

export interface IExpenseInputData {
  key: string,
  inputName: 'sum' | 'text'
  value?: string
}
