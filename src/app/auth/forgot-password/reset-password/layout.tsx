'use client';

import React from 'react';

const SetPassword = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default SetPassword;
