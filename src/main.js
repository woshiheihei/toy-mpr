// Part 1
import { createShader, createProgram } from "./shaderUtils.js";
import { loadImageData } from "./vtiLoader";
import { buildGeometry } from "./geometryBuilder";
import { create3DTexture } from "./textureManager";
import InteractionManager from "./interactionManager";

const initWebGL = (canvas) => {
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.error("WebGL 2 not supported");
    return null;
  }
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
};

const canvas = document.getElementById("canvas");
const gl = initWebGL(canvas);
if (!gl) throw new Error("Failed to initialize WebGL");

// Vertex and fragment shaders
const vertexShaderSource = `
    #version 300 es

    in vec4 a_position;
    in vec2 a_texCoord;

    uniform mat4 u_modelViewProjection;
    uniform mat4 u_viewMatrix;

    out vec3 v_texCoord;

    void main() {
        gl_Position = u_modelViewProjection * u_viewMatrix * a_position;
        v_texCoord = vec3(a_texCoord, 0.5);
    }
`;

const fragmentShaderSource = `
    #version 300 es

    precision highp float;

    in vec3 v_texCoord;

    uniform sampler3D u_texture;

    out vec4 outColor;

    void main() {
        float intensity = texture(u_texture, v_texCoord).r;
        outColor = vec4(vec3(intensity), 1.0);
    }
`;

//
// Part 2
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);
const program = createProgram(gl, vertexShader, fragmentShader);

// Load VTI file
loadImageData("./head.vti").then(({ dimensions, spacing, imageData }) => {
  const { vertices, textureCoords } = buildGeometry(
    dimensions,
    spacing,
    imageData
  );
  const texture = create3DTexture(gl, dimensions, imageData);

  // Part 3
  // ... (Set up buffers, attributes, and uniforms)
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 1, 2, 3]),
    gl.STATIC_DRAW
  );

  gl.useProgram(program);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  const modelViewProjectionUniformLocation = gl.getUniformLocation(
    program,
    "u_modelViewProjection"
  );
  const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix");
  const textureUniformLocation = gl.getUniformLocation(program, "u_texture");

  // ... (Update view matrix uniform and redraw)
  const updateViewMatrix = () => {
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
  };

  const drawScene = () => {
    // ... (Set up uniforms)
    gl.uniform1i(textureUniformLocation, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, texture);

    // ... (Draw the scene)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  // ... (Set up interaction)
  const viewMatrix = mat4.create();
  InteractionManager(canvas, viewMatrix, () => {
    updateViewMatrix();
    drawScene();
  });

  // ... (Draw the scene)
  updateViewMatrix();
  drawScene();
});
