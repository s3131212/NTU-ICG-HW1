const flatFragment = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

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
varying vec3 mvVertex;
void main(void) {
    /* ambient */
    vec3 ambient_color = Ka * vec3(fragcolor);

    /* diffuse */
    vec3 dx = dFdx(mvVertex);
    vec3 dy = dFdy(mvVertex);
    vec3 normal = normalize(cross(dx,dy));
    
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
    float specular_cos_n1 = pow(max(dot(reflectionDirection1,cameraDirection), 0.0), 1.0);
    vec3 specular_color1 = Ks * lightColor1 * specular_cos_n1;
    
    vec3 reflectionDirection2 = reflect(-lightDirection2, normal);
    float specular_cos_n2 = pow(max(dot(reflectionDirection2,cameraDirection), 0.0), 1.0);
    vec3 specular_color2 = Ks * lightColor2 * specular_cos_n2;
    
    vec3 reflectionDirection3 = reflect(-lightDirection3, normal);
    float specular_cos_n3 = pow(max(dot(reflectionDirection3,cameraDirection), 0.0), 1.0);
    vec3 specular_color3 = Ks * lightColor3 * specular_cos_n3;
    
    vec3 color = ambient_color + diffuseColor1 + diffuseColor2 + diffuseColor3 + specular_color1 + specular_color2 + specular_color3;
    gl_FragColor = vec4(color, 1.0);
}
`