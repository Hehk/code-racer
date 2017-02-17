import React from 'react';
import './style.css';

const getTokenClass = (type) => {
  if (type === undefined) {
    return 'code-token__1';
  }

  switch (type.label) {
    case 'var':
    case 'let':
    case 'const':
      return 'code-token__2';

    case 'num':
      return 'code-token__4';

    case ':':
    case '.':
      return 'code-token__6';

    case 'this':
      return 'code-token__7';

    default:
      return 'code-token__1';
  }
}

const CodeLine = ({ lineNumber, line, index }) => (
  <div className="code-line__wrapper">
    <div className={`code-line__line-number${
        ( index.line + 1 === lineNumber) ? ' code-line__line-number__selected' : ''
      }`}>
      {lineNumber}
    </div>
    <span className="code-line__line-text">
      {line.map(({ type, value }, key) =>
        <span
          key={key}
          className={
            (index.token === key && index.line + 1 === lineNumber)
            ? 'code-token__highlight'
            : getTokenClass(type)
          }
        >
          {value}
        </span>
      )}
    </span>
  </div>
);

export default CodeLine;
