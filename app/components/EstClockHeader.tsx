'use client';

import { ReactNode } from 'react';

interface EstClockHeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function EstClockHeader({ leftContent, rightContent }: EstClockHeaderProps) {
  return (
    <header className="site-header">
      <div>{leftContent ?? <span>Valmik Nahata</span>}</div>
      {rightContent && <div className="header-right">{rightContent}</div>}
    </header>
  );
}
