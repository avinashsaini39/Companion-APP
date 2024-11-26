import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, Arrow, Transformer } from 'react-konva';

const DiagramStage = ({
  elements,
  setElements,
  selectedId,
  setSelectedId,
  onUpdateShape,
  setShapeColor,
}) => {
  const stageRef = useRef();
  const [arrows, setArrows] = useState([]);

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) setSelectedId(null);
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

  const handleArrowDraw = (fromId, toId) => {
    const fromElement = elements.find((el) => el.id === fromId);
    const toElement = elements.find((el) => el.id === toId);

    if (fromElement && toElement) {
      const newArrow = {
        id: `arrow-${arrows.length + 1}`,
        points: [
          fromElement.x + fromElement.width / 2,
          fromElement.y + fromElement.height / 2,
          toElement.x + toElement.width / 2,
          toElement.y + toElement.height / 2,
        ],
      };
      setArrows([...arrows, newArrow]);
    }
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'diagram.png';
    link.href = uri;
    link.click();
  };

  return (
    <Stage
      width={800}
      height={600}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      style={{ border: '1px solid #ddd' }}
    >
      <Layer>
        {elements.map((el) => (
          <React.Fragment key={el.id}>
            {el.type === 'rect' && (
              <Rect
                {...el}
                draggable
                onClick={() => setSelectedId(el.id)}
                onDragEnd={(e) => {
                  onUpdateShape(el.id, { x: e.target.x(), y: e.target.y() });
                }}
                fill={el.fill || 'blue'}
              />
            )}
            {el.type === 'circle' && (
              <Circle
                {...el}
                draggable
                radius={el.width / 2}
                onClick={() => setSelectedId(el.id)}
                onDragEnd={(e) => {
                  onUpdateShape(el.id, { x: e.target.x(), y: e.target.y() });
                }}
                fill={el.fill || 'red'}
              />
            )}
            {el.type === 'text' && (
              <Text
                {...el}
                draggable
                onClick={() => setSelectedId(el.id)}
                onDblClick={() => {
                  const newText = prompt('Enter new text:', el.text);
                  if (newText) onUpdateShape(el.id, { text: newText });
                }}
                onDragEnd={(e) => {
                  onUpdateShape(el.id, { x: e.target.x(), y: e.target.y() });
                }}
              />
            )}
          </React.Fragment>
        ))}
        {arrows.map((arrow) => (
          <Arrow
            key={arrow.id}
            points={arrow.points}
            stroke="black"
            fill="black"
            pointerLength={10}
            pointerWidth={10}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DiagramStage;
