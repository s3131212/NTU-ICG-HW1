const celFragment = `
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
    float ambient_intensity = Ka;
    
    /* diffuse */
    vec3 lightDirection1 = normalize(vec3(lightPosition1) - mvVertex);
    float diffuseCos1 = max(dot(normal, lightDirection1),0.0);
    float diffuseIntensity1 = Kd * diffuseCos1;

    vec3 lightDirection2 = normalize(vec3(lightPosition2) - mvVertex);
    float diffuseCos2 = max(dot(normal, lightDirection2),0.0);
    float diffuseIntensity2 = Kd * diffuseCos2;

    vec3 lightDirection3 = normalize(vec3(lightPosition3) - mvVertex);
    float diffuseCos3 = max(dot(normal, lightDirection3),0.0);
    float diffuseIntensity3 = Kd * diffuseCos3;

    /* specular */
    vec3 cameraDirection = normalize(-mvVertex);

    vec3 reflectionDirection1 = reflect(-lightDirection1, normal);
    float specularCosN1 = pow(max(dot(reflectionDirection1,cameraDirection), 0.0), Shininess);
    float specularIntensity1 = Ks * specularCosN1;
    
    vec3 reflectionDirection2 = reflect(-lightDirection2, normal);
    float specularCosN2 = pow(max(dot(reflectionDirection2,cameraDirection), 0.0), Shininess);
    float specularIntensity2 = Ks * specularCosN2;
    
    vec3 reflectionDirection3 = reflect(-lightDirection3, normal);
    float specularCosN3 = pow(max(dot(reflectionDirection3,cameraDirection), 0.0), Shininess);
    float specularIntensity3 = Ks * specularCosN3;
    
    vec3 color = 
        ceil(ambient_intensity * 12.0) / 12.0 * vec3(fragcolor) +
        (
            ceil((diffuseIntensity1 + specularIntensity1) * 12.0) / 12.0 * lightColor1 +
            ceil((diffuseIntensity2 + specularIntensity2) * 12.0) / 12.0 * lightColor2 +
            ceil((diffuseIntensity3 + specularIntensity3) * 12.0) / 12.0 * lightColor3
        ) * vec3(fragcolor);
    
    gl_FragColor = vec4(color,1.0);
}
`