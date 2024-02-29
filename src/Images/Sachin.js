import React, { useEffect, useRef } from 'react';
import MySVG from './sachin.svg'

const Signature = () => {
  const svgRef = useRef(null);

  const initialize = () => {
    const paths = Array.from(svgRef.current.querySelectorAll('path, circle, rect'));
    let delay = 0;
    let speed = 0;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      const previousStrokeLength = speed || 0;
      speed = length < 100 ? 20 : Math.floor(length);
      delay += previousStrokeLength + 100;

      path.style.transition = 'none';
      path.setAttribute('data-length', length);
      path.setAttribute('data-speed', speed);
      path.setAttribute('data-delay', delay);
      path.setAttribute('stroke-dashoffset', length);
      path.setAttribute('stroke-dasharray', `${length},${length}`);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const animate = () => {
    const paths = Array.from(svgRef.current.querySelectorAll('path, circle, rect'));

    paths.forEach((path) => {
      const length = parseFloat(path.getAttribute('data-length'));
      const speed = parseFloat(path.getAttribute('data-speed'));
      const delay = parseFloat(path.getAttribute('data-delay'));

      path.style.transition = `stroke-dashoffset ${speed}ms ${delay}ms linear`;
      path.setAttribute('stroke-dashoffset', '0');
    });
  };

  return (
    <div className="signature">
      <svg ref={svgRef}>
        <MySVG/>
      </svg>
      <button onClick={() => {
        animate();
        setTimeout(() => {
          initialize();
          animate();
        }, 500);
      }}>Animate</button>
    </div>
  );
};

export default Signature;
