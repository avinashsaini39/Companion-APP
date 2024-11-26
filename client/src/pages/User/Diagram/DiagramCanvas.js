import React, { useState, useEffect } from 'react';
import DiagramToolbar from './DiagramToolbar';
import DiagramTitle from './DiagramTitle';
import DiagramStage from './DiagramStage';

const DiagramCanvas = ({ diagram, saveDiagram }) => {
  const [title, setTitle] = useState('');
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setTitle(diagram?.title || 'Untitled Diagram');
    setElements(diagram?.elements || []);
  }, [diagram]);
// handle to add shape
  const handleAddShape = (type) => {
    const newShape = {
      id: `${type}-${elements.length + 1}`,
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: type === 'rect' ? 'blue' : 'red',
    };
    setElements([...elements, newShape]);
  };

  const handleAddText = () => {
    const newText = {
      id: `text-${elements.length + 1}`,
      type: 'text',
      x: 50,
      y: 50,
      text: 'Double-click to edit',
      fontSize: 16,
      fill: 'black',
    };
    setElements([...elements, newText]);
  };

  const handleUpdateShape = (id, newProps) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  const handleDeleteShape = () => {
    setElements(elements.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const handleSetColor = (color) => {
    if (selectedId) {
      const updated = elements.map((el) =>
        el.id === selectedId ? { ...el, fill: color } : el
      );
      setElements(updated);
    }
  };

  const handleDownload = () => {
    const stage = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = `${title}.png`;
    link.href = stage.toDataURL();
    link.click();
  };

  const handleSave = () => {
    saveDiagram({ ...diagram, title, elements });
  };

  return (
    <div>
      <DiagramTitle title={title} setTitle={setTitle} />
      <DiagramToolbar
        onAddShape={handleAddShape}
        onAddText={handleAddText}
        onDeleteShape={handleDeleteShape}
        onSave={handleSave}
        selectedId={selectedId}
        onSetColor={handleSetColor}
        onDownload={handleDownload}
      />
      <DiagramStage
        elements={elements}
        setElements={setElements}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onUpdateShape={handleUpdateShape}
      />
    </div>
  );
};

export default DiagramCanvas;
