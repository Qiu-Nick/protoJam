import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  label: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage }) => {
  return (
    <div className="w3-margin">
      <label>{label}</label>
      <div className="w3-light-grey w3-round-xlarge">
        <div className="w3-container w3-blue w3-round-xlarge" style={{ width: `${percentage}%` }}>
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
