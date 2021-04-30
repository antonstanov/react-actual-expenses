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

export interface IExpenseData {
  text: string,
  sum: number;
}
