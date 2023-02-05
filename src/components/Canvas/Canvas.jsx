import React, { useRef, useState } from 'react';
import "../../screens/sala_juego/SalaJuego.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
  
    const startDrawing = (event) => {
      setIsDrawing(true);
      draw(event);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
    };
  
    const draw = (event) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top + 40;
      const context = canvas.getContext('2d');
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };
    
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      width={1600}
      height={500}
      className="canvas"
      style={{ border: '1px solid black' }
    }
    />
  );
};

export default Canvas;