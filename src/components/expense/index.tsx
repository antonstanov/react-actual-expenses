import React from "react";

export class ExpenseComponent extends React.Component<{ text: any }> {
  pointer: number;

  componentDidMount() {
    this.pointer = 3;
  }

  render() {
    return (
      <div>
        {this.props.text} and {this.pointer}
      </div>
    );
  }
}
