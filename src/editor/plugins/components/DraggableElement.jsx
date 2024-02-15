import React from 'react';

import './DraggableElement.css';

const DraggableElement = () => {
   return <div className="draggable-element" />;
};

const Memoized = React.memo(DraggableElement, () => true);

export { Memoized as DraggableElement };