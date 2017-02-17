import React from 'react';
import './style.css';

class Input extends React.Component {
  state = { value: '' }
  
  handleChange = (e) => {
    const newValue = e.target.value
        , curToken = this.props.curToken;

    if (curToken === newValue) {
      this.props.handleTokenChange();
      this.setState({ value: '' });
    } else {
      this.setState({ value: newValue });
    }
  }

  render() {
    const { curToken } = this.props
        , { value } = this.state;

    return (
      <input
        type="text"
        value={value}
        autoFocus={true}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        className={`input${curToken.startsWith(value) ? '' : ' input__failed'}`}
      />
    );
  }
}

export default Input;
