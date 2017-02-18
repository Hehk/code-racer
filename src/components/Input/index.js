import React from 'react';
import './style.css';

class Input extends React.Component {
  state = { value: '' }

  handleChange = (e) => {
    const newValue = e.target.value
        , { curToken, errorDetected, handleTokenChange, changeValidity } = this.props;

    if (curToken === newValue) {
      handleTokenChange();
      this.setState({ value: '' });
    } else {
      if (this.state.value.length < newValue.length && !curToken.startsWith(newValue)) {
        errorDetected();
      }

      changeValidity(curToken.startsWith(newValue))
      this.setState({ value: newValue });
    }
  }

  render() {
    const { valid } = this.props
        , { value } = this.state;

    return (
      <input
        type="text"
        value={value}
        autoFocus={true}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        className={`input${valid ? '' : ' input__failed'}`}
      />
    );
  }
}

export default Input;
