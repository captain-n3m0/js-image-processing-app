import React from 'react';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={classNames("bg-white rounded-lg shadow-md p-4", className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={classNames("p-2", className)}>
      {children}
    </div>
  );
};
