import Table from "antd/lib/table/Table";
import React from "react";
import {IExpenseData, IHomeColumns, IHomeDataSource} from "../interfaces/IDataSource.interface";
import {ExpenseComponent} from "../components/expense";
import './home.css';

const dataSource: IHomeDataSource[] = [
  {
    key: '1',
    date: '01.01.2021',
    expenses: [
      {text: 'eat', sum: 3000},
      {text: 'auto', sum: 30000}
    ],
    sum: 33000,
  },
  {
    key: '2',
    date: '02.02.2022',
    expenses: [
      {text: 'eat', sum: 44000},
      {text: 'auto', sum: 550000}
    ],
    sum: 594000,
  },
];

const columns: IHomeColumns[] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Expenses',
    key: 'expenses',
    dataIndex: 'expenses',
    render: (data: IExpenseData[]) => <ExpenseComponent data={data}/>
  },
  {
    title: 'Sum',
    key: 'sum',
    dataIndex: 'sum'
  }
];

export class HomePage extends React.Component {
  render() {
    return <Table className="table--home" dataSource={dataSource} columns={columns}/>;
  }
}
