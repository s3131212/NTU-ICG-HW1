const outlineVertex = `
attribute vec3 aVertexPosition;
attribute vec3 aFrontColor;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float outlineWidth;

varying vec3 normal;
varying vec4 fragcolor;
varying vec3 mvVertex;

void main(void)
{
    gl_Position = uPMatrix * uMVMatrix *  vec4(aVertexPosition + aVertexNormal * outlineWidth, 1.0);
}
`