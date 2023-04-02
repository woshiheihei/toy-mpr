const create3DTexture = (gl, dimensions, imageData) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_3D, texture);
  gl.texImage3D(
    gl.TEXTURE_3D,
    0,
    gl.R8,
    dimensions[0],
    dimensions[1],
    dimensions[2],
    0,
    gl.RED,
    gl.UNSIGNED_BYTE,
    imageData
  );
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_3D, null);
  return texture;
};

export { create3DTexture };
