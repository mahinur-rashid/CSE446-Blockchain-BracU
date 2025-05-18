import React from 'react';

const PageHolder = ({ title, children, className }) => {
  return (
    <div className="container-fluid bg-light d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg" style={{ width: 'fit-content' }}>
        {title && (
          <div className="card-header bg-primary text-white">
            <h1 className="h4 mb-0">{title}</h1>
          </div>
        )}
        <div className={"card-body p-4 " + className}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHolder;
