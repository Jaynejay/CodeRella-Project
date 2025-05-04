import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Wrap your modal card in this to make it draggable.
 * The child must have a header (or any element) with  data-drag-handle .
 */
const DraggableModalWrapper = ({ children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    const handle = e.target.closest('[data-drag-handle]');
    if (!handle) return;
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  };

  const onMouseMove = (e) =>
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      /* 1st translate centres, 2nd applies drag offsets */
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

DraggableModalWrapper.propTypes = { children: PropTypes.node.isRequired };
export default DraggableModalWrapper;
