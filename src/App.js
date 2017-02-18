import React from 'react';
import { tokenizer } from 'acorn-jsx';
import trimRight from 'trim-right';
import './App.css';

import Background from './components/Background';
import CodeDisplay from './components/CodeDisplay';
import Input from './components/Input';
import Title from './components/Title';
import Footer from './components/Footer';
import Stats from './components/Stats';

import text from './assets/text';

class App extends React.Component {
  constructor(props) {
    super(props);
    const text = this.randomText();

    this.state = {
      tokenLines: this.createTokenLines(text.content),
      index: {
        line: 0,
        token: 0,
      },
      active: true,
      charactersFinished: 0,
      valid: true,
      errorCount: 0,
      text,
    };
  }

  randomText() {
    const length = text.length
        , index = Math.floor(Math.random() * (length));

    return text[index];
  }

  getValue = (value, type, list, index) => {
    switch (type.label) {
      case 'jsxTagStart':
        return '<';

      case 'jsxTagEnd':
        return '>';

      case 'string':
        if (list[index - 2] && list[index - 2].type && list[index - 2].type.label === 'jsxName') {
          return `"${value}"`;
        }
        return `'${value}'`;

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

        list.push({ type: type, value: this.getValue(value, type, list, list.length) });
        index = end;
      }

      return list;
    });
  }

  moveIndex = () => {
    const { tokenLines, index, charactersFinished } = this.state;
    let { line, token } = index;
    const tokenLength = tokenLines[line][token].value.length;

    if (tokenLines[line][token + 1] === undefined) {
      line++;
      token = 0;
      if (tokenLines[line] === undefined) {
        return this.setState({
          index: { token: 0, line: 0 },
          active: false,
          charactersFinished: charactersFinished + tokenLength,
        });
      }
      while (tokenLines[line].length === 0) {
        line++;
      }
      if (!/\S/.test(tokenLines[line][token].value)) {
        token++;
      }
    } else {
      token++;
    }

    this.setState({
      index: { token, line },
      charactersFinished: charactersFinished + tokenLength,
    });
  }

  errorDetected = () => {
    this.setState({ errorCount: this.state.errorCount + 1 });
  }

  changeValidity = (valid) => {
    this.setState({ valid });
  }

  render() {
    const { tokenLines, index, active, charactersFinished, errorCount, valid } = this.state
        , curToken = tokenLines[index.line][index.token].value;

    return (
      <Background>
        <Title />
        { active
          ? [ <Stats
                key={0}
                charactersFinished={charactersFinished}
                errorCount={errorCount}
              />
            , <CodeDisplay
                key={1}
                tokenLines={tokenLines}
                index={index}
                valid={valid}
              />
            , <Input
                key={2}
                curToken={curToken.toString()}
                handleTokenChange={this.moveIndex}
                errorDetected={this.errorDetected}
                valid={valid}
                changeValidity={this.changeValidity}
              /> ]
          : <div>test</div>
        }
        <Footer />
      </Background>
    );
  }
}

export default App;
