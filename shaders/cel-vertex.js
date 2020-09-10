const celVertex = `
attribute vec3 aVertexPosition;
attribute vec3 aFrontColor;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 normal;
varying vec4 fragcolor;
varying vec3 mvVertex;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    mvVertex = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;
    normal = normalize(mat3(uMVMatrix) * aVertexNormal);
    fragcolor = vec4(aFrontColor,1.0);
}
`