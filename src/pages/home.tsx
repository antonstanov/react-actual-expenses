import Table from "antd/lib/table/Table";
import React from "react";
import {IExpense, IExpenseInput, IExpenseInputData} from "../interfaces/IDataSource.interface";
import {ExpenseComponent} from "../components/expense";
import './home.css';
import {uuidv4} from "../uuidv4.helper";

export class HomePage extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      columns: [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Expenses',
          key: 'expenses',
          dataIndex: 'expenses',
          render: (data: IExpense) =>
            <ExpenseComponent
              expenseData={data}
              onChange={this.expenseComponentChange.bind(this)}
              onCreateExpense={this.createExpense.bind(this)}
            />
        },
        {
          title: 'Sum',
          key: 'sum',
          dataIndex: 'sum'
        }
      ],
      dataSource: [
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
        },
      ],
    };
  }

  /**
   *
   * @param parentKey
   * @param expenseInputData
   * @private
   */
  private expenseComponentChange(parentKey: string, expenseInputData: IExpenseInputData): void {
    // @ts-ignore
    const dataSource = [...this.state.dataSource];
    const {key, inputName, value} = expenseInputData;
    const parentIndex = dataSource.findIndex(item => item.expenses.parentKey === parentKey)
    const childIndex = dataSource[parentIndex].expenses.data.findIndex((item: any) => item.key === key)

    if (childIndex < 0) {
      this.createExpense(parentKey, expenseInputData)
      return;
    }

    dataSource[parentIndex].expenses.data[childIndex][inputName] = value;

    this.setState({dataSource});
  }

  /**
   *
   * @param parentKey
   * @param expenseInputData
   * @private
   */
  private createExpense(parentKey: string, expenseInputData: IExpenseInputData): void {
    // @ts-ignore
    const dataSource = [...this.state.dataSource];
    const {key, value} = expenseInputData;
    const parentIndex = dataSource.findIndex(item => item.expenses.parentKey === parentKey)
    const expense = {key: key || uuidv4(), text: value || '', sum: ''}

    dataSource[parentIndex].expenses.data.push(expense)

    this.setState({dataSource});
  }

  render() {
    // @ts-ignore
    return <Table className="table--home" dataSource={this.state.dataSource} columns={this.state.columns}/>;
  }
}
