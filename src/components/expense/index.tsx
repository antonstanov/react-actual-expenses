import React, {ReactNode, RefObject} from "react";
import './index.css';
import {Input, Popover} from "antd";
import {IExpense, IExpenseInputData} from "../../interfaces/IDataSource.interface";
import {uuidv4} from "../../uuidv4.helper";

export class ExpenseComponent extends React.Component<{ expenseData: IExpense, onChange: any, onCreateExpense: any }> {
  expenseData: ReactNode;
  expenseContainerRef: RefObject<any>;
  expenseInputs: ReactNode[] = [];
  needNewExpense: boolean = true;
  expenseInputValues: string[] = new Array(2);

  componentDidMount() {
    this.expenseInputs = this.setExpenseInputs();

    this.updatePopoverData()
  }

  render() {
    return (
      <Popover placement="bottomLeft" content={this.expenseData} trigger="click">
        {
          this.props.expenseData.data.map(
            (item, index) => <span key={index} className="expense_td">{item.text} <b>{item.sum}</b></span>
          )
        }
      </Popover>
    );
  }

  /**
   *
   * @private
   */
  private updatePopoverData() {
    this.expenseInputs.push(this.createExpense());

    this.expenseData = <div>{this.expenseInputs}</div>
  }

  /**
   *
   * @param options
   * @private
   */
  private expenseInput(options?: any ) {
    const {key, inputName, defaultValue, disabled} = options;
    return <Input
      className="expense-input__item"
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={
        this.onInputChange.bind(this, { key, inputName })
      }/>
  }

  /**
   *
   * @private
   */
  private createExpense() {
    this.expenseContainerRef = React.createRef();

    const key = uuidv4();

    return (
      <div key={key} ref={this.expenseContainerRef} className="expense-input__container">
        {this.expenseInput({key, inputName: 'text'})}
        {this.expenseInput({key, inputName: 'sum', disabled: false})}
      </div>
    );
  }

  /**
   *
   * @param expenseInputData
   * @param e
   * @private
   */
  private onInputChange(expenseInputData: IExpenseInputData, e: any): void {
    const { key, inputName } = expenseInputData;

    this.expenseContainerRef?.current?.childNodes?.forEach((input: HTMLInputElement, index: number) => {
      if (index > -1) this.expenseInputValues[index] = input?.value;
    })

    this.props.onChange(
      this.props.expenseData.parentKey,
      {key, inputName, value: inputName === 'sum' ? Number(e.target.value) : e.target.value}
    )

    this.needNewExpense = this.expenseInputValues?.some((input: string) => input === '')

    if (!this.needNewExpense) {
      this.updatePopoverData();
      this.onCreateExpense({key, inputName, value: e.target.value})
    }
  }

  /**
   *
   * @param expenseInputData
   * @private
   */
  private onCreateExpense(expenseInputData: IExpenseInputData) {
    if (expenseInputData.inputName === 'sum') return;

    this.props.onCreateExpense(this.props.expenseData.parentKey, expenseInputData)
    this.expenseInputValues = new Array(2);
  }

  /**
   * Рендер инпутов с расходами
   * @private
   */
  private setExpenseInputs(): ReactNode[] {
    return this.props.expenseData.data.map(item => {
      const {key, text, sum} = item;

      return (
        <div key={key} className="expense-input__container">
          {this.expenseInput({key, inputName: 'text', defaultValue: text})}
          {this.expenseInput({key, inputName: 'sum', defaultValue: sum})}
        </div>
      );
    })
  }
}
