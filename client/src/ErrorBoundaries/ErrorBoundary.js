import React, { Component } from "react";
import './styles.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorList: [],
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState((prevState) => ({
      hasError: true,
      error,
      errorInfo,
      errorList: [...prevState.errorList, error],
    }));
    console.log(error, this.state.errorList);
  }

  render() {
    if (this.state.hasError && this.state.errorList.length > 0) {
      const errorItems = this.state.errorList.map((error, index) => (
        <div key={index} className="error-item">
          <h2>Error:</h2>
          <p>{error.toString()}</p>
        </div>
      ));

      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          {errorItems}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
