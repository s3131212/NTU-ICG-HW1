const gouraudFragment = `
precision mediump float;
varying vec4 fragcolor;

void main(void) {
    gl_FragColor = fragcolor;
}
`