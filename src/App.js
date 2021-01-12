import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const list = [
  {
    id: 1,
    name: 'Luis',
  },
  {
    id: 2,
    name: 'John',
  },
  {
    id: 3,
    name: 'James',
  },
  {
    id: 4,
    name: 'Richard',
  },
  {
    id: 5,
    name: 'Diego',
  },
  {
    id: 6,
    name: 'Zach',
  },
  {
    id: 7,
    name: 'Alex',
  },
];

function App() {
  const [names, setNames] = useState(list);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...names];
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    setNames(items);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
              {names.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="list-item"
                      >
                        {name}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
