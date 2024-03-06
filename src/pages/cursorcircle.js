import React, { useState, useEffect } from 'react';

function CursorCircle() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', updatePosition);

    return () => document.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="cursor-circle"
      style={{ left: position.x, top: position.y }}
    />
  );
}

export default CursorCircle;
