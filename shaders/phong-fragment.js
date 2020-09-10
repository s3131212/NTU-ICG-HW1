const phongFragment = `
precision mediump float;

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

varying vec4 fragcolor;
varying vec3 normal;
varying vec3 mvVertex;

void main(void) {
    /* ambient */
    vec3  ambientColor = Ka * vec3(fragcolor);
    
    /* diffuse */
    vec3 lightDirection1 = normalize(vec3(lightPosition1) - mvVertex);
    float diffuseCos1 = max(dot(normal, lightDirection1),0.0);
    vec3 diffuseColor1 = lightColor1 * Kd * vec3(fragcolor) * diffuseCos1;
    
    vec3 lightDirection2 = normalize(vec3(lightPosition2) - mvVertex);
    float diffuseCos2 = max(dot(normal, lightDirection2),0.0);
    vec3 diffuseColor2 = lightColor2 * Kd * vec3(fragcolor) * diffuseCos2;
    
    vec3 lightDirection3 = normalize(vec3(lightPosition3) - mvVertex);
    float diffuseCos3 = max(dot(normal, lightDirection3),0.0);
    vec3 diffuseColor3 = lightColor3 * Kd * vec3(fragcolor) * diffuseCos3;
    
    /* specular */
    vec3 cameraDirection = normalize(-mvVertex);

    vec3 reflectionDirection1 = reflect(-lightDirection1, normal);
    float specularCosN1 = pow(max(dot(reflectionDirection1, cameraDirection), 0.0), Shininess);
    vec3 specularColor1 = Ks * lightColor1 * specularCosN1;
    
    vec3 reflectionDirection2 = reflect(-lightDirection2, normal);
    float specularCosN2 = pow(max(dot(reflectionDirection2, cameraDirection), 0.0), Shininess);
    vec3 specularColor2 = Ks * lightColor2 * specularCosN2;
    
    vec3 reflectionDirection3 = reflect(-lightDirection3, normal);
    float specularCosN3 = pow(max(dot(reflectionDirection3, cameraDirection), 0.0), Shininess);
    vec3 specularColor3 = Ks * lightColor3 * specularCosN3;
    
    vec3 color = ambientColor + diffuseColor1 + diffuseColor2 + diffuseColor3 + specularColor1 + specularColor2 + specularColor3;

    gl_FragColor = vec4(color,1.0);
}
`