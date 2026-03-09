import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  color?: string;
}

const Card = ({ title, icon, children, color = 'bg-gray-100' }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className={`p-4 flex items-center ${color}`}>
        <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;