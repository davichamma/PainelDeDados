import React from 'react';

const DynamicPowerBIReport = ({ reportUrl }) => {
  return (
    <iframe
      title="Power BI Report"
      width="100%"
      height="100%"
      src={`${reportUrl}`}
      frameBorder="0"
      allowFullScreen={true}
      style={{ backgroundColor: '#1c1c1c', border: 'none' }}
    ></iframe>
  );
};

export default DynamicPowerBIReport;
