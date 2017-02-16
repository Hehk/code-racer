import React from 'react';
import './style.css';

import CodeLine from '../CodeLine';

const CodeDisplay = ({ tokenLines, index }) => (
  <div className="code-display__background">
    {tokenLines.map((line, key) =>
      <CodeLine
        key={key}
        lineNumber={key + 1}
        line={line}
        curIndex={index}
      />
    )}
  </div>
);

export default CodeDisplay;
