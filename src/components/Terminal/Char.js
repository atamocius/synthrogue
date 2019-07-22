import './index.scss';

import React from 'react';
import classNames from 'classnames';

export default function Char({
  value = ' ',
  fgColor = 1,
  bgColor = 0
}) {
  const fg = `terminal__char--fg-${fgColor}`;
  const bg = `terminal__char--bg-${bgColor}`;
  const charClass = classNames('terminal__char', fg, bg);

  return (
    <div className={charClass}>{value}</div>
  );
}