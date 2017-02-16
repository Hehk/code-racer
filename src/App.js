import React from 'react';
import './App.css';

import Background from './components/Background';
import CodeDisplay from './components/CodeDisplay';
import Input from './components/Input';
import Title from './components/Title';
import Footer from './components/Footer';

import text from './assets/text';

const App = () => (
  <Background>
    <Title />
    <CodeDisplay code={text[0]} />
    <Input code={text[0]}/>
    <Footer />
  </Background>
);

export default App;
