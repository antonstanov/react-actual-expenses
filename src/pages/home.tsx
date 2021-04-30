import Table from "antd/lib/table/Table";
import React from "react";
import {IHomeColumns, IHomeDataSource} from "../interfaces/IDataSource.interface";
import {ExpenseComponent} from "../components/expense";
import {message} from "antd";

const dataSource: IHomeDataSource[] = [
  {
    key: '1',
    date: '01.01.2021',
    expenses: 'еда 2000, авто(бензин) 5000',
    sum: 7000,
  },
  {
    key: '2',
    date: '02.02.2021',
    expenses: 'еда 3000, авто(мойка) 1000',
    sum: 4000,
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
    render: (text: string) => <ExpenseComponent text={text}/>,
  },
  {
    title: 'Sum',
    dataIndex: 'sum',
    key: 'sum',
  },
];

export class HomePage extends React.Component {
  render() {
    return <Table dataSource={dataSource} columns={columns}/>;
  }
}
