import React from 'react';
import './AuroraBackground.css';

const AuroraBackground: React.FC = () => {
  return (
    <div className="aurora-container">
      <div className="aurora-blob blob-1"></div>
      <div className="aurora-blob blob-2"></div>
      <div className="aurora-blob blob-3"></div>
      <div className="aurora-overlay"></div>
    </div>
  );
};

export default AuroraBackground;
