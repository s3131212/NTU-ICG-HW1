const gouraudVertex = `
attribute vec3 aVertexPosition;
attribute vec3 aFrontColor;
attribute vec3 aVertexNormal;

uniform vec3 lightColor1;
uniform vec3 lightColor2;
uniform vec3 lightColor3;
uniform vec4 lightPosition1;
uniform vec4 lightPosition2;
uniform vec4 lightPosition3;

uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform float Shininess;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 fragcolor;

void main(void) {
    vec3 mvVertex =  (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;
    mat3 normalMatrix = mat3(uMVMatrix);
    vec3 mvNormal =  (normalMatrix * aVertexNormal);

    // gouraud = ambient + diffuse + specular
    // prepare
    vec3 gouraud = vec3(0.0);
    vec3 cameraDirection = - normalize(mvVertex);
    vec3 normal = normalize(mvNormal);

    vec3 lightDirection1 = normalize(vec3(lightPosition1) - mvVertex);
    vec3 H1 = normalize(lightDirection1+cameraDirection);
    vec3 lightDirection2 = normalize(vec3(lightPosition2) - mvVertex);
    vec3 H2 = normalize(lightDirection2+cameraDirection);
    vec3 lightDirection3 = normalize(vec3(lightPosition3) - mvVertex);
    vec3 H3 = normalize(lightDirection3+cameraDirection);

    // ambient
    vec3 ambient = aFrontColor * Ka;
    
    // diffuse
    vec3 diffuse1 = lightColor1 * aFrontColor * max(dot(lightDirection1, normal), 0.0) * Kd;
    vec3 diffuse2 = lightColor2 * aFrontColor * max(dot(lightDirection2, normal), 0.0) * Kd;
    vec3 diffuse3 = lightColor3 * aFrontColor * max(dot(lightDirection3, normal), 0.0) * Kd;

    // specular
    vec3 specular1 = lightColor1 * pow(max(dot(H1, normal), 0.0), Shininess) * Ks;
    vec3 specular2 = lightColor2 * pow(max(dot(H2, normal), 0.0), Shininess) * Ks;
    vec3 specular3 = lightColor3 * pow(max(dot(H3, normal), 0.0), Shininess) * Ks;

    vec3 color = ambient + diffuse1 + diffuse2 + diffuse3 + specular1 + specular2 + specular3;

    fragcolor = vec4(color, 1.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`