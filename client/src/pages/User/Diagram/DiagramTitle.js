import React from 'react';
import { Input } from 'antd';

const DiagramTitle = ({ title, setTitle }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Diagram Title"
        style={{ fontSize: '18px', width: '100%' }}
      />
    </div>
  );
};

export default DiagramTitle;
