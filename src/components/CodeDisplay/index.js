import React from 'react';
import './style.css';

import CodeLine from '../CodeLine';

const CodeDisplay = ({ code }) => (
  <div className="code-display__background">
    {code.split('\n').map((line, index) =>
      <CodeLine key={index} lineNumber={index + 1} line={line} />
    )}
  </div>
);

export default CodeDisplay;
