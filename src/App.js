import React from 'react';
import { tokenizer } from 'acorn';
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
      tokenLines: this.createTokenLines(text[0]),
      index: {
        line: 0,
        token: 0,
      },
    };
  }

  createTokenLines = (text) => {
    return text.split('\n').map((line) => {
      let tokens = tokenizer(trimRight(line))
        , list = []
        , index = 0;

      while (index < line.length) {
        const { start, end, value, type } = tokens.getToken();

        if (start > index) {
          list.push(line.slice(index, start));
        }

        list.push({ type: type, value: value });
        index = end;
      }

      return list;
    });
  }

  render() {
    console.log(this.state);
    return (
      <Background>
        <Title />
        <CodeDisplay {...this.state} />
        <Input currentToken={'const'} handleTokenChange={() => console.log('test')} />
        <Footer />
      </Background>
    );
  }
}

export default App;
