import { Component } from "react";

import withRouter from "../hoc/withRouter";

import { IWithRouterProps } from "../types/IWithRouterProps";

class Product extends Component<IWithRouterProps> {
  render() {
    console.log(this.props.params)
    return (
      <div>
        {this.props.params?.id}
      </div>
    )
  }
}

export default withRouter(Product);

