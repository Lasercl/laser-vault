import React from 'react';

const MainLayout = ({ children }) => {
  const mainWrapperStyle = {
    backgroundColor: '#0a0f14',
    minHeight: '100vh',
    width: '100%',
    color: 'white',
    padding: '24px',
    boxSizing: 'border-box',
    textAlign: 'left',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={mainWrapperStyle}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
