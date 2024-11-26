import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { SketchPicker } from 'react-color';

const DiagramToolbar = ({
  onAddShape,
  onAddText,
  onDeleteShape,
  onSave,
  onSetColor,
  selectedId,
  onDownload,
  onDraw,
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');

  const handleColorChange = (color) => {
    setCurrentColor(color.hex); // Update the local color preview
    onSetColor(color.hex); // Pass the color to the parent
  };

  const colorPicker = (
    <SketchPicker color={currentColor} onChange={handleColorChange} />
  );

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <Button onClick={() => onAddShape('rect')}>Add Rectangle</Button>
      <Button onClick={() => onAddShape('circle')}>Add Circle</Button>
      <Button onClick={onAddText}>Add Text</Button>
      <Popover
        content={colorPicker}
        title="Select Shape Color"
        trigger="click"
        visible={colorPickerVisible}
        onVisibleChange={(visible) => setColorPickerVisible(visible)}
      >
        <Button>Set Color</Button>
      </Popover>
      <Button onClick={onDeleteShape} disabled={!selectedId}>
        Delete Selected
      </Button>
      
      <Button type="primary" onClick={onSave}>
        Save Diagram
      </Button>
      <Button onClick={onDownload}>Download PNG</Button>
    </div>
  );
};

export default DiagramToolbar;
