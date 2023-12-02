import React, { useEffect, useRef } from 'react';

const Spanizer = ({ tag: Tag = 'div', className, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const text = ref.current.textContent;
      ref.current.textContent = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'text-white';
        ref.current.appendChild(span);
      });
    }
  }, [children]);

  return React.createElement(Tag, { className, ref }, children);
};

export default Spanizer