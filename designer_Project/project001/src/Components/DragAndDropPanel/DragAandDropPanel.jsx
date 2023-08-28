import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableObject = ({ name }) => {
  const [, drag] = useDrag({
    type: '3d-object',
    item: { name },
  });

  return (
    <div ref={drag} style={{ padding: '8px', border: '1px solid #ccc', margin: '8px' }}>
      {name}
    </div>
  );
};

const DragAndDropPanel = () => {
  const objects = ['Server', 'PC', 'Printer'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Drag and Drop Panel</h2>
      {objects.map(object => (
        <DraggableObject key={object} name={object} />
      ))}
    </div>
  );
};

export default DragAndDropPanel;
