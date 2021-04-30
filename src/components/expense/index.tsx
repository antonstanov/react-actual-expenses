import React, {ReactNode} from "react";
import './index.css';
import {Input, Popover} from "antd";
import {IExpenseData} from "../../interfaces/IDataSource.interface";

export class ExpenseComponent extends React.Component<{ data: IExpenseData[] }> {
  expenseData: ReactNode;
  expenseIndex: number;

  componentDidMount() {
    this.expenseData =
      <div>
        {this.setExpenseInputs()}
        <div className="expense-input__container" key={this.expenseIndex + 1}>
          <Input className="expense-input__item"/>
          <Input className="expense-input__item"/>
        </div>
      </div>
  }

  render() {
    return (
      <Popover placement="bottomLeft" content={this.expenseData} trigger="click">
        {this.setExpenseData(this.props.data)}
      </Popover>
    );
  }

  /**
   * Рендер содержимого в поповере
   * @param data
   * @private
   */
  private setExpenseData(data: IExpenseData[]) {
    return data.map((item, index) =>
      <span key={index} className="expense_td">{item.text} <b>{item.sum}</b></span>
    )
  }

  /**
   * Рендер инпутов с расходами
   * @private
   */
  private setExpenseInputs(): ReactNode {
    return this.props.data.map((item, index) => {
      this.expenseIndex = index;

      const node =
        <div key={this.expenseIndex} className="expense-input__container">
          <Input className="expense-input__item" value={item.text}/>
          <Input className="expense-input__item" value={item.sum}/>
        </div>

      return <div key={index}>{node}</div>
    });
  }
}
