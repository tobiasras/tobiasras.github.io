// Fragment shader
// This runs once per pixel

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_scroll;
uniform vec2 u_resolution;
uniform vec2 u_mouse;



void main() {
    // Aspect-correct UV: origin stays at canvas center for any aspect ratio
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / u_resolution.y;

    float pulse = sin(u_time*2.)*0.2+0.55;


    float pixel_d = length(uv);
    pixel_d = (0.05*pulse) / pixel_d;

    float d = distance(uv, mouse);

    float ball = u_scroll / d;
    
    vec3 color = vec3(1, 2, 3);
    
    color *= ball + pixel_d;

    

    gl_FragColor = vec4(color, 1.0);
}
