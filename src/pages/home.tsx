import Table from "antd/lib/table/Table";
import React from "react";
import {IExpense, IExpenseInputData, IHomeDataSource, IState} from "../interfaces/IDataSource.interface";

import './home.css';
import {connect} from "react-redux";
import {
  changeDayExpenseAction,
  changeExpenseAction,
  createDayExpenseAction,
  createExpenseAction
} from "../redux/actions";
import {ExpenseComponent} from "../components/expense";

interface HomePageProps {
  /**
   * redux prop
   */
  homePageData: IHomeDataSource[];

  /**
   * redux dispatch
   */
  createDayExpense: any;
  createExpense: any;
  changeDayExpense: any;
  changeDayExpenseSum: any;
}

class HomePage extends React.Component<HomePageProps> {
  columns: any[];

  constructor(props: any) {
    super(props);

    this.columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        className: 'coll coll--date'
      },
      {
        title: 'Expenses',
        key: 'expenses',
        dataIndex: 'expenses',
        className: 'coll coll--expenses',
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
        dataIndex: 'sum',
        className: 'coll coll--sum'
      }
    ];
  }

  /**
   *
   * @param parentKey
   * @param expenseInputData
   * @private
   */
  private expenseComponentChange(parentKey: string, expenseInputData: IExpenseInputData): void {
    this.props.changeDayExpense({
      parentKey,
      expenseInputData
    })
  }

  private createExpense(parentKey: string, expenseInputData: IExpenseInputData): void {
    this.props.createExpense({
      parentKey,
      expenseInputData
    })
  }

  render() {
    return <Table
      className="table--home"
      dataSource={this.props.homePageData}
      size={'small'}
      pagination={false}
      rowClassName={'row row--expense'}
      columns={this.columns}
    />;
  }
}

const mapStateToProps = (state: IState, ownProps: any) => {
  return {
    homePageData: state.homePageData
  }
}

const mapDispatchToProps = {
  createDayExpense: createDayExpenseAction,
  changeDayExpense: changeDayExpenseAction,
  createExpense: createExpenseAction,
  changeExpense: changeExpenseAction,
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps)
const ConnectedComponent = connectToStore(HomePage)

export default ConnectedComponent
