import React from 'react';
import { tokenizer } from 'acorn';
import trimRight from 'trim-right';
import './style.css';

const highlightLine = (line) => {
  let tokens = tokenizer(trimRight(line))
    , output = []
    , index = 0
    , key = 0;

  while (index < line.length) {
    const { start, end, value, type } = tokens.getToken();

    if (start > index) {
      output.push({ type: undefined, value: line.slice(index, start) });
    }

    output.push({ type: type, value: value });
    index = end;
  }

  return output;
}

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

const CodeLine = ({ lineNumber, line }) => (
  <div className="code-line__wrapper">
    <div className="code-line__line-number">{lineNumber}</div>
    <span className="code-line__line-text">
      {highlightLine(line).map(({ type, value }, key) =>
        type === undefined
        ? <span key={key}>{value}</span>
        : <span key={key} className={getTokenClass(type)}>{getContent(value, type)}</span>
      )}
    </span>
  </div>
);

export default CodeLine;
