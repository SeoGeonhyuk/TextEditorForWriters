import React from 'react';
import './OnDragLine.css';

const OnDragLine = () => {
   return <div className="on-drag-line" />;
};

const Memoized = React.memo(OnDragLine, () => true);

export { Memoized as OnDragLine };