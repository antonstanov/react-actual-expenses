export interface IHomeDataSource {
  key: string,
  date: string,
  expenses: string,
  sum: number
}
export interface IHomeColumns {
  title: string,
  dataIndex?: string,
  key: string
  render?: any
}
