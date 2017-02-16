import React from 'react';
import './style.css';

class Input extends React.Component {
  state = { value: '', curToken: 'const' }

  handleChange = (e) => {
    const newValue = e.target.value
        , { curToken } = this.state;

    if (curToken.startsWith(newValue)) {
      this.setState({ value: newValue })
    }
  }

  render() {
    return (
      <input
        type="text"
        className="input"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input;
