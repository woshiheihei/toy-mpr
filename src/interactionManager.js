// Part 1
import { mat4 } from "gl-matrix";

const InteractionManager = (canvas, viewMatrix, onInteraction) => {
  let isDragging = false;
  let lastX, lastY;

  const handleMouseDown = (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const x = event.clientX;
    const y = event.clientY;
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;

    const rotationMatrix = mat4.create();
    mat4.rotateY(rotationMatrix, rotationMatrix, dx * 0.01);
    mat4.rotateX(rotationMatrix, rotationMatrix, dy * 0.01);
    mat4.multiply(viewMatrix, rotationMatrix, viewMatrix);

    onInteraction();
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  // ... (handle zoom and other interactions)
  // Part 2
  // ...

  const handleMouseWheel = (event) => {
    const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    const scale = delta > 0 ? 1.1 : 0.9;
    mat4.scale(viewMatrix, viewMatrix, [scale, scale, scale]);
    onInteraction();
  };

  canvas.addEventListener("wheel", handleMouseWheel);

  return {
    dispose: () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("wheel", handleMouseWheel);
    },
  };
};

export default InteractionManager;
