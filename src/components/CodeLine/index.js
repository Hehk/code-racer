import React from 'react';
import './style.css';

const getTokenClass = (type) => {
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

const getContent = (value, type) => {
  if (value === undefined) {
    return type.label;
  } else {
    return value;
  }
}

const CodeLine = ({ lineNumber, line, curIndex }) => (
  <div className="code-line__wrapper">
    <div className="code-line__line-number">{lineNumber}</div>
    <span className="code-line__line-text">
      {line.map((content, key) =>
        typeof content === 'string'
        ? <span key={key}>{content}</span>
        : <span key={key} className={getTokenClass(content.type)}>
            {getContent(content.value, content.type)}
          </span>
      )}
    </span>
  </div>
);

export default CodeLine;
