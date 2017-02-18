import React from 'react';
import './style.css';

const getTokenClass = (type) => {
  if (type === undefined) {
    return 'code-token__1';
  }

  switch (type.label) {
    case '=':
    case '...':
    case 'jsxTagStart':
    case 'jsxTagEnd':
    case '/':
    case '*':
    case '+':
    case '-':
      return 'code-token__2';

    case 'var':
    case 'let':
    case 'const':
    case 'for':
    case 'import':
    case 'from':
    case 'if':
    case 'while':
    case 'else':
    case 'export':
    case 'default':
    case '=>':
      return 'code-token__4';

    case 'string':
      return 'code-token__5';

    case ':':
    case '.':
      return 'code-token__6';

    case 'this':
      return 'code-token__7';



    default:
      return 'code-token__1';
  }
}

const CodeLine = ({ lineNumber, line, index, valid }) => {
  let codeLineClass = 'code-line__line-number';

  if (index.line + 1 === lineNumber) {
    codeLineClass += ' code-line__line-number__selected';

    if (!valid) {
      codeLineClass += ' code-line__line-number__invalid';
    }
  }

  return (
    <div className="code-line__wrapper">
      <div className={codeLineClass}>
        {lineNumber}
      </div>
      <span className="code-line__line-text">
        {line.map(({ type, value }, key) =>
          <span
            key={key}
            className={
              (index.token === key && index.line + 1 === lineNumber)
              ? `code-token__highlight${!valid ? ' code-token__invalid' : ''}`
              : getTokenClass(type)
            }
          >
            {value}
          </span>
        )}
      </span>
    </div>
  );
}

export default CodeLine;
