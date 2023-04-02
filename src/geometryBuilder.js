// Part 1
const buildGeometry = (dimensions, spacing, imageData) => {
  const [xDim, yDim, zDim] = dimensions;
  const [xSpace, ySpace, zSpace] = spacing;
  const width = xDim * xSpace;
  const height = yDim * ySpace;
  const depth = zDim * zSpace;

  // Vertices
  const vertices = new Float32Array([
    0,
    0,
    0,
    width,
    0,
    0,
    0,
    height,
    0,
    width,
    height,
    0,
  ]);

  // Texture coordinates
  const textureCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

  return { vertices, textureCoords };
};

export { buildGeometry };
