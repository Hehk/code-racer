import React from 'react';
import { tokenizer } from 'acorn-jsx';
import trimRight from 'trim-right';
import './App.css';

import Background from './components/Background';
import CodeDisplay from './components/CodeDisplay';
import Input from './components/Input';
import Title from './components/Title';
import Footer from './components/Footer';

import text from './assets/text';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenLines: this.createTokenLines(text[1]),
      index: {
        line: 0,
        token: 0,
      },
      active: true,
    };
  }

  // used to track for jsx requiring ""
  betweenAngleQuotes = false
  getValue = (value, type) => {
    console.log(this.betweenAngleQuotes)
    switch (type.label) {
      case 'jsxTagStart':
        this.betweenAngleQuotes = true;
        return '<';

      case 'jsxTagEnd':
        this.betweenAngleQuotes = false;
        return '>';

      case 'string':
        if (this.betweenAngleQuotes) {
          return `\"${value}\"`;
        } else {
          return `\'${value}\'`;
        }

      default:
    }

    if (value === undefined) {
      return type.label;
    } else {
      return value;
    }
  }

  createTokenLines = (text) => {
    return text.split('\n').map((line) => {
      let tokens = tokenizer(trimRight(line), {plugins: {jsx: true}})
        , list = []
        , index = 0;

      while (index < line.length) {
        const { start, end, value, type } = tokens.getToken();

        if (start > index) {
          list.push({ value: line.slice(index, start) });
        }

        list.push({ type: type, value: this.getValue(value, type) });
        index = end;
      }

      return list;
    });
  }

  moveIndex = () => {
    const { tokenLines, index } = this.state;
    let { line, token } = index;

    if (tokenLines[line][token + 1] === undefined) {
      line++;
      token = 0;
      if (tokenLines[line] === undefined) {
        return this.setState({
          index: { token: 0, line: 0 },
          active: false,
        });
      }
      while (tokenLines[line].length === 0) { line++; }
    } else {
      token++;
    }

    this.setState({
      index: { token, line }
    });
  }

  render() {
    const { tokenLines, index, active } = this.state
        , curToken = tokenLines[index.line][index.token].value;

    return (
      <Background>
        <Title />
        { active
          ? [ <CodeDisplay key={0} tokenLines={tokenLines} index={index} />
            , <Input
                key={1}
                curToken={curToken.toString()}
                handleTokenChange={this.moveIndex}
              /> ]
          : <div>test</div>
        }
        <Footer />
      </Background>
    );
  }
}

export default App;
